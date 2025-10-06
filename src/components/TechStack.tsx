import { Badge } from "@/components/ui/badge";
const TechStack = () => {
  const categories = [{
    title: "Programming Languages",
    techs: ["Python", "Java", "C++", "C", "C#"]
  }, {
    title: "Web development",
    techs: ["React", "Angular", "Javascript", "Typescript", "Rails", "HTML", "CSS"]
  }, {
    title: "Server side",
    techs: ["Node.js", "Express.js", "Flask", "Ruby", "REST APIs"]
  }, {
    title: "Mobile development",
    techs: ["Android", "Java"]
  }, {
    title: "Databases",
    techs: ["MySQL", "SQL", "MongoDB", "Postgres", "Firebase", "Redis"]
  }, {
    title: "Version controlling & management",
    techs: ["Bitbucket", "Git & GitHub", "Gitlab", "Jira", "Clickup", "Notion"]
  }, {
    title: "Tools",
    techs: ["Postman", "Git", "VSCode", "MySQL Workbench", "Jupyter Notebook", "WSL"]
  }];
  return <section id="tech" className="py-20 px-4 bg-[hsl(189,80%,68%)]/10 relative overflow-hidden border-t border-border/30">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold text-accent mb-4">Tech Stack</h2>
          <p className="text-muted-foreground mb-12">
            Change is inevitable, so I keep on exploring new technology, learn it in a minimal possible way and then
            build something out of it to see how well I did :)
          </p>

          <div className="space-y-8">
            {categories.map((category, index) => <div key={index}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.techs.map((tech, techIndex) => <Badge key={techIndex} variant="secondary" className="px-4 py-2 text-sm hover:text-accent-foreground transition-all shadow-soft border border-border/50 bg-[t] bg-[#f7e3d9]">
                      {tech}
                    </Badge>)}
                </div>
              </div>)}
          </div>

          <div className="mt-12">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=512&h=320&fit=crop&fm=webp&q=80" alt="Developer workspace" width="512" height="320" className="w-full max-w-lg ml-auto rounded-2xl shadow-card" loading="lazy" />
          </div>
        </div>
      </div>
    </section>;
};
export default TechStack;