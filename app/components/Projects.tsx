import React from 'react';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  recognition?: string;
}

const projects = [
  {
    title: "Smart Parking System",
    description: "A hardware-based solution designed to automate and optimize the process of vehicle parking. The system detects available parking slots using ultrasonic sensors and provides real-time feedback to drivers through visual indicators.",
    features: [
      "Detects car presence using ultrasonic sensors",
      "LED indicators display available/occupied slots",
      "Microcontroller (Arduino) manages real-time data",
      "Simple, lightweight system — no database or login required",
      "Fully functional prototype tested in a controlled environment"
    ],
    technologies: [
      "Arduino Uno",
      "Ultrasonic Sensors (HC-SR04)",
      "LED indicators",
      "Breadboard & jumper wires",
      "C++ (Arduino IDE)"
    ],
    recognition: "Awarded 2nd Best Senior Project at University of Jeddah"
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website showcasing my skills, projects, and experience. Built with React and TypeScript for optimal performance and maintainability.",
    features: [
      "Responsive design for all devices",
      "Modern UI/UX with smooth animations",
      "Optimized performance"
    ],
    technologies: ["React", "TypeScript", "CSS", "HTML", "Vite"]
  }
];

const Projects: React.FC = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
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
                  <span key={`${tech}-${idx}`} className="tech-tag">{tech}</span>
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
    </section>
  );
};

export default Projects; 