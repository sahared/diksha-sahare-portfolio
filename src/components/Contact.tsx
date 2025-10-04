import { Mail, Phone, Briefcase, Calendar, Send } from "lucide-react";
import { Github, Linkedin, Twitter, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
