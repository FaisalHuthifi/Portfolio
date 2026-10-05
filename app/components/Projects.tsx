import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  recognition?: string;
  image?: string;
  video?: string;
  presentation?: string;
  detailIntro?: string;
  example?: { intent: string; before: string; after: string }[];
  slug?: string;
  aliases?: string[];
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/** Bump when replacing ci.png so browsers fetch the new icon. */
const LOCI_ICON = `${asset('projects/loci/ci.png')}?v=2`;

const projects: Project[] = [
  {
    title: 'Loci',
    description:
      'A cross-platform mobile app that captures photos with GPS, overlays place and time on each shot, and embeds a scannable Google Maps QR code.',
    detailIntro:
      'Loci helps you remember where every moment was taken. Capture from the camera or gallery, and the app tags each photo with coordinates, reverse-geocoded address lines, and a timestamp. A map QR on the composed image opens the exact location in Google Maps. Browse saved shots in Moments, explore pins on an interactive map, and launch turn-by-turn directions—all stored locally on your device.',
    features: [
      'Live camera capture and gallery import with location tagging',
      'Reverse-geocoded address lines and timestamp on composed images',
      'Map QR code linking to each photo\'s coordinates',
      'Moments gallery with on-device storage',
      'Map view with clustered pins and Google Maps directions',
      'English/Arabic UI and light, grey, and dark themes',
    ],
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Expo Router',
      'expo-camera',
      'expo-location',
      'react-native-maps',
    ],
    image: LOCI_ICON,
    video: asset('projects/loci/appvideo.mp4'),
    presentation: asset('projects/loci/Loci.pdf'),
    slug: 'loci',
  },
  {
    title: 'Oops',
    description:
      'A lightweight Windows tray app that fixes text typed with the wrong keyboard layout. Select the mistyped text and press Ctrl+I to convert it between Arabic and English in place.',
    example: [
      { intent: 'Meant oops — keyboard was Arabic', before: 'خخحس', after: 'oops' },
      { intent: 'Meant اوبس — keyboard was English', before: 'h,fs', after: 'اوبس' },
    ],
    features: [
      'Maps keyboard positions between Arabic and English — not a translation',
      'Replaces the selection in place without using the clipboard',
      'Works in Notepad, Office, browsers, chat apps, and address bars',
      'Falls back through Win32 edit messages, Unicode keystrokes, and UI Automation',
      'Tray settings for hotkey, startup, sound, and notifications',
      'Runs fully offline with no installer',
    ],
    technologies: ['C#', '.NET 8', 'WPF', 'Windows Forms', 'Win32', 'UI Automation'],
    slug: 'oops',
    aliases: ['keyfix'],
  },
  {
    title: 'Smart Parking System',
    description:
      'A hardware-based solution designed to automate and optimize the process of vehicle parking. The system detects available parking slots using ultrasonic sensors and provides real-time feedback to drivers through visual indicators.',
    features: [
      'Detects car presence using ultrasonic sensors',
      'LED indicators display available/occupied slots',
      'Microcontroller (Arduino) manages real-time data',
      'Simple, lightweight system — no database or login required',
      'Fully functional prototype tested in a controlled environment',
    ],
    technologies: [
      'Arduino Uno',
      'Ultrasonic Sensors (HC-SR04)',
      'LED indicators',
      'Breadboard & jumper wires',
      'C++ (Arduino IDE)',
    ],
    recognition: 'Awarded 2nd Best Senior Project at University of Jeddah',
  },
  {
    title: 'Portfolio Website',
    description:
      'A modern, responsive portfolio website showcasing my skills, projects, and experience. Built with React and TypeScript for optimal performance and maintainability.',
    features: [
      'Responsive design for all devices',
      'Modern UI/UX with smooth animations',
      'Optimized performance',
    ],
    technologies: ['React', 'TypeScript', 'CSS', 'HTML', 'Vite'],
  },
];

function findProjectBySlug(slug: string): Project | undefined {
  const key = slug.toLowerCase();
  return projects.find((project) => project.slug === key || project.aliases?.includes(key));
}

export function projectAnchorId(slug: string): string | null {
  const project = findProjectBySlug(slug);
  return project?.slug ? `project-${project.slug}` : null;
}

