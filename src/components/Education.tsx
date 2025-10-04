import { MapPin, GraduationCap } from "lucide-react";

const Education = () => {
  const education = [
    {
      institution: "Northeastern University",
      degree: "Master of Science in Information Systems",
      location: "Boston, MA",
      period: "Expected May 2026",
      courses: [
        "Object-Oriented Design",
        "Program Structures & Algorithms",
        "Application Engineering & Development",
        "Web Design & UX Engineering",
      ],
      activities: [],
    },
    {
      institution: "Shri Ramdeobaba College of Engineering and Management",
      degree: "Bachelor of Engineering in Electronics Engineering",
      location: "Nagpur, India",
      period: "May 2021",
      courses: [
        "Electronics Engineering Core Curriculum",
      ],
      activities: [],
    },
  ];

  return (
    <section id="education" className="py-20 px-4 bg-[hsl(23,76%,78%)]/20 relative overflow-hidden border-t border-border/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Education</h2>
          <p className="text-muted-foreground">
            Educational Journey: Nurturing knowledge, embracing challenges, and achieving milestones
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card hover:shadow-soft transition-all border border-border/50"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-accent" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-accent mb-2">{edu.institution}</h3>
                  <p className="text-foreground font-medium italic mb-2">{edu.degree}</p>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{edu.location}</span>
                    </div>
                    <span className="hidden md:block">•</span>
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pl-0 md:pl-16">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Courses taken:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{edu.courses.join(", ")}</p>
                </div>

                {edu.activities && (
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">Activities:</p>
                    <ul className="space-y-1">
                      {edu.activities.map((activity, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-accent">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
