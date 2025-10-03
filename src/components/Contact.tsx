import { Mail, Phone, Briefcase, Calendar } from "lucide-react";
import { Github, Linkedin, Twitter, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactMethods = [
    {
      icon: <Briefcase className="text-accent" size={20} />,
      label: "Hire Me",
      value: "",
      link: "#",
    },
    {
      icon: <Mail className="text-accent" size={20} />,
      label: "Email",
      value: "yourname@example.com",
      link: "mailto:yourname@example.com",
    },
    {
      icon: <Phone className="text-accent" size={20} />,
      label: "Phone",
      value: "+1 (XXX) XXX-XXXX",
      link: "tel:+1XXXXXXXXXX",
    },
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <Github size={20} />, href: "#", label: "GitHub" },
    { icon: <Code size={20} />, href: "#", label: "CodePen" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Get in touch</h2>
          <p className="text-muted-foreground">Let's build something together :)</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Calendar & Visitor */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="bg-accent text-accent-foreground rounded-t-lg py-3 text-center font-semibold mb-4">
                  October
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-foreground mb-2">2</div>
                  <div className="text-muted-foreground">Thursday</div>
                </div>
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-soft flex items-center justify-center gap-2">
                <Calendar size={16} />
                Let's have a 15 min call
              </Button>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 text-center">
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Visitors</p>
                <p className="text-4xl font-bold text-foreground">2769</p>
              </div>
            </div>

            {/* Right side - Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="flex items-center gap-4 bg-card rounded-xl p-5 shadow-soft hover:shadow-card transition-all border border-border/50 group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{method.label}</p>
                    {method.value && <p className="text-foreground font-medium">{method.value}</p>}
                  </div>
                </a>
              ))}

              <div className="pt-6">
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 rounded-lg bg-card hover:bg-accent transition-all flex items-center justify-center text-foreground hover:text-accent-foreground shadow-soft border border-border/50"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground">
            With <Heart className="inline text-accent fill-accent" size={16} /> Your Name
          </p>
        </div>
      </div>
    </section>
  );
};

const Heart = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default Contact;
