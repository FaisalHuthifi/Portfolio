import React from 'react';
import './Experience.css';

const experiences = [
  {
    role: 'Administrative Assistant',
    company: 'Saudi Ground Services',
    period: 'March 2025 - June 2025',
    description: `Oversaw and maintained inventory of new IT equipment, ensuring timely procurement, proper documentation.\nWorked with the Airport Director to address all requests and requirements, ensuring smooth operations.`
  },
  {
    role: 'Trainee',
    company: 'The Saudi National Bank - SNB',
    period: 'June 2024 - July 2024',
    description: `Deployed software and applied security patches using SCCM.\nCreated and maintained Power BI reports for business analysis.\nAssisted in updating device policies to improve security and system performance.`
  }
];

const Experience: React.FC = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-list">
          {experiences.map((exp, idx) => (
            <div key={idx} className="experience-item">
              <h3 className="experience-role">{exp.role}</h3>
              <div className="experience-meta">
                <span className="experience-company">{exp.company}</span>
                <span className="experience-period">{exp.period}</span>
              </div>
              {exp.description.split('\n').map((line, i) => (
                <p className="experience-description" key={i}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 