import { MapPin, GraduationCap } from "lucide-react";

const Education = () => {
  const education = [
    {
      institution: "Khoury College of Computer Sciences, Northeastern University",
      degree: "Master of Science in Computer Science",
      location: "Boston, MA, United States",
      period: "September 2023 - Aug 2025",
      courses: [
        "Programming Design Paradigm",
        "Database Management Systems",
        "Fundamentals of Software Engineering",
        "Web Development",
        "Algorithms",
        "Artificial Intelligence",
        "Cloud Computing",
        "Natural Language Processing",
      ],
      activities: [
        "Dean's List",
        "Graduate Research Assistant",
        "Graduate Teaching Assistant",
        "Member, Google Developer Students Club, Northeastern University",
        "Member, Husky Competitive Programming Club",
      ],
    },
    {
      institution: "Savitribai Phule Pune University",
      degree: "Bachelor of Engineering in Computer Engineering",
      location: "Pune, MH, India",
      period: "July 2016 - June 2019",
      courses: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Computer Networks",
        "Computer Organization & Architectures",
        "Advanced Data Structures",
        "Discrete Mathematics",
        "Digital Electronics",
        "Engineering Mathematics-III",
        "Computer Graphics",
        "Microprocessor",
        "Principles of Programming Language",
        "Theory of Computation",
        "Database Management Systems",
        "Software Engineering & Project Management",
        "Information Systems & Engineering Economics",
        "System Programming & Operating Systems",
        "Embedded Systems & Internet of Things",
        "Software Modeling & Design",
        "Web Technology",
        "High Performance Computing",
        "Artificial Intelligence & Robotics",
        "Data Mining & Warehousing",
        "Software Testing & Quality Assurance",
        "Machine Learning",
        "Information & Cyber Security",
        "Compilers",
        "Human Computer Interface",
        "Business Intelligence",
      ],
      activities: [
        "Event Head, Source Code - 2018, National Level Programming Competition",
        "Training & Placement Student Coordinator, Dr. A.P.J. Abdul Kalam Career Development Center",
        "Dean's List [3rd Topper, Computer Engineering Department]",
        "Volunteer, Prayas Youth Forum & Social Research Foundation",
        "Core Member, Debuggers' Club",
        "Member, Computer Society of India(CSI)",
        "Member, Computer Engineering Department Cricket Team",
        "Member, Computer Engineering Department Volleyball Team",
      ],
    },
    {
      institution: "Maharashtra State Board of Technical Education",
      degree: "Technical Diploma in Computer Technology",
      location: "Mumbai, MH, India",
      period: "June 2013 - May 2016",
      courses: [
        "Computer Networks",
        "Microprocessor & Programming",
        "Object-Oriented Programming",
        "Computer Graphics",
        "Graphical User Interface Programming",
        "Digital Techniques",
      ],
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
