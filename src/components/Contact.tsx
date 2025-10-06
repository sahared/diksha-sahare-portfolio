import { Mail, Phone, Briefcase, Calendar, Send } from "lucide-react";
import { Github, Linkedin, Twitter, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import FlowerDecor from "@/components/FlowerDecor";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Update date every minute
    const dateInterval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    // Fetch visitor count from contact_submissions table
    const fetchVisitorCount = async () => {
      const { count } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true });
      
      setVisitorCount(count || 0);
    };

    fetchVisitorCount();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("contact_submissions_count")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "contact_submissions",
        },
        () => {
          setVisitorCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      clearInterval(dateInterval);
      supabase.removeChannel(channel);
    };
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const messageLength = watch("message")?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { data: responseData, error } = await supabase.functions.invoke("send-contact-email", {
        body: data,
      });

      if (error) throw error;

      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      
      if (error.message?.includes("Too many submissions")) {
        toast.error("You've reached the submission limit. Please try again later.");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Briefcase className="text-accent" size={20} />,
      label: "Hire Me",
      value: "",
      link: "https://www.linkedin.com/in/dikshasahare/",
      isHireMe: false,
    },
    {
      icon: <Mail className="text-accent" size={20} />,
      label: "Email",
      value: "sahare.d@northeastern.edu",
      link: "mailto:sahare.d@northeastern.edu",
    },
    {
      icon: <Phone className="text-accent" size={20} />,
      label: "Phone",
      value: "Available on request",
      link: "#",
    },
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "https://in.linkedin.com/in/dikshasahare", label: "LinkedIn" },
    { icon: <Github size={20} />, href: "https://github.com/saharediksha", label: "GitHub" },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-[hsl(48,74%,78%)]/25 relative overflow-hidden border-t border-border/30">
      <FlowerDecor variant={1} className="absolute top-10 left-12 opacity-35 animate-float-slow" size={85} />
      <FlowerDecor variant={5} className="absolute top-40 right-10 opacity-30" size={95} />
      <FlowerDecor variant={4} className="absolute bottom-40 left-1/3 opacity-25" size={70} />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 relative">
          <FlowerDecor variant={2} className="absolute -top-4 left-1/2 -translate-x-20 opacity-40" size={60} />
          <h2 className="text-4xl font-bold text-accent mb-4">Get in touch</h2>
          <p className="text-muted-foreground">Let's build something together :)</p>
          <FlowerDecor variant={6} className="absolute -top-4 right-1/2 translate-x-20 opacity-40" size={60} />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Calendar & Visitor */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="bg-accent text-accent-foreground rounded-t-lg py-3 text-center font-semibold mb-4">
                  {currentDate.toLocaleString("en-US", { month: "long" })}
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-foreground mb-2">
                    {currentDate.getDate()}
                  </div>
                  <div className="text-muted-foreground">
                    {currentDate.toLocaleString("en-US", { weekday: "long" })}
                  </div>
                </div>
              </div>

              <Button 
                asChild
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-soft flex items-center justify-center gap-2"
              >
                <a 
                  href="https://calendly.com/dsahare75" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Calendar size={16} />
                  Let's have a 15 min call
                </a>
              </Button>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 text-center">
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Visitors</p>
                <p className="text-4xl font-bold text-foreground">{visitorCount}</p>
              </div>
            </div>

            {/* Right side - Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 bg-card rounded-xl p-5 shadow-soft hover:shadow-card transition-all border border-border/50 group ${
                    method.isHireMe ? 'animate-pulse hover:animate-none hover:scale-105 ring-2 ring-accent/30' : ''
                  }`}
                >
                  <div className={`w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors ${
                    method.isHireMe ? 'bg-accent/20 group-hover:bg-accent/40' : ''
                  }`}>
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

          {/* Contact Form */}
          <div className="mt-12">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send me a message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field - hidden from real users */}
                <input
                  {...register("honeypot")}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                  }}
                  aria-hidden="true"
                />
                
                <div>
                  <Input
                    {...register("name")}
                    placeholder="Your Name"
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Your Email"
                    className="w-full"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Textarea
                    {...register("message")}
                    placeholder="Your Message"
                    className="w-full min-h-[150px] resize-none"
                    disabled={isSubmitting}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message ? (
                      <p className="text-destructive text-sm">{errors.message.message}</p>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {messageLength}/2000 characters
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground">
            With <Heart className="inline text-accent fill-accent" size={16} /> Diksha Sahare
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
