import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <h3 className="about-greeting">Hi, I'm Faisal AlHuthifi</h3>
            <p>
            IT graduate passionate about Cloud Computing, Networking, and Security. I love building smart solutions that make life easier. Whether it's improving cloud systems, securing networks,
             or automating tasks, I enjoy creating efficient tech that solves real problems.
            </p>
            <p>
              When I'm not working on a project, I focus on evolving myself through self-learning. 
              Whether it's diving into cloud computing, networking, or cybersecurity, I enjoy teaching myself 
              new skills and staying ahead in the tech world.
            </p>
            <div className="stats-container">
              <div className="stat-item">
                <h4>2+</h4>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h4>1+</h4>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-container">
              {
                <img src="public\Pfai.PNG" alt="About" />
              }
              <div className="image-placeholder">
                <span>Your Photo</span>
              </div>
            </div>
          </div>
        </div>
        <div className="education-container">
          <div className="education-date">Jan 2021 - Jan 2025</div>
          <h4>Education</h4>
          <div className="education-item">
            <span className="education-school">University of Jeddah</span><br />
            <span className="education-degree">Bachelor's degree, Information Technology | GPA: 4.1 / 5</span>
          </div>
        </div>
        <div className="expertise-areas">
          <div className="expertise-item">
            <h4>Cloud & Infrastructure</h4>
            <p>Designing reliable and scalable cloud-based systems while managing the underlying infrastructure for optimal performance and availability.</p>
          </div>
          <div className="expertise-item">
            <h4>Network & Security</h4>
            <p>Ensuring secure, efficient communication between systems by implementing strong network architectures and cybersecurity practices.</p>
          </div>
          <div className="expertise-item">
            <h4>Problem-Solving & Automation</h4>
            <p>Creating smart solutions to simplify tasks and workflows through automation and self-taught innovation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 