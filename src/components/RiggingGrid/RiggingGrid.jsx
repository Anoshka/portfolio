import '../TechArtGrid/TechArtGrid.scss';
import { Link } from 'react-router-dom';
import { useUnlock } from '../../context/UnlockContext';
import { useEffect, useState } from 'react';
import linkedinIcon from '../../assets/icons/linkedin_clean.png';
import emailIcon from '../../assets/icons/email_clean.png';
import pawpatrol from '../../assets/images/pawpatrol.png';
import wb from '../../assets/images/wildbrain.png';
import gamejam from '../../assets/images/everything_must_ghost.png';
import autorigger from '../../assets/images/autorigger_edited.png';
import tools from '../../assets/images/tools_smaller.png';

const VIDEO_PASSWORD = 'anoshkajhaveridemoreel1111!';

const riggingProjects = [
  {
    title: 'Work at Wildbrain Studios',
    software: 'Python | Maya | Unreal Engine',
    image: wb,
    link: '/rigging/fireman_sam',
    description: `
      Fireman Sam season 13 was the first season rendered in Unreal Engine.
      I developed production rigging tools and collaborated with the team to
      solve unique challenges that came with moving a long-running show into a
      realtime pipeline.`,
    isProtected: true,
    className: 'project-list__item--protected',
  },
  {
    title: 'Paw Patrol: Rubble & Crew',
    software: 'Python | Maya',
    image: pawpatrol,
    link: '/rigging/pawpatrol',
    description: `
      Built vehicle rigs and custom tooling for Shapeshifters Interactive.
      These automations accelerated production timelines for the show.`,
    isProtected: true,
    className: 'project-list__item--protected',
  },
  {
    title: 'Everything Must Ghost',
    software: 'Unreal Engine | Maya',
    image: gamejam,
    imageClassName: 'project-list__image--gamejam',
    link: '/tech_art/everything_must_ghost',
    description: `
      A 3D first-person comedy horror game developed during a weeklong game jam, demonstrating comprehensive technical artistry and programming expertise.
      
      - Programming: Developed core gameplay mechanics, backend systems, and interactive UI components in Unreal Engine
      - Rigging: Created custom character rigs with advanced control systems for smooth animation workflows
      - Animation: Implemented character animations and procedural systems for dynamic gameplay experiences
      - Technical Integration: Seamlessly integrated all systems for a polished, playable game experience
    `,
  },
  {
    title: 'Auto Rigger',
    software: 'Python | PyQT/PySide2 | PyMel  | Maya',
    image: autorigger,
    link: '/tech_art/auto_rigger',
    description: `
      A modular automation tool designed to streamline the character rigging process. 
      This tool significantly reduces the manual effort required, providing a fast, 
      efficient, and consistent rigging workflow.
      
      - Fully automated joint placement and skinning process  
      - Allows for custom adjustments, limb additions, stretchy arm/spine and control customisations
      - Intuitive and dockable PyQT UI with control customizations
    `,
  },
  {
    title: 'Rigging Toolkit',
    software: 'Python | PyQT/PySide2 | PyMel  | Maya',
    image: tools,
    link: '/tech_art/rigging_toolkit',
    description: `
      A collection of custom scripts and tools that enhance the rigging process 
      for animators and technical artists. 

      - Clean and intuitive UI  
      - mechanical automations such as auto wheel builder and batch xform connectors
      - Deformation and skinning tools to prepare rig for ingestion into Unreal Engine
      - QOL tools for quick scene updates and visualisation
    `,
  },
];

const RiggingGrid = () => {
  const { unlocked, unlockContent, lockContent } = useUnlock();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      unlockContent();
    } else {
      lockContent();
    }
  }, [unlockContent, lockContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === VIDEO_PASSWORD) {
      unlockContent();
      setError('');
      setShowSuccess(true);
      sessionStorage.setItem('isAuthenticated', 'true');
    } else {
      setError(
        'The password you entered is incorrect. Please ensure you match cases and special characters.'
      );
      setShowSuccess(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const visibleProjects = riggingProjects.filter(
    (project) => !project.isProtected || unlocked
  );

  return (
    <div className="work">
      <p className="work__welcome">
        Rigging is my main focus. Some of this work (including my demo reel) is
        protected for studio privacy. Please enter the password below to view
        the reel and project breakdowns.
      </p>

      <form onSubmit={handleSubmit} className="password-form">
        <div className="password-input-container">
          {!unlocked && (
            <>
              <input
                type={showPassword ? 'text' : 'password'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter password"
                aria-label="Enter password to unlock rigging content"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </>
          )}
        </div>
        {!unlocked && <button type="submit">Unlock Rigging Content</button>}
      </form>

      {error && <p className="error">{error}</p>}
      {showSuccess && (
        <p className="success">
          Access granted! Scroll down to watch the reel and explore the case
          studies.
        </p>
      )}

      {!unlocked && (
        <p className="contact-text">
          Need the password? Reach out here:
          <div className="contact-icons">
            <a
              href="https://www.linkedin.com/in/anoshkajhaveri/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="contact-icon" />
            </a>
            <a href="mailto:anohskaujhaveri@gmail.com" className="contact-link">
              <img src={emailIcon} alt="Email" className="contact-icon" />
            </a>
          </div>
        </p>
      )}

      {unlocked && (
        <div className="video-container">
          <video controls className="portfolio-video">
            <source src="/videos/reel_01.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="project-list">
        {visibleProjects.map((project, index) => (
          <Link
            key={project.title}
            to={project.link}
            className={`project-list__item ${project.className || ''}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className={`project-list__image ${project.imageClassName || ''}`}
            />
            <div className="project-list__content">
              <h3 className="project-list__title">{project.title}</h3>
              <p className="project-list__software">{project.software}</p>
              <p className="project-list__description">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RiggingGrid;
