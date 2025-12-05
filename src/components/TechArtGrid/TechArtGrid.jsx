import './TechArtGrid.scss';
import train from '../../assets/images/train_still.png';
import tools from '../../assets/images/tools_smaller.png';
import crowd from '../../assets/images/crowd_small.png';
import autorigger from '../../assets/images/autorigger_edited.png';
import p4file from '../../assets/images/p4_file.png';
import { Link } from 'react-router-dom';
import gamejam from '../../assets/images/everything_must_ghost.png';
import img1 from '../../assets/images/placeholder_01.png';
import portfolio_img_01 from '../../assets/images/portfolio_img_01.png';
import scrapply_img from '../../assets/images/scrapply_img.png';
import pawdl_img from '../../assets/images/pawdl_img_01.png';
import bell_img from '../../assets/images/bell_img_02.png';
import instock_img from '../../assets/images/instock_img.png';
import brainflix_img from '../../assets/images/brainflix_img.png';
import perforce_img from '../../assets/images/perforce.png';

// Project data (update with actual images & links)
const projects = [
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
    title: 'Portfolio DevOps',
    software: 'React | MySQL | Node.JS | GPT-3.5 | SASS',
    image: portfolio_img_01,
    link: 'https://github.com/Anoshka/portfolio',
    github: 'https://github.com/Anoshka/portfolio',
    site: 'https://anoshkajhaveri.com',
    description: `
      A self-hosted portfolio site built to showcase projects, and experiment with AI-integrated DevOps. 
      - Built with React, SCSS, and a responsive, theme-adjustable UI
      - Designed and deployed with a full GitHub Actions CI/CD pipeline 
      - Integrated OpenAI (GPT-3.5) into the testing phase to auto-generate Jest test cases from JSON prompts
      - Pipeline includes code formatting, test validation, and automated PR creation + Netlify deployment
      - Includes AI fallback system to ensure build continuity during token/prompt limitations
      - Modular pipeline configured by YAML and limited to select branches for clean feature workflows
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
    title: 'Perforce Integration & ShotGrid SDK Updates',
    software: 'Python | Maya | Houdini | ShotGrid | Perforce',
    image: perforce_img,
    imageClassName: 'project-list__image--p4',
    link: '/tech_art/perforce_integration',
    description: `
    A suite of tools and pipeline updates developed at Shapeshifters Interactive to streamline department workflows. Includes a one-click Perforce pull shelf tool for rapid scene staging, full Perforce integration within ShotGrid, and an updated ShotGrid SDK that loads only department-specific plugins, performs targeted validation, and automates Perforce setup. These improvements significantly reduced publish errors, simplified artist workflows, and lowered support ticket volume across departments.
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
    className: 'project-list__item',
  },
  {
    title: 'Scrapply Backend',
    software: 'Python | Selenium | JSON',
    image: scrapply_img,
    link: '/tech_art',
    github: 'private',
    site: '',
    description: `
     A Python-based backend tool designed to automate low-priority job searches and free up time for meaningful applications and project work.
      - Built with Python and Selenium to scrape job listings from Indeed, ZipRecruiter, and Job Bank
      - Uses a JSON config to filter by location, keywords, and posting date
      - Returns structured job data sorted by recency for fast review or automated handling
      - Currently developing resume/cover letter integration and auto-application logic
      - Designed as a personal system to reduce time spent on bulk applications while maintaining focus on high-priority roles
    `,
  },
  {
    title: 'WrigglyBun Photography',
    software: 'React | MySQL | Node.JS | Express.js | Cloudinary',
    image: img1,
    link: 'https://github.com/Anoshka/WrigglyBun_Client',
    github: 'https://github.com/Anoshka/WrigglyBun_Client',
    site: 'https://www.wrigglybunphotography.com/',
    description: `
      End-to-end web solution for a small business client in the maternity photography space.
      - Designed and developed a full-stack application using React, Node.js, Express, MySQL, and SCSS
      - Translated client directives into a responsive, custom-branded UI with a defined color system 
      - Integrated Google Analytics and SEO best practices to improve visibility and traffic
      - Managed deployment, hosting (Netlify), and budget constraints as part of an efficient system design
      - Currently integrating Cloudinary for scalable, performant image delivery
    `,
  },

  {
    title: 'Pawdl',
    software: 'React | MySQL | Node.JS | Express.js | Socket.io',
    image: pawdl_img,
    link: 'https://github.com/Anoshka/pawdl_client',
    github: 'https://github.com/Anoshka/pawdl_client',
    site: 'https://pawdl.netlify.app',
    description: `
        A full-stack social media app built to help pet lovers connect, chat, and set up puppy playdates.
      - Built with React, Node.js, Express.js, MySQL, and SCSS
      - Implemented secure authentication with JWT tokens and real-time chat via Socket.io
      - Designed and deployed a RESTful API for full user CRUD: profile creation, edits, deletion, and chat history
      - Supports social features like posting, commenting, liking, and adding friends
      - Users can discover new friends or browse existing ones through dynamic filters and pages
      - (In progress) Map-based friend discovery with Leaflet.js for location-aware connections
      - A playful, responsive experience that blends real-time messaging with social discovery, hosted on Netlify and Heroku
    `,
  },
  {
    title: 'Bell Media Innovation Station',
    software: 'React | MySQL | Node.JS | Express.js',
    image: bell_img,
    link: 'https://github.com/Anoshka/group-innovation-station-bell-industrial-hackthon',
    github:
      'https://github.com/Anoshka/group-innovation-station-bell-industrial-hackthon',
    site: '',
    description: `
      A 24-hour hackathon to build internal portal prototype for Bell employees to access and engage with mental health resources, built at Brainstation.
      - Designed and implemented the backend system: SQL schema, seeded data, API routes, and controller logic using MySQL and Express
      - Built and tested endpoints in Postman, and created service files for clean frontend integration
      - Contributed to responsive frontend features, including form templates and registration workflows
      - Acted as a server-side integration engineer: managed the GitHub backend repo, performed code reviews, tested pull requests, and maintained a stable main branch
      - Co-led planning discussions and presented the final solution to stakeholders
    `,
  },
  {
    title: 'InStock',
    software: 'React | MySQL | Node.JS | Express.js',
    image: instock_img,
    link: '/tech_art',
    github: 'private',
    site: '',
    description: `
      Built during a one-week sprint at BrainStation, simulating real-world client work in a five-developer team.
      - Led backend development: designed SQL schema, authored seed data, created routes and controller logic using Node.js and Express
      - Managed the backend GitHub repository: reviewed pull requests, tested integrations, and maintained a clean main branch
      - Built RESTful APIs for core features including inventory filtering, search, sorting, and user actions
      - Developed frontend service files to connect client-side logic to the backend APIs
      - Contributed to frontend features including form handling, dynamic tables, and responsive design
      - Acted as a cross-functional resource: supported teammates with backend questions and helped debug integration issues
 
    `,
  },
  {
    title: 'Brainflix',
    software: 'React | MySQL | Node.JS | Express.js',
    image: brainflix_img,
    link: '/tech_art',
    github: 'private',
    site: '',
    description: `
     Built as part of BrainStation's full-stack curriculum, BrainFlix replicates core features of platforms like YouTube or Vimeo.
    - Developed a full-stack video hosting platform using React, Node.js, Express, SCSS, and MySQL
    - Created a structured RESTful API to support video upload, playback, editing, deletion, and metadata management
    - Implemented dynamic video routing, comment threads, and like counters
    - Designed and built responsive UI components for the video player, sidebar suggestions, and user interactions
    - Integrated backend data flow with client-side rendering using clean API service architecture
    - Focused on intuitive UX, mobile responsiveness, and real-world feature parity
    `,
  },
];

