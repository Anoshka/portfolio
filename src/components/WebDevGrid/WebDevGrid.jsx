import './WebDevGrid.scss';
import img1 from '../../assets/images/placeholder_01.png';
import img from '../../assets/images/placeholder.png';
import portfolio_img from '../../assets/images/portfolio_img.png';
import scrapply_img from '../../assets/images/scrapply_img.png';
import pawdl_img from '../../assets/images/pawdl_img_01.png';
import bell_img from '../../assets/images/bell_img_02.png';
import instock_img from '../../assets/images/instock_img.png';
import brainflix_img from '../../assets/images/brainflix_img.png';

const projects = [
  {
    title: 'WrigglyBun Photography',
    software: 'React | MySQL | Node.JS | Express.js | Cloudinary',
    image: img1,
    link: '/web_dev/wrigglybun',
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
    title: 'Scrapply Backend',
    software: 'Python | Selenium | JSON',
    image: scrapply_img,
    link: '/web_dev/scrapply',
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
    title: 'Portfolio',
    software: 'React | MySQL | Node.JS | GPT-3.5 | SASS',
    image: portfolio_img,
    link: '/web_dev/portfolio',
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
    title: 'Pawdl',
    software: 'React | MySQL | Node.JS | Express.js | Socket.io',
    image: pawdl_img,
    link: '/web_dev/pawdl',
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
    link: '/web_dev/bell_media_innovation_station',
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
    link: '/web_dev/instock',
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
    link: '/web_dev/brainflix',
    github: 'private',
    site: '',
    description: `
     Built as part of BrainStation’s full-stack curriculum, BrainFlix replicates core features of platforms like YouTube or Vimeo.
    - Developed a full-stack video hosting platform using React, Node.js, Express, SCSS, and MySQL
    - Created a structured RESTful API to support video upload, playback, editing, deletion, and metadata management
    - Implemented dynamic video routing, comment threads, and like counters
    - Designed and built responsive UI components for the video player, sidebar suggestions, and user interactions
    - Integrated backend data flow with client-side rendering using clean API service architecture
    - Focused on intuitive UX, mobile responsiveness, and real-world feature parity
    `,
  },
];

const WebDevGrid = () => {
  return (
    <div className="web-project-list">
      <p className="work__welcome">Welcome to my tech art portfolio!</p>
      <div className="resume-download-section">
        <button
          className="work__resume"
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/pdfs/AnoshkaJhaveri_WebDev_CV.pdf';
            link.download = 'AnoshkaJhaveri_WebDev_Resume.pdf';
            link.click();
          }}
        >
          📄 Download Tech Art Resume
        </button>
      </div>
      {projects.map((project, index) => (
        <div key={index} className="web-project-list__item">
          <img
            src={project.image}
            alt={project.title}
            className="web-project-list__image"
          />
          <div className="web-project-list__content">
            <h3 className="web-project-list__title">
              {project.title}
              <span className="web-project-list__links">
                {project.github === 'private' ? (
                  <span className="web-project-list__link web-project-list__link--non-link">
                    {' '}
                    Private Repo
                  </span>
                ) : project.github ? (
                  <a
                    href={project.github}
                    className="web-project-list__link web-project-list__link--link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      data-supported-dps="16x16"
                      fill="currentColor"
                      className="web-project-list__redirect"
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
                    className="web-project-list__link web-project-list__link--link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See Site
                  </a>
                )}
              </span>
            </h3>
            <p className="web-project-list__software">{project.software}</p>
            <p className="web-project-list__description">
              {project.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebDevGrid;
