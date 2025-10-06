-- Fix contact_submissions policy to use standard PERMISSIVE type
-- The scanner is concerned that all policies are RESTRICTIVE-only
-- Convert to PERMISSIVE which is the standard and clearer approach

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON contact_submissions;

-- Create a standard PERMISSIVE policy (default type) for admin SELECT access
-- PERMISSIVE policies are OR'd together (any one passing grants access)
-- This is clearer than RESTRICTIVE-only policies
CREATE POLICY "Admins can view all contact submissions"
ON contact_submissions
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Also ensure the INSERT policy is PERMISSIVE for consistency
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;

CREATE POLICY "Anyone can submit contact forms"
ON contact_submissions
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);