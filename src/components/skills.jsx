import React from "react";
import { motion } from "framer-motion";
import { Code, Server, Wrench, Database, Layout, Smartphone } from "lucide-react";
import ScrollStack, { ScrollStackItem } from './ScrollStack/ScrollStack'

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Layout,
    skills: ["React.js", "Vue.js", "Tailwind CSS", "Framer Motion", "HTML5 & CSS3", "JavaScript (ES6+)"],
    description: "Building responsive, interactive, and accessible user interfaces."
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: ["Node.js", "Express", "PHP", "Laravel", "REST APIs"],
    description: "Creating robust server-side applications and efficient APIs."
  },
  {
    title: "Database Management",
    icon: Database,
    skills: ["MySQL", "MongoDB", "PostgreSQL"],
    description: "Designing schemas and managing data persistence."
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: ["Git & GitHub", "Vite", "VS Code", "Postman", "Linux Basics"],
    description: "Streamlining development workflows and deployment."
  },
  {
    title: "UI/UX Design",
    icon: Smartphone,
    skills: ["Figma", "Wireframing", "Prototyping", "User Flow", "Mobile First Design"],
    description: "Crafting intuitive and aesthetically pleasing digital experiences."
  },
  {
    title: "Soft Skills",
    icon: Code,
    skills: ["Problem Solving", "Team Collaboration", "Agile/Scrum", "Fast Learner"],
    description: "Essential human skills that drive project success."
  }
];

export default function Skills() {
  return (
    <div className="container mx-auto py-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] mb-4">
          Technical <span className="text-[var(--color-accent)]">Expertise</span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-center">
          A comprehensive overview of the technologies and tools I utilize to bring ideas to life.
        </p>
      </div>

      <ScrollStack
        useWindowScroll
        stackPosition="25%"
        scaleEndPosition="15%"
        itemDistance={220}
        itemStackDistance={25}
        baseScale={0.94}
        itemScale={0.015}
        blurAmount={2}
        rotationAmount={0.5}
      >
        {skillCategories.map((category, index) => (
          <ScrollStackItem key={category.title}>
            <div
              className="bg-[var(--color-bg-card)] p-8 rounded-2xl border border-white/10
          hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.1)] transition-all
          max-w-2xl mx-auto min-h-[320px] backdrop-blur-md relative overflow-hidden group"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[var(--color-accent)]/5 rounded-full blur-3xl group-hover:bg-[var(--color-accent)]/10 transition-colors" />

              <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="p-4 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <category.icon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-[var(--font-heading)] mb-1">
                    {category.title}
                  </h3>
                  <div className="h-1 w-12 bg-[var(--color-accent)]/30 rounded-full" />
                </div>
              </div>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed relative z-10">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 relative z-10">
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-sm text-gray-400 font-mono px-4 py-1.5 rounded-xl
                bg-white/5 border border-white/5 hover:border-[var(--color-accent)]/50
                hover:text-white hover:bg-[var(--color-accent)]/5 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>


    </div>
  );
}
