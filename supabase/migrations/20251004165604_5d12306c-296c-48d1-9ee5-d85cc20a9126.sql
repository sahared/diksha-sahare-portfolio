-- Fix 2: Implement database trigger for like count management
-- This prevents race conditions from concurrent likes/unlikes
CREATE OR REPLACE FUNCTION update_gallery_photo_likes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE gallery_photos 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.photo_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE gallery_photos 
    SET likes_count = GREATEST(0, likes_count - 1) 
    WHERE id = OLD.photo_id;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS gallery_likes_count_trigger ON gallery_likes;

CREATE TRIGGER gallery_likes_count_trigger
AFTER INSERT OR DELETE ON gallery_likes
FOR EACH ROW
EXECUTE FUNCTION update_gallery_photo_likes_count();