import { Heart } from "lucide-react";

const Gallery = () => {
  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=800&fit=crop", span: "row-span-2" },
    { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop", span: "row-span-1" },
    { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop", span: "row-span-1" },
    { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=800&fit=crop", span: "row-span-2" },
    { url: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop", span: "row-span-1" },
    { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop", span: "row-span-1" },
    { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop", span: "row-span-1" },
    { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop", span: "row-span-2" },
  ];

  return (
    <section id="gallery" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Gallery</h2>
          <p className="text-muted-foreground">Moments worth remembering</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4 max-w-7xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-all ${image.span}`}
            >
              <img src={image.url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <Heart className="text-accent fill-accent" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
