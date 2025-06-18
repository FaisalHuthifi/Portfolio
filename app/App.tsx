import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aurora from "./components/Aurora";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./app.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "certifications", label: "Certifications" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h1>Loading Portfolio...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Aurora
        colorStops={["#5D674F", "#A4896E", "#213455"]}
        amplitude={2.0}
        blend={0.8}
      />
      <nav className="nav-wrapper">
        <div className="nav-content">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              className={`nav-button ${activeSection === section.id ? "active" : ""}`}
              onClick={() => handleSectionChange(section.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.label}
            </motion.button>
          ))}
        </div>
      </nav>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeSection === "about" && <About />}
            {activeSection === "skills" && <Skills />}
            {activeSection === "experience" && <Experience />}
            {activeSection === "certifications" && <Certifications />}
            {activeSection === "projects" && <Projects />}
            {activeSection === "contact" && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
} 