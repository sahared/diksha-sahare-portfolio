-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous) to insert submissions
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can view submissions (for admin panel later)
CREATE POLICY "Authenticated users can view submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (true);

-- Create indexes for efficient rate limiting queries
CREATE INDEX idx_contact_submissions_email_created 
ON public.contact_submissions(email, created_at);

CREATE INDEX idx_contact_submissions_ip_created 
ON public.contact_submissions(ip_address, created_at);