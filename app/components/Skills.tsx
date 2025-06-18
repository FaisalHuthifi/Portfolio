import React, { useState } from 'react';
import './Skills.css';

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Basic';
  category: 'cloud' | 'network' | 'automation';
  icon?: string;
}

const skills: Skill[] = [
  // Cloud & Infrastructure
  { name: 'Azure', level: 'Advanced', category: 'cloud', icon: '☁️' },
  { name: 'Docker', level: 'Intermediate', category: 'cloud', icon: '🐳' },
  { name: 'Kubernetes', level: 'Intermediate', category: 'cloud', icon: '⚓' },
  { name: 'CI/CD', level: 'Intermediate', category: 'cloud', icon: '🔄' },
  
  // Network & Security
  { name: 'Network Design', level: 'Intermediate', category: 'network', icon: '🌐' },
  { name: 'Security Protocols', level: 'Intermediate', category: 'network', icon: '🔒' },
  { name: 'Firewall Configuration', level: 'Intermediate', category: 'network', icon: '🛡️' },
  { name: 'VPN Setup', level: 'Intermediate', category: 'network', icon: '🔐' },
  { name: 'Network Monitoring', level: 'Intermediate', category: 'network', icon: '📊' },
  
  // Problem-Solving & Automation
  { name: 'Python', level: 'Intermediate', category: 'automation', icon: '🐍' },
  { name: 'Bash Scripting', level: 'Intermediate', category: 'automation', icon: '💻' },
  { name: 'Ansible', level: 'Intermediate', category: 'automation', icon: '⚙️' },
  { name: 'Git', level: 'Intermediate', category: 'automation', icon: '📦' },
  { name: 'Linux Administration', level: 'Intermediate', category: 'automation', icon: '🐧' }
];

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('cloud');

  const categories = {
    cloud: 'Cloud & Infrastructure',
    network: 'Network & Security',
    automation: 'Problem-Solving & Automation'
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return '#ff6b6b';
      case 'Advanced':
        return '#7c4dff';
      case 'Intermediate':
        return '#50e3c2';
      case 'Basic':
        return '#4a90e2';
      default:
        return '#4a90e2';
    }
  };

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="section-title">Technical Expertise</h2>
        
        <div className="category-tabs">
          {Object.entries(categories).map(([key, title]) => (
            <button
              key={key}
              className={`category-tab ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {title}
            </button>
          ))}
        </div>

        <div className="skills-content">
          <div className="skills-grid">
            {skills
              .filter(skill => skill.category === activeCategory)
              .map(skill => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="skill-info">
                    <h3 className="skill-name">{skill.name}</h3>
                    <div className="skill-level-container">
                      <div 
                        className="skill-level-bar"
                        style={{
                          width: `${skill.level === 'Expert' ? 100 : 
                                 skill.level === 'Advanced' ? 80 :
                                 skill.level === 'Intermediate' ? 60 : 40}%`,
                          backgroundColor: getLevelColor(skill.level)
                        }}
                      />
                    </div>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 