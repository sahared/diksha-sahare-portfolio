import { Github, Linkedin, Mail, Twitter, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  const stats = [
    { value: "5+", label: "Years of Experience" },
    { value: "20+", label: "Projects Completed" },
    { value: "26+", label: "Honors & Awards" },
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <Github size={20} />, href: "#", label: "GitHub" },
    { icon: <Code size={20} />, href: "#", label: "CodePen" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
  ];

  return (
    <section className="min-h-screen flex items-center pt-20 pb-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-secondary/20 text-secondary-foreground border-secondary/30">
              Software Development Engineer @ Company
            </Badge>
            
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="text-foreground">Your Name</span>
                <br />
                <span className="text-muted-foreground font-display">SURNAME</span>
              </h2>
              
              <div className="flex items-center gap-2 text-secondary-foreground mb-4">
                <span className="text-sm font-mono">root:~$</span>
                <span className="text-sm">AI Engineer</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-card hover:bg-accent transition-all flex items-center justify-center text-foreground hover:text-accent-foreground shadow-soft"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-6">A FEW HIGHLIGHTS</p>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-card rounded-3xl shadow-card overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full blur-3xl opacity-40"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
