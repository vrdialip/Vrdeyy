import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Cpu, Briefcase, Mail, Star } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "highlights", label: "Highlights", icon: Star, href: "#highlights" },
  { id: "skills", label: "Skills", icon: Cpu, href: "#skills" },
  { id: "projects", label: "Projects", icon: Briefcase, href: "#projects" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

function DockIcon({ mouseX, item, isActive, onClick }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className={`aspect-square rounded-full border backdrop-blur-md flex items-center justify-center relative group cursor-pointer transition-all
        ${isActive
          ? "bg-[var(--color-accent)]/15 border-[var(--color-accent)]/40 shadow-[0_0_20px_var(--color-accent)]/20"
          : "bg-white/10 border-white/20 hover:bg-white/20"
        }`}
    >
      <div className="w-full h-full flex items-center justify-center p-2">
        <item.icon
          className={`w-full h-full transition-colors ${isActive
            ? "text-[var(--color-accent)]"
            : "text-gray-300 group-hover:text-white"
            }`}
        />
      </div>

      {/* Tooltip */}
      <span
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1
        bg-[var(--color-bg-card)]/90 border border-white/10
        rounded text-xs text-white opacity-0 group-hover:opacity-100
        transition-opacity pointer-events-none whitespace-nowrap"
      >
        {item.label}
      </span>

      {/* Active Dot */}
      {isActive && (
        <motion.div
          layoutId="activeDot"
          className="absolute -bottom-2 w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"
        />
      )}
    </motion.div>
  );
}

const Nav = () => {
  const mouseX = useMotionValue(Infinity);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveTab(item.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (!element) return;

    const yOffset = -20;
    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-end gap-4 pb-3">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-4 rounded-2xl
          bg-[var(--color-bg-card)]/70
          border border-white/10
          px-4 pb-3 backdrop-blur-md"
      >
        {navItems.map((item) => (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            item={item}
            isActive={activeTab === item.id}
            onClick={(e) => scrollToSection(e, item.href)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Nav;
