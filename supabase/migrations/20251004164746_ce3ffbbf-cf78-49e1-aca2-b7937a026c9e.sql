-- Create gallery_photos table
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  span TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery_likes table for tracking individual likes
CREATE TABLE public.gallery_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id UUID NOT NULL REFERENCES public.gallery_photos(id) ON DELETE CASCADE,
  user_identifier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(photo_id, user_identifier)
);

-- Enable RLS
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gallery_photos
CREATE POLICY "Anyone can view gallery photos"
ON public.gallery_photos
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert gallery photos"
ON public.gallery_photos
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery photos"
ON public.gallery_photos
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery photos"
ON public.gallery_photos
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for gallery_likes
CREATE POLICY "Anyone can view gallery likes"
ON public.gallery_likes
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert gallery likes"
ON public.gallery_likes
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete their own likes"
ON public.gallery_likes
FOR DELETE
USING (true);

-- Enable realtime for live like updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery_photos;

-- Seed initial gallery data
INSERT INTO public.gallery_photos (url, caption, date, location, span) VALUES
  ('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=800&fit=crop', 'University Memories', 'May 2024', 'Northeastern University', 'row-span-2'),
  ('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop', 'Tech Conference', 'March 2024', 'Boston, MA', 'row-span-1'),
  ('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop', 'Team Building', 'January 2024', 'Seattle, WA', 'row-span-1'),
  ('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=800&fit=crop', 'Graduation Day', 'December 2023', 'Boston University', 'row-span-2'),
  ('https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop', 'Hackathon Winner', 'November 2023', 'MIT', 'row-span-1'),
  ('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop', 'Workshop Session', 'October 2023', 'Cambridge, MA', 'row-span-1'),
  ('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop', 'Project Presentation', 'September 2023', 'Amazon HQ', 'row-span-1'),
  ('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop', 'Research Summit', 'August 2023', 'Stanford University', 'row-span-2');