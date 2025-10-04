import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import FlowerDecor from "@/components/FlowerDecor";

const About = () => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=290&h=217&fit=crop&fm=webp&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=290&h=217&fit=crop&fm=webp&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=290&h=217&fit=crop&fm=webp&q=80",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=290&h=217&fit=crop&fm=webp&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=290&h=217&fit=crop&fm=webp&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=290&h=217&fit=crop&fm=webp&q=80",
  ];

  return (
    <section id="about" className="py-20 px-4 bg-[hsl(193,42%,72%)]/20 relative overflow-hidden border-t border-border/30">
      <FlowerDecor variant={2} className="absolute top-16 right-10 opacity-30" size={90} />
      <FlowerDecor variant={4} className="absolute bottom-32 left-8 opacity-25 animate-float-slow" size={75} />
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-shadow transform hover:-translate-y-1 duration-300"
              >
                <img 
                  src={img} 
                  alt={`Memory ${index + 1}`} 
                  width={290}
                  height={217}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
            <div className="col-span-2 mt-4 relative">
              <FlowerDecor variant={6} className="absolute -left-8 top-0 opacity-40" size={50} />
              <h2 className="font-display text-4xl text-center text-foreground/70">Memory Lane</h2>
              <FlowerDecor variant={3} className="absolute -right-8 top-0 opacity-40" size={50} />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-accent">About Me</h2>
            
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Hi, I'm <span className="font-semibold text-foreground">Diksha Sahare</span>, a software engineer passionate about building applications that solve real-world problems and create value for users.
              </p>
              
              <p className="italic text-sm text-muted-foreground">
                "My journey started in Electronics Engineering, but I quickly found my calling in software development, where I could blend problem-solving with creativity."
              </p>

              <p>
                I've worked across <span className="text-accent font-medium">full-stack development, Salesforce, and cloud-native applications</span>, gaining experience in both enterprise-scale systems and lean, fast-moving projects. At{" "}
                <span className="text-secondary font-medium">Accenture</span>, I played dual roles as a{" "}
                <span className="text-secondary font-medium">Full-Stack Java Developer</span> and{" "}
                <span className="text-secondary font-medium">Salesforce Developer/Administrator</span>, working on projects that ranged from data migration tools to e-commerce platforms.
              </p>

              <p>
                Now, as a graduate student at <span className="text-accent font-medium">Northeastern University</span>, I'm diving deeper into{" "}
                <span className="text-secondary font-medium">application engineering, advanced web design, and cloud computing</span>, while working on projects that integrate modern technologies like{" "}
                <span className="text-secondary font-medium">AWS, Node.js, React, and MongoDB</span>.
              </p>

              <p>
                Outside of code, I'm curious about <span className="text-accent font-medium">user experience, design, and how technology scales globally</span>. I believe in building systems that aren't just functional, but also intuitive and sustainable.
              </p>

              <p>
                📍 Currently based in <span className="font-semibold">Boston, MA</span>
              </p>
            </div>

            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-soft">
              <Download className="mr-2" size={16} />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
