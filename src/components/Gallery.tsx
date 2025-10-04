import { Heart, Calendar, MapPin } from "lucide-react";
import { useGalleryLikes } from "@/hooks/useGalleryLikes";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const Gallery = () => {
  const { photos, isLoading, toggleLike, isLiked } = useGalleryLikes();
  const [shuffledPhotos, setShuffledPhotos] = useState(photos);
  const [isPaused, setIsPaused] = useState(false);

  // Shuffle photos every second
  useEffect(() => {
    if (!photos.length || isPaused) return;
    
    const interval = setInterval(() => {
      setShuffledPhotos(prev => {
        const shuffled = [...prev];
        // Fisher-Yates shuffle algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [photos, isPaused]);

  // Initialize shuffled photos when photos load
  useEffect(() => {
    if (photos.length) {
      setShuffledPhotos(photos);
    }
  }, [photos]);

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 px-4 bg-background">
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
    <section id="gallery" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Gallery</h2>
          <p className="text-muted-foreground">Moments worth remembering</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4 max-w-7xl mx-auto">
          {shuffledPhotos.map((photo, index) => {
            const liked = isLiked(photo.id);
            
            return (
              <div
                key={photo.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-all duration-500",
                  photo.span
                )}
                style={{
                  transitionProperty: 'all',
                  transitionDuration: '500ms',
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  width="298"
                  height="200" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay with gradient - shows on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  
                  {/* Caption - center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6">
                    <p className="text-foreground text-xl md:text-2xl font-handwriting text-center drop-shadow-lg leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Date and Location - bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-foreground/90">
                    <div className="flex items-center gap-2 bg-background/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{photo.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-background/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{photo.location}</span>
                    </div>
                  </div>
                </div>

                {/* Like button - top right, always visible */}
                <button
                  onClick={() => toggleLike(photo.id)}
                  className={cn(
                    "absolute top-3 right-3 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 z-10",
                    liked 
                      ? "bg-accent/90 text-accent-foreground shadow-lg" 
                      : "bg-background/80 text-foreground hover:bg-background/90"
                  )}
                  aria-label={liked ? "Unlike photo" : "Like photo"}
                >
                  <Heart 
                    className={cn(
                      "w-4 h-4 transition-all duration-300",
                      liked && "fill-current animate-scale-in"
                    )} 
                  />
                  <span className="text-xs font-semibold tabular-nums">
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
