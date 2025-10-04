import { Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Certifications = () => {
  const certifications = [
    {
      title: "AWS Academy Graduate Cloud Architecting",
      provider: "AWS",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "AWS",
      date: "Dec 2024",
      verified: true,
    },
    {
      title: "AWS Academy Cloud Foundations",
      provider: "AWS",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "AWS",
      date: "Dec 2024",
      verified: true,
    },
    {
      title: "CodePath - Technical Interview Prep(Advanced)",
      provider: "CodePath",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "CodePath",
      date: "Nov 2024",
      verified: true,
    },
    {
      title: "Professional Cloud Developer",
      provider: "Google",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "Google",
      date: "Oct 2024",
      verified: true,
    },
    {
      title: "Professional Cloud Architect",
      provider: "Google",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "Google",
      date: "Sep 2024",
      verified: true,
    },
    {
      title: "Cloud Digital Leader",
      provider: "Google",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "Google",
      date: "Aug 2024",
      verified: true,
    },
    {
      title: "GCP Associate Cloud Engineer - Google Cloud Certification",
      provider: "Udemy",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "Udemy",
      date: "Jul 2024",
      verified: true,
    },
    {
      title: "Oracle Cloud Infrastructure Foundations Associate",
      provider: "Oracle",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "Oracle",
      date: "Jun 2024",
      verified: true,
    },
    {
      title: "Python Code Challenges",
      provider: "LinkedIn",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "LinkedIn",
      date: "May 2024",
      verified: true,
    },
    {
      title: "Python for Data Science Tips, Tricks, & Techniques",
      provider: "LinkedIn",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "LinkedIn",
      date: "Apr 2024",
      verified: true,
    },
    {
      title: "Cloud Computing",
      provider: "IIT Kharagpur",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=366&h=192&fit=crop&fm=webp&q=80",
      badge: "IIT",
      link: "#",
    },
  ];

  return (
    <section id="certifications" className="py-20 px-4 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Certifications</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all border border-border/50"
            >
              <div className="relative h-48 bg-gradient-to-br from-accent/10 to-secondary/10 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center shadow-card">
                    <Award className="text-accent" size={36} />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                  {cert.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-secondary">{cert.provider}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-accent hover:text-accent/80">
                    <span className="text-xs">View</span>
                    <ExternalLink size={12} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
