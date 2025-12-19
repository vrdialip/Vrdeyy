import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Nav from "./components/nav";
import Home from "./components/home";
import Skills from "./components/skills";
import Projects from "./components/project";
import Contact from "./components/contact";
import LightPillar from './components/LigthPillar/LightPillar';
import Highlight from "./components/HighLight";
import Lenis from 'lenis';
import { useEffect } from "react";

// Footer Component
const Footer = () => (
  <footer className="bg-black py-12 border-t border-gray-900">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold font-[var(--font-heading)]">Verdi.dev</span>
        <p className="text-gray-500 text-sm">© 2025 All rights reserved.</p>
      </div>

      <div className="flex gap-6">
        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Mail size={20} /></a>
      </div>
    </div>
  </footer>
);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global click handler for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          lenis.scrollTo(element, {
            offset: -20,
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1.0}
          rotationSpeed={0.3}
          glowAmount={0.005}
          pillarWidth={3.0}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          mixBlendMode="normal"
          pillarRotation={30}
        />
      </div>

      {/* CONTENT */}
      <Nav />

      <main>
        <section id="home" className="min-h-screen pt-20">
          <Home />
        </section>

        <section id="highlights" className="py-32">
          <Highlight />
        </section>

        <section id="skills" className="py-32">
          <Skills />
        </section>

        <section id="projects" className="py-32">
          <Projects />
        </section>

        <section id="contact" className="py-32 bg-[var(--color-bg-secondary)]">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}
