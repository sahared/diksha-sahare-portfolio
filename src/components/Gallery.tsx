import { Heart, Calendar, MapPin } from "lucide-react";
import { useGalleryLikes } from "@/hooks/useGalleryLikes";
import { cn } from "@/lib/utils";

const Gallery = () => {
  const { photos, isLoading, toggleLike, isLiked } = useGalleryLikes();

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-accent mb-4">Gallery</h2>
            <p className="text-muted-foreground">Moments worth remembering</p>
          </div>
          <div className="text-center text-muted-foreground">Loading gallery...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Gallery</h2>
          <p className="text-muted-foreground">Moments worth remembering</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4 max-w-7xl mx-auto">
          {photos.map((photo) => {
            const liked = isLiked(photo.id);
            
            return (
              <div
                key={photo.id}
                className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-all ${photo.span}`}
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 md:group-hover:opacity-100 opacity-100 md:opacity-0 transition-opacity duration-300">
                  
                  {/* Caption - center with handwritten style */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
                    <p className="text-foreground text-2xl md:text-3xl font-handwriting text-center drop-shadow-lg">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Date - bottom left */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-foreground/90">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{photo.date}</span>
                  </div>

                  {/* Location - bottom right */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 text-foreground/90">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{photo.location}</span>
                  </div>
                </div>

                {/* Like button - top right, always visible */}
                <button
                  onClick={() => toggleLike(photo.id)}
                  className={cn(
                    "absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10",
                    liked 
                      ? "bg-accent/90 text-accent-foreground" 
                      : "bg-background/70 text-foreground hover:bg-background/90"
                  )}
                  aria-label={liked ? "Unlike photo" : "Like photo"}
                >
                  <Heart 
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      liked && "fill-current animate-scale-in"
                    )} 
                  />
                  <span className="text-sm font-semibold tabular-nums">
                    {photo.likes_count}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
