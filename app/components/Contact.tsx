import React from 'react';
import './Contact.css';
import emailjs from 'emailjs-com';

const Contact: React.FC = () => {
  const handleEmailClick = (subject: string = '', body: string = '') => {
    const email = 'faisalmohalhuthifi@gmail.com';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
            
            <div className="info-items">
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>faisalmohalhuthifi@gmail.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h4>Phone</h4>
                  <p>+966 50 516 9679</p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Location</h4>
                  <p>Jeddah, Saudi Arabia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-actions">
            <h3>Send me a message</h3>
            <p>Click on any of the options below to open your email client:</p>
            
            <div className="mailto-buttons">
              <button 
                className="mailto-button"
                onClick={() => handleEmailClick('Project Inquiry', 'Hello Faisal,\n\nI would like to discuss a project with you.\n\nBest regards,')}
              >
                <i className="fas fa-briefcase"></i>
                Project Inquiry
              </button>
              
              <button 
                className="mailto-button"
                onClick={() => handleEmailClick('Job Opportunity', 'Hello Faisal,\n\nI have a job opportunity that might interest you.\n\nBest regards,')}
              >
                <i className="fas fa-user-tie"></i>
                Job Opportunity
              </button>
              
              <button 
                className="mailto-button"
                onClick={() => handleEmailClick('General Inquiry', 'Hello Faisal,\n\nI would like to get in touch with you.\n\nBest regards,')}
              >
                <i className="fas fa-envelope"></i>
                General Inquiry
              </button>
              
              <button 
                className="mailto-button"
                onClick={() => handleEmailClick('', 'Hello Faisal,\n\n')}
              >
                <i className="fas fa-edit"></i>
                Custom Message
              </button>
            </div>
          </div>
        </div>

        <div className="social-links">
          <a
            href="https://github.com/FaisalHuthifi"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/faisal-alhuthifi"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 