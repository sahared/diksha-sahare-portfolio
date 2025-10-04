import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Pass the Plate",
      description: "Food sharing platform connecting communities",
      image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Open Source"],
      links: { github: "#", demo: "#" },
      color: "from-[#b0c4b1]/20 to-[#edafb8]/20",
    },
    {
      title: "StudyBuddy",
      description: "Collaborative learning and study management platform",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Open Source"],
      links: { github: "#", demo: "#" },
      color: "from-accent/20 to-secondary/20",
    },
    {
      title: "HireU",
      description: "AI-powered recruitment and hiring platform",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Open Source"],
      links: { github: "#", demo: "#" },
      color: "from-secondary/20 to-muted/20",
    },
    {
      title: "PDF Sensei",
      description: "Intelligent PDF processing and analysis tool",
      image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Open Source"],
      links: { github: "#", demo: "#" },
      color: "from-muted/20 to-accent/20",
    },
    {
      title: "Context State",
      description: "Advanced state management library for React",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Open Source"],
      links: { github: "#" },
      color: "from-accent/20 to-[#b0c4b1]/20",
    },
    {
      title: "Portable Antivirus System",
      description: "Security solution for portable devices",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Open Source"],
      links: { github: "#" },
      color: "from-secondary/20 to-accent/20",
    },
    {
      title: "Vaxicov",
      description: "Vaccination tracking and management system",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Open Source"],
      links: { github: "#", demo: "#" },
      color: "from-muted/20 to-secondary/20",
    },
    {
      title: "Image Processing App",
      description: "Advanced image editing and processing tools",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Private"],
      links: { github: "#" },
      color: "from-accent/20 to-muted/20",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-[hsl(85,19%,81%)]/20 relative overflow-hidden border-t border-border/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Projects</h2>
          <p className="text-muted-foreground">Passion projects that sparked my interest</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all border border-border/50"
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <img
                  src={project.image}
                  alt={project.title}
                  width={290}
                  height={193}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <Badge
                    className={
                      project.tags[0] === "Open Source"
                        ? "bg-secondary/90 text-secondary-foreground"
                        : "bg-muted/90 text-muted-foreground"
                    }
                  >
                    {project.tags[0]}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                <div className="flex gap-2">
                  {project.links.github && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Github size={14} className="mr-1" />
                      GitHub
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                      <ExternalLink size={14} className="mr-1" />
                      Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
