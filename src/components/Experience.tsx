import { MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "Accenture",
      role: "Application Development Analyst",
      location: "Bengaluru, India",
      period: "Jun 2021 – Aug 2024",
      color: "bg-accent",
      achievements: [
        "Engineered a Data Migration Web Tool that boosted data transfer efficiency by 30% through smart design and backend optimization",
        "Developed full-stack features using Java, Spring Boot, REST APIs, and improved backend reliability by reducing code revisions by 50%",
        "Designed and optimized MS SQL database structures, improving query response time by 25%",
        "Balanced dual responsibilities of configuring Salesforce for business needs while also developing custom REST APIs for e-commerce integrations",
        "Built process automations and workflows that improved efficiency by 20%",
      ],
      techStack: "Java, Spring Boot, REST APIs, MS SQL, Salesforce, Agile",
    },
    {
      company: "AmpleSoftech Private Limited",
      role: "Web Developer Intern",
      location: "Bengaluru, India",
      period: "Jan 2021 – May 2021",
      color: "bg-secondary",
      achievements: [
        "Designed and deployed a responsive property search application that increased mobile engagement by 20%",
        "Created clean, accessible user interfaces to improve usability across devices",
        "Learned and applied SDLC methodologies, ensuring client requirements aligned with technical delivery",
      ],
      techStack: "HTML5, CSS, JavaScript, Responsive Design, SDLC",
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-[hsl(23,100%,77%)]/10 relative overflow-hidden border-t border-border/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Experience</h2>
          <p className="text-muted-foreground">Reflecting on my journey and accomplishments thus far</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border hidden md:block"></div>

          {experiences.map((exp, index) => (
            <div key={index} className={`mb-12 flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="w-full md:w-1/2 md:px-8">
                <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-soft transition-all border border-border/50">
                  <div className={`${exp.color} text-white px-4 py-2 rounded-lg inline-block mb-4 font-semibold`}>
                    {exp.company}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">{exp.role}</h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                  
                  <p className="text-sm text-accent mb-4">{exp.period}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex gap-2">
                        <span className="text-accent mt-1">»</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Tech Stack:</p>
                    <p className="text-sm text-foreground/70">{exp.techStack}</p>
                  </div>
                </div>
              </div>
              
              {/* Timeline Dot */}
              <div className="hidden md:flex w-8 h-8 bg-accent rounded-full border-4 border-background absolute left-1/2 transform -translate-x-1/2 z-10 items-center justify-center">
                <div className="w-2 h-2 bg-card rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
