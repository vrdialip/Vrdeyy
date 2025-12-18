import React from "react";
import { motion } from "framer-motion";
import { Users, Award, BookOpen } from "lucide-react";

const archives = [
    {
        id: "team",
        icon: Users,
        title: "Team: Local Grow",
        img: "./team2.jpg",
        desc: "A squad of developers from SMK YAJ Depok. We craft digital solutions with passion."
    },
    {
        id: "education",
        icon: BookOpen,
        title: "Academy: SMK YAJ",
        img: "./yaj.jpg",
        desc: "Training ground for software development. Leveling up skills daily."
    },
    {
        id: "achievement",
        icon: Award,
        title: "Rank: Top 5 ITS Day",
        img: "./sertifikat.jpg",
        desc: "National Tournament Achievement. Secured Top 5 rank in Website Competition."
    }
];

export default function Highlights() {
    return (
        <section id="highlights" className="container py-20 md:py-32">

            {/* SECTION HEADER */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-heading)]">
                    Highlights
                </h2>
                <div className="hidden md:block flex-1 h-px bg-white/10" />
                <div className="md:hidden w-12 h-1 bg-[var(--color-accent)] rounded-full" />
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {archives.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group relative bg-[var(--color-bg-card)] rounded-2xl overflow-hidden
              border border-white/5
              hover:border-[var(--color-accent)]/30
              hover:shadow-[0_20px_40px_-15px_rgba(var(--color-accent-rgb),0.2)]
              transition-all duration-300"
                    >
                        {/* IMAGE CONTAINER */}
                        <div className="relative h-44 md:h-52 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-[var(--color-bg-card)]/20 to-transparent z-10" />
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover
                  group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* ICON */}
                            <div className="absolute top-4 left-4 z-20
                bg-black/40 backdrop-blur-xl border border-white/10
                p-2.5 rounded-xl text-white shadow-xl">
                                <item.icon size={18} className="md:w-5 md:h-5" />
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 md:p-7 relative z-20 -mt-6">
                            <h3 className="text-lg md:text-xl font-bold mb-3
                group-hover:text-[var(--color-accent)]
                transition-colors tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
