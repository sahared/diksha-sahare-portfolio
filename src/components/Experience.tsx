import { MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "Amazon",
      role: "Software Development Engineer 2",
      location: "Denver, Colorado, United States",
      period: "Sept 2025 - Present",
      color: "bg-[#FF9900]",
      achievements: [
        "Designing and scaling vendor-facing tools as part of Amazon Shopping Guides supporting $1B+ in annual revenue",
        "Engineering a self-service refunds platform for Amazon marketing packages, handling high-volume workflows with $1M+ average transaction value",
      ],
      techStack: "Java, ReactJs, TypeScript, JavaScript, DynamoDB, AWS",
    },
    {
      company: "Northeastern University",
      role: "Graduate Research Assistant",
      location: "Boston, Massachusetts, United States",
      period: "January 2025 - May 2025",
      color: "bg-secondary",
      achievements: [
        "Conducted research on a Digital Humanities project, focusing on historical context and the visualization of degrading images from the late-1800s and early-1900s.",
        "Developed machine learning models for image restoration and enhancement, analyzing the degradation of historical images from the late-1800s and early-1900s.",
        "Utilized ArcGIS and QGIS for geospatial visualization, integrating AI-driven image segmentation to map and analyze historical socio-political contexts.",
        "Leveraging NLP models to extract and summarize textual metadata from historical records, aiding in automated document classification and retrieval.",
      ],
      techStack: "React.js, TypeScript, JavaScript, MongoDB, Node.js, QGIS, Git, OpenCV, TensorFlow, Machine Learning",
    },
    {
      company: "Copart",
      role: "Software Engineer Intern",
      location: "Dallas, Texas, United States",
      period: "July 2024 - Dec 2024",
      color: "bg-accent",
      achievements: [
        "Led Google Places integration for Copart US and UK while refactoring architecture to enhance performance scalability.",
        "Developed and deployed the Advanced Charge Discrepancy application for Copart UK, streamlining financial reconciliation processes.",
        "Released Vendor Setup and Management 2.0, modernizing interfaces and implementing key modules that improved workflow efficiency.",
        "Created LogIT during the company hackathon, an AI-powered log analysis tool that reduced debugging time by 50% through automated parsing and solution suggestions.",
      ],
      techStack: "React.js, Java, JavaScript, Git, Spinnaker, Python, OpenAI API",
    },
    {
      company: "PriceLabs",
      role: "Fullstack Engineer",
      location: "Chicago, IL, USA",
      period: "Oct 2022 - Sept 2023",
      color: "bg-[#9b87f5]",
      achievements: [
        "Elevated the efficiency of the dynamic pricing strategy by 25% by streamlining workflow, leading to a 40% reduction in UI interactions and a notable increase in user satisfaction.",
      ],
      techStack: "React.js, Ruby on Rails, JavaScript, Git, AWS, Python",
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-muted/30">
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
