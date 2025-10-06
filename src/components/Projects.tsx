import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "CloudHealth",
      description: "Web Service Health Monitoring API with auto-scaling EC2, CI/CD pipeline, and real-time observability",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Cloud Native"],
      links: { github: "https://github.com/saharediksha" },
      color: "from-teal-light/20 to-teal-medium/20",
    },
    {
      title: "HomeBase",
      description: "Full-stack real estate platform with PWA capabilities, real-time chat, and internationalization",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Full Stack"],
      links: { github: "https://github.com/saharediksha" },
      color: "from-orange-soft/20 to-orange-warm/20",
    },
    {
      title: "MediLink",
      description: "Healthcare Management System connecting hospitals, pharmacies, and diagnostics with secure record storage",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Desktop App"],
      links: { github: "https://github.com/saharediksha" },
      color: "from-teal-medium/20 to-orange-vibrant/20",
    },
    {
      title: "Freemat SquareFeet",
      description: "Property search web application with enhanced mobile-first design",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=290&h=193&fit=crop&fm=webp&q=80",
      tags: ["Web Application"],
      links: { github: "https://github.com/saharediksha" },
      color: "from-orange-warm/20 to-teal-light/20",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-[hsl(189,80%,68%)]/10 relative overflow-hidden border-t border-border/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-dark dark:text-teal-light mb-4">Projects</h2>
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
                        ? "bg-teal-medium/90 text-white"
                        : "bg-orange-warm/90 text-white"
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
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github size={14} className="mr-1" />
                        GitHub
                      </a>
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
