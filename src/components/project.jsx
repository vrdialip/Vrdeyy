import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "mission_01",
    title: "Kasir App",
    category: "Full-Stack Dev",
    desc: "A full-stack cashier application built with Node.js (Express) and React. Features RESTful APIs, database integration, and complete CRUD functionality.",
    tech: ["Node.js", "Express", "React"],
    img: "./crud2.png",
    link: "#"
  },
  {
    id: "mission_02",
    title: "Dimsum Ordering",
    category: "Frontend Dev",
    desc: "Svarga Web App – Team project for IT’Day 2025 to support MSMEs. Frontend Developer role, achieved Top 5 & certified.",
    tech: ["React", "Vite", "Tailwind"],
    img: "./svarga.png",
    link: "#"
  },
  {
    id: "mission_03",
    title: "Portfolio Website",
    category: "Web Development",
    desc: "A responsive portfolio website built with React and React Bits libraries, focusing on clean UI, smooth interactions, and modern web usability.",
    tech: ["React", "React Bits"],
    img: "./porto.png",
    link: "#"
  },
  {
    id: "mission_04",
    title: "FinanceHub UI",
    category: "UI/UX Design",
    desc: "High-fidelity landing page design created in Figma, showcasing UI consistency, responsive grid systems, and development readiness.",
    tech: ["Figma", "UI Design"],
    img: "./FinanceHub.png",
    link: "#"
  },
  {
    id: "mission_05",
    title: "Mobile App UI",
    category: "UI/UX Design",
    desc: "Mobile app design focusing on clarity, intuitive navigation, and essential user flows for everyday use.",
    tech: ["Figma"],
    img: "./pbb.png",
    link: "#"
  },
  {
    id: "mission_06",
    title: "CRUD System",
    category: "Legacy Sys",
    desc: "Simple CRUD application built with PHP & MySQL to manage data with a clean and functional interface.",
    tech: ["PHP", "MySQL"],
    img: "./crud.png",
    link: "#"
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] mb-4">
          Featured <span className="text-[var(--color-accent)]">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-2xl">
          A collection of work that demonstrates my skills in solving real-world problems.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-bg-card)] text-gray-400 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={project.id}
              className="bg-[var(--color-bg-card)] rounded-xl overflow-hidden border border-white/5 hover:border-[var(--color-accent)]/30 group hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  <a
                    href={project.link}
                    className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    title="View Project"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-black border border-white/20 text-white rounded-full hover:scale-110 transition-transform"
                    title="View Code"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-[var(--color-accent)] mb-2 block">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 font-[var(--font-heading)] group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs text-gray-500 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
