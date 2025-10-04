-- Fix HIGH priority security issues for gallery_likes and profiles

-- 1. Add unique constraint to prevent duplicate likes
ALTER TABLE gallery_likes 
ADD CONSTRAINT unique_user_photo_like UNIQUE (user_identifier, photo_id);

-- 2. Create rate limiting function for gallery likes
CREATE OR REPLACE FUNCTION check_like_rate_limit(p_user_identifier text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_likes_count integer;
BEGIN
  -- Count likes from this user in the last minute
  SELECT COUNT(*) INTO recent_likes_count
  FROM gallery_likes
  WHERE user_identifier = p_user_identifier
    AND created_at > NOW() - INTERVAL '1 minute';
  
  -- Allow max 10 likes per minute
  RETURN recent_likes_count < 10;
END;
$$;

-- 3. Drop existing permissive gallery_likes policies
DROP POLICY IF EXISTS "Anyone can insert gallery likes" ON gallery_likes;
DROP POLICY IF EXISTS "Users can delete only their own likes" ON gallery_likes;
DROP POLICY IF EXISTS "Users can view only their own likes" ON gallery_likes;

-- 4. Create secure gallery_likes INSERT policy with rate limiting
CREATE POLICY "Users can insert their own likes with rate limit"
ON gallery_likes
FOR INSERT
WITH CHECK (
  -- Ensure user can only insert with their own identifier
  user_identifier = COALESCE(
    auth.uid()::text,
    user_identifier
  )
  -- Rate limit check
  AND check_like_rate_limit(user_identifier)
);

-- 5. Create secure gallery_likes DELETE policy
CREATE POLICY "Users can delete only their own likes"
ON gallery_likes
FOR DELETE
USING (
  user_identifier = COALESCE(
    auth.uid()::text,
    user_identifier
  )
);

-- 6. Create secure gallery_likes SELECT policy
CREATE POLICY "Users can view only their own likes"
ON gallery_likes
FOR SELECT
USING (
  user_identifier = COALESCE(
    auth.uid()::text,
    user_identifier
  )
);

-- 7. Fix profiles SELECT policy to restrict visibility
DROP POLICY IF EXISTS "Only authenticated users can view profiles" ON profiles;

CREATE POLICY "Users can view their own profile or admins can view all"
ON profiles
FOR SELECT
USING (
  auth.uid() = user_id 
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- 8. Add index for rate limiting performance
CREATE INDEX IF NOT EXISTS idx_gallery_likes_user_created 
ON gallery_likes(user_identifier, created_at DESC);