import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Aurora from "./components/Aurora";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Projects, { isProjectDetailSlug, projectAnchorId } from "./components/Projects";
import Contact from "./components/Contact";
import "./app.css";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];
type NavTarget = "home" | SectionId;

function isSectionId(value: string): value is SectionId {
  return SECTIONS.some((section) => section.id === value);
}

function parseLocation(pathname: string): {
  section: NavTarget;
  projectSlug?: string;
  unknown: boolean;
} {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { section: "home", unknown: false };

  const [section, projectSlug] = parts;
  if (!isSectionId(section)) return { section: "home", unknown: true };
  if (section === "projects" && projectSlug) {
    return { section: "projects", projectSlug: decodeURIComponent(projectSlug), unknown: false };
  }
  if (parts.length > 1) return { section: "home", unknown: true };
  return { section, unknown: false };
}

function pathFor(section: NavTarget, projectSlug?: string) {
  if (section === "home") return "/";
  if (section === "projects" && projectSlug) return `/projects/${projectSlug}`;
  return `/${section}`;
}

function sectionFromScroll(): NavTarget {
  if (window.scrollY < 8) return "home";
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    return "contact";
  }

  const marker = 128;
  let current: SectionId = "about";
  for (const section of SECTIONS) {
    const element = document.getElementById(section.id);
    if (!element) continue;
    if (element.getBoundingClientRect().top <= marker) current = section.id;
  }
  return current;
}

function scrollToTarget(section: NavTarget, projectSlug: string | undefined, smooth: boolean) {
  const behavior: ScrollBehavior = smooth ? "smooth" : "auto";
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  if (!smooth) root.style.scrollBehavior = "auto";

  if (section === "home") {
    window.scrollTo({ top: 0, behavior });
  } else {
    const anchor = projectSlug ? projectAnchorId(projectSlug) : null;
    const element = (anchor && document.getElementById(anchor)) || document.getElementById(section);
    element?.scrollIntoView({ behavior, block: "start" });
  }

  if (!smooth) root.style.scrollBehavior = previous;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const sourceRef = useRef<"click" | "spy" | "pop">("pop");
  const suppressRef = useRef(false);
  const pinRef = useRef<number | null>(null);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const parsed = parseLocation(location.pathname);
  const activeSection = parsed.unknown ? "home" : parsed.section;

  const holdSpy = (smooth: boolean) => {
    suppressRef.current = true;
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      suppressRef.current = false;
      pinRef.current = window.scrollY;
    };

    if (!smooth) {
      window.setTimeout(release, 50);
      return;
    }

    window.addEventListener("scrollend", release, { once: true });
    window.setTimeout(release, 1600);
  };

  const handleSectionChange = (section: NavTarget) => {
    const path = pathFor(section);
    sourceRef.current = "click";
    scrollToTarget(section, undefined, true);
    holdSpy(true);
    if (location.pathname !== path) navigate(path);
    else sourceRef.current = "pop";
  };

  useEffect(() => {
    if (isLoading) return;

    const current = parseLocation(location.pathname);
    if (current.unknown) {
      sourceRef.current = "pop";
      navigate("/", { replace: true });
      return;
    }

    if (sourceRef.current === "spy") {
      sourceRef.current = "pop";
      return;
    }

    const fromClick = sourceRef.current === "click";
    sourceRef.current = "pop";
    if (fromClick) return;

    const smooth = !firstLoadRef.current;
    firstLoadRef.current = false;
    scrollToTarget(current.section, current.projectSlug, smooth);
    holdSpy(smooth);
  }, [isLoading, location.pathname, navigate]);

  useEffect(() => {
    if (isLoading) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (suppressRef.current) return;
        if (pinRef.current !== null && Math.abs(window.scrollY - pinRef.current) < 30) return;
        pinRef.current = null;

        const current = parseLocation(location.pathname);
        if (current.projectSlug && isProjectDetailSlug(current.projectSlug)) return;

        const next = sectionFromScroll();
        const path = pathFor(next);
        if (path === location.pathname) return;

        sourceRef.current = "spy";
        navigate(path, { replace: true });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isLoading, location.pathname, navigate]);

  const openProject = (slug: string) => {
    const path = pathFor("projects", slug);
    if (location.pathname === path) return;
    sourceRef.current = "spy";
    navigate(path, { state: { fromProject: true } });
  };

  const closeProject = () => {
    sourceRef.current = "spy";
    if ((location.state as { fromProject?: boolean } | null)?.fromProject) {
      navigate(-1);
      return;
    }
    if (location.pathname !== "/projects") navigate("/projects", { replace: true });
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
          <motion.button
            type="button"
            className={`nav-button ${activeSection === "home" ? "active" : ""}`}
            onClick={() => handleSectionChange("home")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
          {SECTIONS.map((section) => (
            <motion.button
              key={section.id}
              type="button"
              className={`nav-button ${activeSection === section.id ? "active" : ""}`}
              onClick={() => handleSectionChange(section.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-current={activeSection === section.id ? "true" : undefined}
            >
              {section.label}
            </motion.button>
          ))}
          <span className="nav-divider" aria-hidden="true"></span>
          <a
            href="/Portfolio/Faisal Alhuthifii CV.pdf"
            className="nav-button nav-resume"
            download="Faisal_Alhuthifii_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ marginRight: "0.5rem" }}>
              <i className="fas fa-file-download"></i>
            </span>
            Resume
          </a>
        </div>
      </nav>

      <main className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <About />
          <Skills />
          <Experience />
          <Certifications />
          <Projects
            projectSlug={parsed.section === "projects" ? parsed.projectSlug : null}
            onOpenProject={openProject}
            onCloseProject={closeProject}
          />
          <Contact />
        </motion.div>
      </main>
    </div>
  );
}