export function isProjectDetailSlug(slug: string): boolean {
  const project = findProjectBySlug(slug);
  return Boolean(project?.video || project?.presentation);
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="project-modal-backdrop" onClick={onClose} role="presentation">
      <div className="project-modal-scroll" onClick={(e) => e.stopPropagation()}>
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button
            type="button"
            className="project-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="fas fa-times" />
          </button>

          <header className="project-modal-header">
            {project.image && (
              <img className="project-modal-icon" src={project.image} alt="" />
            )}
            <div>
              <h3 id="project-modal-title" className="project-modal-title">
                {project.title}
              </h3>
              <p className="project-modal-subtitle">Photos with map QR codes</p>
            </div>
          </header>

          {project.detailIntro && (
            <p className="project-modal-intro">{project.detailIntro}</p>
          )}

          <div className="project-modal-features">
            <h4>Features</h4>
            <ul>
              {project.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="project-modal-tech">
            {project.technologies.map((tech, idx) => (
              <span key={`${tech}-${idx}`} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>

          {project.video && (
            <section className="project-modal-section">
              <h4>
                <i className="fas fa-play-circle" aria-hidden /> App demo
              </h4>
              <video
                className="project-modal-video"
                src={project.video}
                controls
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </section>
          )}

          {project.presentation && (
            <section className="project-modal-section project-modal-section--last">
              <h4>
                <i className="fas fa-file-pdf" aria-hidden /> Presentation
              </h4>
              <iframe
                className="project-modal-pdf"
                src={project.presentation}
                title={`${project.title} presentation`}
              />
              <a
                className="project-modal-pdf-link"
                href={project.presentation}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt" aria-hidden /> Open presentation in new tab
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

const Projects: React.FC<{
  projectSlug?: string | null;
  onOpenProject?: (slug: string) => void;
  onCloseProject?: () => void;
}> = ({ projectSlug = null, onOpenProject, onCloseProject }) => {
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  const closeDetail = useCallback(() => {
    if (onCloseProject) onCloseProject();
    else setDetailProject(null);
  }, [onCloseProject]);

  useEffect(() => {
    if (!projectSlug) {
      setDetailProject(null);
      return;
    }
    const project = findProjectBySlug(projectSlug);
    if (project && (project.video || project.presentation)) setDetailProject(project);
    else setDetailProject(null);
  }, [projectSlug]);

  useEffect(() => {
    if (!detailProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetail();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [detailProject, closeDetail]);

  const openDetail = (project: Project) => {
    if (!(project.video || project.presentation) || !project.slug) return;
    if (onOpenProject) onOpenProject(project.slug);
    else setDetailProject(project);
  };

  const isClickable = (project: Project) => Boolean(project.video || project.presentation);

  const modal =
    detailProject &&
    createPortal(
      <ProjectDetailModal project={detailProject} onClose={closeDetail} />,
      document.body
    );

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.slug ?? project.title}
              id={project.slug ? `project-${project.slug}` : undefined}
              className={`project-card${isClickable(project) ? ' project-card--clickable' : ''}`}
              role={isClickable(project) ? 'button' : undefined}
              tabIndex={isClickable(project) ? 0 : undefined}
              onClick={() => openDetail(project)}
              onKeyDown={(e) => {
                if (isClickable(project) && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  openDetail(project);
                }
              }}
            >
              {project.image && (
                <div className="project-image">
                  <img src={project.image} alt={`${project.title} app icon`} />
                </div>
              )}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              {project.example && (
                <div className="project-example">
                  <h4>Example</h4>
                  <p className="project-example-note">Select the text, then press Ctrl+I.</p>
                  <div className="project-example-list">
                    {project.example.map((row) => (
                      <div className="project-example-row" key={row.before}>
                        <span className="project-example-intent">{row.intent}</span>
                        <div className="project-example-convert">
                          <span className="project-example-text" dir="auto">
                            {row.before}
                          </span>
                          <i className="fas fa-arrow-right project-example-arrow" aria-hidden />
                          <span className="project-example-text" dir="auto">
                            {row.after}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isClickable(project) && (
                <p className="project-hint">
                  <i className="fas fa-hand-pointer" aria-hidden /> Click for demo video &amp; presentation
                </p>
              )}

              <div className="project-features">
                <h4>Features</h4>
                <ul>
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-tech">
                {project.technologies.map((tech, idx) => (
                  <span key={`${tech}-${idx}`} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {project.recognition && (
                <div className="project-recognition">
                  <span className="recognition-badge">🏆 {project.recognition}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {modal}
    </section>
  );
};

export default Projects;
