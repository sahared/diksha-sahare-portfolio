import { Trophy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Achievements = () => {
  const achievements = [
    {
      title: "Winner - SharkHack'25 Hackathon",
      date: "April 2025",
      description:
        "Awarded to StudyBuddy, recognized for groundbreaking innovation, strong practicality, and an exceptional pitch. Also won the highest honor: The Moonshot Venture Award for demonstrating a business idea with significant growth potential and addressing a real-world challenge.",
      links: [
        { label: "View Project", href: "#" },
        { label: "Demo", href: "#" },
      ],
    },
    {
      title: "Winner - BU Spark'25 Hackathon",
      date: "March 2025",
      description:
        "Awarded first place at the Boston University Spark'25 Hackathon in the 'Best use of GenAI category' for innovative solution and exceptional presentation.",
      links: [{ label: "View Project", href: "#" }],
    },
    {
      title: "National Topper - AIR 5",
      date: "October 2017",
      description:
        "Recognized as the All India Topper (AIR-5) in the Cloud Computing course conducted by Indian Institute of Technology (IIT), Kharagpur under NPTEL.",
      links: [{ label: "View Credentials", href: "#" }],
    },
    {
      title: "Winner of PriceLabs Hackathon 2023",
      date: "August 2023",
      description:
        "Secured first place in the PriceLabs hackathon with the project 'TicketMinder'. Leveraged chatGPT's generative AI capabilities to optimize data retrieval for user queries, resulting in a highly relevant and efficient Ticket Answering System. Evaluated as a user-friendly full-stack solution.",
      links: [{ label: "View", href: "#" }],
    },
    {
      title: "Winner - Ignite'19 Coding Competition",
      date: "September 2019",
      description:
        "Secured the 1st prize in the Ignite'19 coding competition, a prestigious state-level programming competition organized by the Department of Information Technology at MET BKC College.",
      links: [{ label: "View Credentials", href: "#" }],
    },
    {
      title: "Pro-Utsav'16 - 1st Prize",
      date: "February 2016",
      description:
        "Secured 1st Prize in Pro-Utsav, a national-level project competition, and the most prestigious event organized by K. K. Wagh Polytechnic of Engineering.",
      links: [{ label: "View Credentials", href: "#" }],
    },
    {
      title: "Ignitra'18 - 1st Prize",
      date: "February 2018",
      description:
        "Attained 1st Prize in Ignitra, a state-level programming competition organized by the Department of Computer Engineering at B.R.Harne College of Engineering.",
      links: [{ label: "View Credentials", href: "#" }],
    },
    {
      title: "Event Head - Source Code",
      date: "March 2018",
      description:
        "Led as the Event Head for the esteemed 'Source Code' event, a nationally recognized coding competition known for its significant impact within the tech community. This high-profile event drew participants from across the country and provided their seamless execution and contribution to the overall success of the competition.",
      links: [
        { label: "Event Head", href: "#" },
        { label: "Management", href: "#" },
      ],
    },
    {
      title: "Winner - Ignite'19 Placement Practices Competition",
      date: "September 2019",
      description:
        "Secured the first prize in the Ignite'19 Placement Practices competition, an interview-based placement practice event organized by the Department of Computer Engineering at MET BKC College of Engineering.",
      links: [{ label: "View Credentials", href: "#" }],
    },
    {
      title: "Metastorm'19 - Programate 2nd Prize",
      date: "September 2019",
      description:
        "Secured the 2nd Prize in Programate, a state-level programming competition event organized by the Department of Computer Engineering at MET BKC College.",
      links: [{ label: "View Credentials", href: "#" }],
    },
    {
      title: "MVP Kshitij'19 - CodeSprint 2nd Prize",
      date: "February 2019",
      description:
        "Achieved the 2nd Prize in MVP Kshitij - CodeSprint, a state-level programming competition event hosted by the Department of Computer Engineering at MET College of Engineering.",
      links: [{ label: "View Credentials", href: "#" }],
    },
    {
      title: "Metastorm'18 - BEPFI 2nd Prize",
      date: "September 2018",
      description:
        "Earned the 2nd Prize in Metastorm-BEPFI, an interview-based placement practice competition conducted by the Department of Computer Engineering at MET BKC College of Engineering.",
      links: [{ label: "View Credentials", href: "#" }],
    },
    {
      title: "Secretary - ACTS Committee",
      date: "July 2015",
      description:
        "Elected and served as the Secretary of the Association of Computer Technology Students (ACTS) Committee in 2015. Organized and coordinated a variety of departmental events and activities, presided their seamless execution and contributed to the overall success of the committee's initiatives.",
      links: [{ label: "More", href: "#" }],
    },
    {
      title: "Student of the Week",
      date: "June 2018",
      description:
        "Recognized as 'Student of the Week' by Saba! News in June 2018, commended for outstanding academic excellence and exemplary leadership. This public article highlights exceptional achievements and noteworthy contributions.",
      links: [{ label: "Article", href: "#" }],
    },
  ];

  return (
    <section id="achievements" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Achievements</h2>
          <p className="text-muted-foreground">Turning aspirations into accomplishments, one milestone at a time</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => (
            <Card key={index} className="group hover:shadow-card transition-all border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Trophy className="text-accent" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-accent">{achievement.date}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-4">
                  {achievement.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {achievement.links.map((link, linkIndex) => (
                    <Button key={linkIndex} size="sm" variant="outline" className="text-xs">
                      {link.label}
                      <ExternalLink size={12} className="ml-1" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
