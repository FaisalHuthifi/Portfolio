import React from 'react';
import './Certifications.css';

const certifications = [
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'May 2025',
  },
  {
    name: 'Introduction to Java',
    issuer: 'LearnQuest',
    date: '11/2021',
  },
  {
    name: 'Computer Hardware and Software',
    issuer: 'University of California, Irvine',
    date: '05/2022',
  },
  {
    name: 'Object-Oriented Programming Concepts',
    issuer: 'LearnQuest',
    date: '05/2022',
  },
  {
    name: 'Database Management Essentials',
    issuer: 'University of Colorado System',
    date: '05/2023',
  },
  {
    name: 'Fundamentals of Project Planning and Management',
    issuer: 'University of Virginia',
    date: '05/2023',
  },
  {
    name: 'Initiating and Planning Projects',
    issuer: 'University of California, Irvine',
    date: '05/2023',
  },
  {
    name: 'Introduction to Networking and Storage (with Honors)',
    issuer: 'IBM',
    date: '05/2023',
  },
  {
    name: 'Software Development Processes and Methodologies',
    issuer: 'University of Minnesota',
    date: '02/2023',
  },
  {
    name: 'Data Structures',
    issuer: 'University of California San Diego',
    date: '10/2022',
  },
];

// Helper to parse date strings like 'May 2025' or '05/2022' to a comparable Date object
function parseCertDate(dateStr: string): Date {
  // Try MM/YYYY
  if (/^\d{2}\/\d{4}$/.test(dateStr)) {
    const [month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1);
  }
  // Try Month YYYY
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const parts = dateStr.split(' ');
  if (parts.length === 2) {
    const monthIdx = monthNames.findIndex(m => m.startsWith(parts[0]));
    const year = Number(parts[1]);
    if (monthIdx !== -1 && !isNaN(year)) {
      return new Date(year, monthIdx);
    }
  }
  // Fallback: try Date.parse
  return new Date(dateStr);
}

const sortedCerts = certifications.slice().sort((a, b) => parseCertDate(b.date).getTime() - parseCertDate(a.date).getTime());

const Certifications: React.FC = () => {
  return (
    <section className="certifications-section" id="certifications">
      <div className="certifications-container">
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-list">
          {sortedCerts.map((cert, idx) => (
            <div key={idx} className="certification-item">
              <h3 className="certification-name">{cert.name}</h3>
              <div className="certification-meta">
                <span className="certification-issuer">{cert.issuer}</span>
                <span className="certification-date">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications; 