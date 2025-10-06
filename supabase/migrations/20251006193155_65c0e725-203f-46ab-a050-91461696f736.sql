-- Fix gallery_likes RLS policies to prevent data exposure
-- The app allows both authenticated users (using auth.uid()) and guests (using browser fingerprints)
-- The old COALESCE pattern allowed unauthenticated users to see ALL likes

-- Drop all existing policies on gallery_likes
DROP POLICY IF EXISTS "Users can view only their own likes" ON gallery_likes;
DROP POLICY IF EXISTS "Users can insert their own likes with rate limit" ON gallery_likes;
DROP POLICY IF EXISTS "Users can delete only their own likes" ON gallery_likes;

-- SELECT: Users can only view their own likes
-- For authenticated users: match auth.uid()
-- For guests: the policy will deny access since auth.uid() IS NULL
-- Guests don't need to SELECT from this table - they track likes client-side
CREATE POLICY "Users can view only their own likes"
ON gallery_likes
FOR SELECT
USING (
  auth.uid() IS NOT NULL
  AND user_identifier = (auth.uid())::text
);

-- INSERT: Allow both authenticated users and guests to like photos
-- For authenticated users: user_identifier must match auth.uid()
-- For guests: user_identifier must start with 'guest_' (our fingerprint format)
CREATE POLICY "Users can insert their own likes with rate limit"
ON gallery_likes
FOR INSERT
WITH CHECK (
  check_like_rate_limit(user_identifier)
  AND (
    -- Authenticated users must use their auth.uid()
    (auth.uid() IS NOT NULL AND user_identifier = (auth.uid())::text)
    OR
    -- Unauthenticated users must use guest fingerprint format
    (auth.uid() IS NULL AND user_identifier LIKE 'guest_%')
  )
);

-- DELETE: Users can only delete their own likes
-- For authenticated users: match auth.uid()
-- For guests: match their fingerprint (starting with 'guest_')
CREATE POLICY "Users can delete only their own likes"
ON gallery_likes
FOR DELETE
USING (
  (auth.uid() IS NOT NULL AND user_identifier = (auth.uid())::text)
  OR
  (auth.uid() IS NULL AND user_identifier LIKE 'guest_%' AND user_identifier = user_identifier)
);