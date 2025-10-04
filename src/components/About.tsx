import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-shadow transform hover:-translate-y-1 duration-300"
              >
                <img src={img} alt={`Memory ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="col-span-2 mt-4">
              <h3 className="font-display text-4xl text-center text-foreground/70">Memory Lane</h3>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-accent">About Me</h2>
            
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Hello there! My name is <span className="font-semibold text-foreground">Your Name</span>
              </p>
              
              <p className="italic text-sm text-muted-foreground">
                "A builder at heart, a problem-solver by nature, and someone who's endlessly curious about how things work."
              </p>

              <p>
                I'm a passionate <span className="text-accent font-medium">Full-Stack Software Engineer</span> and a{" "}
                <span className="text-secondary font-medium">Computer Science Master's</span> student at{" "}
                <span className="text-secondary font-medium">Northeastern University, Boston</span>, with 4+ years of
                experience crafting scalable, user-focused applications. My journey spans a diverse tech landscape — from{" "}
                <span className="text-secondary font-medium">MEAN</span> and{" "}
                <span className="text-secondary font-medium">MERN</span> stacks to{" "}
                <span className="text-secondary font-medium">Ruby on Rails, Java</span>, and even{" "}
                <span className="text-secondary font-medium">Android app development</span>. Recently, I've been diving deeper
                into the world of <span className="text-accent font-medium">AI engineering</span>, building intelligent systems
                that bridge the gap between human insight and machine learning.
              </p>

              <p>
                Whether it's building sleek UIs, architecting backend systems, or deploying robust full-stack and AI-powered
                solutions, I love every part of the process.
              </p>

              <p>
                To me, code is more than syntax — it's a creative canvas where ideas come to life. Solving challenging
                problems, optimizing systems, or just refactoring messy logic into something beautiful? That's my kind of fun.
              </p>

              <p>
                Outside of tech, I'm just as adventurous. I recharge by hiking new trails, traveling to offbeat places, and
                getting competitive in cricket, volleyball, or a good game of chess.
              </p>

              <p>
                This site is my little corner of the internet — a place to showcase my work, share what I'm learning, and
                connect with like-minded people. Let's build, learn, and grow together.
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
