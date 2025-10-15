import { Github, Linkedin, Mail, Twitter, Code, Download, ArrowRight, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import FlowerDecor from "@/components/FlowerDecor";
const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = ["Full-Stack Developer", "Problem Solver", "AI Engineer", "Open Source Contributor"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  const stats = [
    // {
    //   value: "5+",
    //   label: "Years of Experience",
    // },
    // {
    //   value: "20+",
    //   label: "Projects Completed",
    // },
    // {
    //   value: "26+",
    //   label: "Honors & Awards",
    // },
  ];
  const socialLinks = [
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/dikshasahare",
      label: "LinkedIn",
    },
    {
      icon: <Github size={20} />,
      href: "https://github.com/sahared",
      label: "GitHub",
    },
    {
      icon: <Code size={20} />,
      href: "https://leetcode.com/u/dsahare75",
      label: "CodePen",
    },
    // {
    //   icon: <Twitter size={20} />,
    //   href: "#",
    //   label: "Twitter",
    // },
  ];
  const trustLogos = [
    // {
    //   name: "Amazon",
    //   alt: "Amazon",
    // },
    // {
    //   name: "Northeastern",
    //   alt: "Northeastern University",
    // },
    // {
    //   name: "AWS",
    //   alt: "AWS Certified",
    // },
    // {
    //   name: "Google Cloud",
    //   alt: "Google Cloud Certified",
    // },
  ];
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <section className="min-h-screen flex items-center pt-20 pb-12 px-4 bg-background relative overflow-hidden border-t border-border/30">
      <FlowerDecor variant={3} className="absolute top-10 left-10 opacity-40 animate-float-slow" size={80} />
      <FlowerDecor variant={5} className="absolute top-32 right-16 opacity-30 animate-float-slow" size={100} />
      <FlowerDecor variant={1} className="absolute bottom-20 left-1/4 opacity-25" size={70} />
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-teal-medium text-white border-teal-medium/30 bg-[#4297a0]">
                🟢 Available for hire
              </Badge>
              <Badge className="bg-orange-vibrant text-white border-orange-vibrant/30 flex items-center gap-1 bg-[#dc9750]">
                <MapPin size={12} />
                Based in Boston
              </Badge>
              <Badge className="bg-teal-light/20 text-teal-dark border-teal-dark/20 flex items-center gap-1">
                <GraduationCap size={12} />
                MS Student @ Northeastern
              </Badge>
            </div>

            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-2">
                <span className="text-foreground">Diksha</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-medium to-orange-vibrant font-display">
                  Sahare
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-4 max-w-md">
                Building intelligent systems that solve real-world problems
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-mono text-teal-600 dark:text-teal-300">root:~$</span>
                <span
                  className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-orange-400 animate-fade-in drop-shadow-[0_0_1px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]"
                  key={currentRoleIndex}
                >
                  {roles[currentRoleIndex]}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-card hover:bg-accent transition-all flex items-center justify-center text-foreground hover:text-accent-foreground shadow-soft"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => scrollToSection("projects")} className="gap-2">
                View Projects
                <ArrowRight size={16} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="gap-2"
              >
                <Download size={16} />
                Download Resume
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")} className="bg-inherit">
                Let's Talk
              </Button>
            </div>

            {/* <div className="pt-6 space-y-8">
              <div>
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

              <div>
                <p className="text-sm text-muted-foreground mb-4">TRUSTED BY</p>
                <div className="grid grid-cols-4 gap-4">
                  {trustLogos.map((logo, index) => (
                    <div
                      key={index}
                      className="h-12 rounded-lg bg-card border border-border flex items-center justify-center text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all grayscale hover:grayscale-0"
                      title={logo.alt}
                    >
                      {logo.name}
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>

          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-card rounded-3xl shadow-card overflow-hidden">
                <img
                  src="https://i.postimg.cc/8z1d6b6d/B729844-F-F867-4-BE4-9-D18-C0-BA79157622.jpg"
                  alt="Profile"
                  width="448"
                  height="448"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-light rounded-full blur-3xl opacity-40"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-orange-warm rounded-full blur-3xl opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
