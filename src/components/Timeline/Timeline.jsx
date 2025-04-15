import './Timeline.scss';

const timelineData = [
  {
    title: 'Freelance Web Developer | WrigglyBun Photography',
    date: 'NOV 2024 – PRESENT',
    location: 'Vancouver, BC',
    details: [
      'Developed a responsive website using the MERN stack',
      'Integrated AWS for image storage, boosting performance by 50%',
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
