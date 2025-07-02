import './TechArtGrid.scss';
import img from '../../assets/images/placeholder.png';
import train from '../../assets/images/train_still.png';
import tools from '../../assets/images/tools_smaller.png';
import crowd from '../../assets/images/crowd_small.png';
import autorigger from '../../assets/images/autorigger_edited.png';
import wb from '../../assets/images/wildbrain.png';
import p4file from '../../assets/images/p4_file.png';
import pawpatrol from '../../assets/images/pawpatrol.png';
import linkedinIcon from '../../assets/icons/linkedin_clean.png';
import emailIcon from '../../assets/icons/email_clean.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUnlock } from '../../context/UnlockContext';

const VIDEO_PASSWORD = 'anoshkajhaveridemoreel1111!';

// Project data (update with actual images & links)
const projects = [
  {
    title: 'Paw Patrol Rubble and Crew',
    software: 'Python | Maya',
    image: pawpatrol,
    link: '/tech_art/pawpatrol',
    description: `
      Developed Vehicle rigs for Rubble & Crew at Shapeshifters Interactive
    `,
    isProtected: true,
    className: 'project-list__item--protected',
  },
  {
    title: 'Work at Wildbrain Studios',
    software: 'Python | Maya',
    image: wb,
    link: '/tech_art/fireman_sam',
    description: `
      Worked on Fireman Sam season 13, which was the first season rendered in Unreal Engine, Lego and Friends season 2, and In The Night Garden. 
      `,
    isProtected: true,
    className: 'project-list__item--protected',
  },

  {
    title: 'Spidey and His Amazing Friends',
    software: 'Python | Maya',
    image: img,
    link: '/tech_art/spidey',
    description: `
      Worked on this Disney production at Atomic Cartoons
    `,
    isProtected: true,
    className: 'project-list__item--protected',
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

  {
    title: 'Asset Management',
    software: 'Python | p4v | REST APi | JSON | Jira',
    image: p4file,
    link: '/tech_art/asset_management',
    description: `
      Developed an asset management system between Perforce, Jira and Prism, that centralises ticket management, asset updates 
      validation and production status

      - Subprocess bash shell for user interaction
      - Automates asset management within one platform 
      - Auto updates perforce check-ins and Jira ticket status, and provides production information for management
    `,
  },
  {
    title: 'Crowd Automations and Shotgrid SDK updates',
    software: 'Python | Maya | Houdini | Bash',
    image: crowd,
    imageClassName: 'project-list__image--crowd',
    link: '/tech_art/crowd_automations',
    description: `
      Crowd Automation - A system that inputs motion capture skeleton data and batch applies to multiple photogrammetry models, removing manual rigging process and reducing rig production time from over a month to two days, developed at Versatile Media. 
      `,
    //   - Developed and scripted an HDA that takes file input and output paths and generates rig
    //   - subprocesses maya to generate auto-rig process through customised Vetala code
    //   - seamlessly transfers motion capture data from Motion Builder to Unreal engine, allowing a crowd to be built in under 24 hours
    // ,
  },
  {
    title: 'Train Crash',
    software: 'Houdini | Maya | PyMel',
    image: train,
    link: '/tech_art/train_crash',
    description: `
      A passion project developed at Capilano University

      - A mathematically accurate steam locomotive  
      - Train crash into a cabin, animation created in Autodesk Maya, and physics manipulated in Houdini
      - Dust and particle effects created in Houdini, substance painter used for train texturing
    `,
  },
];

const TechArtGrid = () => {
  const { unlocked, unlockContent, lockContent } = useUnlock();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Check sessionStorage for authentication state on component mount
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
      // Store authentication state in sessionStorage
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

  // Filter projects based on protection status
  const visibleProjects = projects.filter(
    (project) => !project.isProtected || unlocked
  );

  return (
    <div className="work">
      <p className="work__welcome">Welcome to my tech art portfolio!</p>
      {!unlocked && (
        <p>
          Some of my work, including my demoreel, is password protected due to
          copyright restrictions. Please enter the password here:
        </p>
      )}
      <form onSubmit={handleSubmit} className="password-form">
        <div className="password-input-container">
          {!unlocked && (
            <>
              <input
                type={showPassword ? 'text' : 'password'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
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
        {!unlocked && <button type="submit">Unlock Content</button>}
      </form>
      {error && <p className="error">{error}</p>}
      {showSuccess && (
        <p className="success">
          Congrats! Please scroll down the page to see additional projects and
          reel.
        </p>
      )}
      {!unlocked && (
        <p className="contact-text">
          If you do not have my password, please feel free to reach out to me:
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
            key={index}
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

export default TechArtGrid;
