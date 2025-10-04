import { Heart, Calendar, MapPin } from "lucide-react";
import { useGalleryLikes } from "@/hooks/useGalleryLikes";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

// Generate random rotation for polaroid effect
const getRandomRotation = (index: number) => {
  const rotations = [-3, -2, -1, 0, 1, 2, 3];
  return rotations[index % rotations.length];
};

const Gallery = () => {
  const { photos, isLoading, toggleLike, isLiked } = useGalleryLikes();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  // Assign random rotations that persist
  const photosWithRotation = useMemo(() => 
    photos
      .filter(photo => !imageErrors.has(photo.id))
      .map((photo, index) => ({
        ...photo,
        rotation: getRandomRotation(index)
      })),
    [photos, imageErrors]
  );

  const handleImageError = (photoId: string) => {
    console.warn(`Failed to load image for photo ${photoId}`);
    setImageErrors(prev => new Set(prev).add(photoId));
  };

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
    <section id="gallery" className="py-20 px-4 bg-[hsl(15,68%,83%)]/20 relative overflow-hidden border-t border-border/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Gallery</h2>
          <p className="text-muted-foreground">Moments worth remembering</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {photosWithRotation.map((photo, index) => {
            const liked = isLiked(photo.id);
            
            return (
              <div
                key={photo.id}
                className="group relative mx-auto"
                style={{
                  transform: `rotate(${photo.rotation}deg)`,
                  transition: 'all 300ms ease-out',
                }}
              >
                {/* Polaroid frame */}
                <div className="bg-white p-3 pb-12 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] group-hover:scale-105 group-hover:rotate-0 transition-all duration-300">
                  {/* Photo */}
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img 
                      src={`${photo.url}${photo.url.includes('?') ? '&' : '?'}w=298&h=298&fit=crop&fm=webp&q=80`}
                      alt={photo.caption}
                      width={298}
                      height={298}
                      srcSet={`${photo.url}${photo.url.includes('?') ? '&' : '?'}w=298&h=298&fit=crop&fm=webp&q=80 298w, ${photo.url}${photo.url.includes('?') ? '&' : '?'}w=596&h=596&fit=crop&fm=webp&q=80 596w`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleImageError(photo.id)}
                    />
                    
                    {/* Like button - top right */}
                    <button
                      onClick={() => toggleLike(photo.id)}
                      className={cn(
                        "absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 z-10 shadow-md",
                        liked 
                          ? "bg-accent/95 text-accent-foreground" 
                          : "bg-white/90 text-foreground hover:bg-white"
                      )}
                      aria-label={liked ? "Unlike photo" : "Like photo"}
                    >
                      <Heart 
                        className={cn(
                          "w-3.5 h-3.5 transition-all duration-300",
                          liked && "fill-current animate-scale-in"
                        )} 
                      />
                      <span className="text-xs font-semibold tabular-nums">
                        {photo.likes_count}
                      </span>
                    </button>

                    {/* Info overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <div className="text-white text-center space-y-2">
                        <div className="flex items-center justify-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{photo.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{photo.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Polaroid caption area */}
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <p className="font-handwriting text-base md:text-lg text-gray-700 leading-tight">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
