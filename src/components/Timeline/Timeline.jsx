import './Timeline.scss';

const timelineData = [
  {
    title: 'The Glyph Lab | Freelance Technical Artist and Tools Developer',
    date: 'NOV 2024 – PRESENT',
    location: 'Vancouver, BC',
    details: [
      'Contributed to online multiplayer game features, UI systems, and interactive minigames in Unity',
      ' Created tools using C++ and Python for shader plugins, asset optimization, and real-time production workflows',
      'Deployed CI/CD pipeline with GitHub Actions and Netlify, integrating GPT-3.5–powered automated unit testing',
      'Prototyped mobile-friendly Unity games with animation systems, scoring logic, and multi-platform deployment',
      'Developed and deployed full-stack websites with React, Node.js, and secure OAuth-based media handling for small businesses',
      'Built custom browser automation tools with Selenium, streamlining job data parsing and automating submission workflows',
    ],
  },
  {
    title: 'Atomic Cartoons | CG Rigging Artist',
    date: 'NOV 2023 - JUNE 2024',
    location: 'Vancouver, BC',
    details: [
      'Created and deployed rigs for a Disney production',
      'Built python tools for rigging assets',
    ],
  },
  {
    title: 'Creature & Rigging Technical Director | Versatile Media',
    date: 'JAN 2023 - AUG 2023',
    location: 'Vancouver, BC',
    details: [
      'Developed scalable automations, increasing artist efficiency by 40%',
      'Debugged pipeline issues, ensuring smooth client delivery',
    ],
  },
  {
    title: 'Generalist Technical Director | Shapeshifters Creative',
    date: 'NOV 2021 - NOV 2022',
    location: 'Vancouver, BC',
    details: [
      'Built validators & toolkits for an optimized animation pipeline',
      'Used RESTful API in Python to improve data accessibility across Jira, Slack & Shotgrid',
    ],
  },
  {
    title: 'Rigging Artist | Wildbrain Studios',
    date: 'JUNE 2020 - NOV 2021',
    location: 'Vancouver, BC',
    details: [
      'Developed custom tools to streamline workflows for artists',
      'Followed Scrum methodology to design assets for clients & mentor juniors',
    ],
  },
  {
    title: '🎓 BrainStation | Diploma, Software Engineering',
    date: 'AUG 2024 - NOV 2024',
    location: 'Vancouver, BC',
  },
  {
    title: '🎓 Capilano University | Diploma in Visual Effects',
    date: 'SEP 2018 - JUNE 2020',
    location: 'North Vancouver, BC',
  },
  {
    title: '🎓 Mount Carmel College | BA in Communications',
    date: 'JUNE 2014 - APR 2017',
    location: 'North Vancouver, BC',
  },
];

const Timeline = () => {
  return (
    <div className="timeline">
      {timelineData.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-content">
            <h3 className="timeline__title">{item.title}</h3>
            <p>
              <strong>{item.date}</strong> | {item.location}
            </p>
            <ul>
              {item.details &&
                item.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
            </ul>
          </div>
          <div className="timeline-dot"></div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
