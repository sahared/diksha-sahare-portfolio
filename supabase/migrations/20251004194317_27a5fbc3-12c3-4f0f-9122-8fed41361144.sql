-- Optimize gallery photo URLs for performance
-- Add WebP format and proper dimensions to reduce image size

UPDATE public.gallery_photos 
SET url = REPLACE(url, '?w=600&h=800&fit=crop', '?w=298&h=416&fit=crop&fm=webp&q=80')
WHERE url LIKE '%w=600&h=800%';

UPDATE public.gallery_photos 
SET url = REPLACE(url, '?w=600&h=400&fit=crop', '?w=298&h=200&fit=crop&fm=webp&q=80')
WHERE url LIKE '%w=600&h=400%';