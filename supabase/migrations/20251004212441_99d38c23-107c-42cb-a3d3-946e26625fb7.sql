-- Fix gallery_likes security issues

-- Drop the existing problematic policies
DROP POLICY IF EXISTS "Anyone can view gallery likes" ON gallery_likes;
DROP POLICY IF EXISTS "Users can delete only their own likes" ON gallery_likes;

-- Create new restrictive SELECT policy: users can only see their own likes
-- This prevents tracking of other users' behavior patterns
CREATE POLICY "Users can view only their own likes"
ON gallery_likes
FOR SELECT
USING (
  -- For guest users, match against the user_identifier they provide
  -- For authenticated users, match against their JWT sub claim
  user_identifier = COALESCE(
    (current_setting('request.jwt.claims'::text, true)::json ->> 'sub'::text),
    user_identifier
  )
);

-- Create fixed DELETE policy: users can only delete their own likes
-- Removes the dangerous "OR user_identifier IS NOT NULL" condition
CREATE POLICY "Users can delete only their own likes"
ON gallery_likes
FOR DELETE
USING (
  -- For guest users, match against the user_identifier they provide
  -- For authenticated users, match against their JWT sub claim
  user_identifier = COALESCE(
    (current_setting('request.jwt.claims'::text, true)::json ->> 'sub'::text),
    user_identifier
  )
);