const TechArtGrid = () => {
  return (
    <div className="work">
      <p className="work__welcome">Welcome to my tech art portfolio!</p>
      <div className="resume-download-section">
        <button
          className="work__resume"
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/pdfs/AnoshkaJhaveri_TechArt_CV.pdf';
            link.download = 'AnoshkaJhaveri_TechArt_Resume.pdf';
            link.click();
          }}
        >
          📄 Download resume
        </button>
      </div>

      <div className="project-list">
        {projects.map((project) => (
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
              <h3 className="project-list__title">
                {project.title}
                {(project.github || project.site) && (
                  <span className="project-list__links">
                    {project.github === 'private' ? (
                      <span className="project-list__link project-list__link--non-link">
                        {' '}
                        Private Repo
                      </span>
                    ) : project.github ? (
                      <a
                        href={project.github}
                        className="project-list__link project-list__link--link"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          data-supported-dps="16x16"
                          fill="currentColor"
                          className="project-list__redirect"
                          width="16"
                          height="16"
                          focusable="false"
                          style={{ marginLeft: '4px', display: 'inline-block' }}
                        >
                          <path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
                        </svg>
                      </a>
                    ) : null}
                    {project.site && (
                      <a
                        href={project.site}
                        className="project-list__link project-list__link--link"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        See Site
                      </a>
                    )}
                  </span>
                )}
              </h3>
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
