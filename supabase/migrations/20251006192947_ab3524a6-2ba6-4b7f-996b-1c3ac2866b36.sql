-- Fix contact_submissions RLS policy to explicitly deny unauthenticated users
-- Drop the existing admin-only SELECT policy
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON contact_submissions;

-- Create a more secure SELECT policy that explicitly requires authentication AND admin role
CREATE POLICY "Admins can view all contact submissions"
ON contact_submissions
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL
  AND has_role(auth.uid(), 'admin'::app_role)
);