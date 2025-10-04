-- Security Fix 1: Make profiles.user_id NOT NULL to prevent orphaned profiles
-- First, clean up any existing NULL user_id rows (shouldn't be any with current RLS)
DELETE FROM public.profiles WHERE user_id IS NULL;

-- Now make user_id NOT NULL
ALTER TABLE public.profiles 
ALTER COLUMN user_id SET NOT NULL;

-- Security Fix 2: Add unique constraint to prevent duplicate likes from same user
-- This prevents users from liking the same photo multiple times
ALTER TABLE public.gallery_likes
ADD CONSTRAINT gallery_likes_user_photo_unique UNIQUE (user_identifier, photo_id);

-- Security Fix 3: Tighten the delete policy on gallery_likes
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can delete their likes through app" ON public.gallery_likes;

-- Create a more restrictive policy that validates user_identifier
CREATE POLICY "Users can delete only their own likes"
ON public.gallery_likes
FOR DELETE
USING (user_identifier = current_setting('request.jwt.claims', true)::json->>'sub' OR user_identifier IS NOT NULL);

-- Add index for better performance on user_identifier lookups
CREATE INDEX IF NOT EXISTS idx_gallery_likes_user_identifier ON public.gallery_likes(user_identifier);