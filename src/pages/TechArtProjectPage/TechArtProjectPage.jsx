import { useParams, Link, Navigate } from 'react-router-dom';
import './TechArtProjectPage.scss';
import train from '../../assets/images/train_rig_plan.jpg';
import { useUnlock } from '../../context/UnlockContext';
import game from '../../assets/images/everything_must_ghost.png';

// Example data source (customize as needed)
const projectDetails = {
  auto_rigger: {
    title: 'Auto Rigger',
    description: '',
    content: [
      {
        type: 'paragraph',
        text: 'This tool simplifies the rigging process by removing all node connection and math setups, control connections and heirarchy.',
      },
      {
        type: 'paragraph',
        text: 'All you have to do is pick a template name, import the template, place your controls and build.',
      },

      {
        type: 'paragraph',
        text: 'It sets up an spine Ik, twisty arms, individual mid arm controls, and much more.',
      },
      {
        type: 'video',
        src: '/videos/autorigger_mute.mp4',
        caption: 'Auto Rigger demonstration video',
        className: 'tech-art-project__video--soundless',
      },
      {
        type: 'bulletPoints',
        points: [
          'The UI was built using PyQT. It is dockable, stretchable and easy to use',
          'The installation is simple, just clone the repo, add it to your maya scripts folder and call it. Detailed instructions are provided in the readme',
          'You can add as many limbs as you  like with the template modules provided',
          'This can be used for realistic, creature rigging.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Feel free to add feature requests!',
      },
    ],
    github: 'https://github.com/Anoshka/autorigger',
  },
  rigging_toolkit: {
    title: 'Rigging Toolkit',
    description:
      'A collection of custom scripts and tools that enhance the rigging process for riggers and technical artists.',
    content: [
      {
        type: 'paragraph',
        text: 'Auto Wheel:',
      },
      {
        type: 'bulletPoints',
        points: [
          'Takes a wheel up axis and rotate axis, and builds a wheel system with PyNode setup',
          'Adds wheels controls, with toggles/inputs for wheel radius, speed and auto roll',
          'If auto roll is on, the wheel auto rotates inversely to the main control',
          'This is for individual wheel setups in any mechanical rig',
        ],
      },
      {
        type: 'paragraph',
        text: 'Blendhshape Target Map Importer:',
      },
      {
        type: 'bulletPoints',
        points: [
          'This tool was built at Shapeshifetrs Interactive, keeping metahuman blendshape weighting in mind.',
          'It offers you the freedom to edit intricate blendshape target weights for realistic rigs',
          'One of our bigger struggles was getting clean blendshape weights and transferring them to updated meshes.',
          'This tool allows you to update the blendshape weight maps in any format, and apply it on selected targets',
          'You can choose a smoothness level before you apply your weights',
        ],
      },
      {
        type: 'paragraph',
        text: 'Connections:',
      },
      {
        type: 'bulletPoints',
        points: [
          'This tool simple allows you to connect one target to another ',
          'To run this, you selefct two targets, and the first target will control the traslation, rotation and scale of the second target',
          'There is a batch connect option,  where you select multiple targets, and the first selected target will control the translation, rotation and scale of all the other targets',
          'This is useful for quick control setups and for simple tesing',
        ],
      },
      {
        type: 'paragraph',
        text: 'Controls:',
      },
      {
        type: 'bulletPoints',
        points: [
          'This tab offers quick and easy updates to your rig controls',
          'Swap Shape: this takes multiple control selections, and changes all the control shapes to the first select controls shape. I primarily use this for spine and arm controls to make them even easily.',
          'Pick Control: This allows you to pick a shape from the options and change all selected controls to that shape',
          'Set Colour: this allows you to pick a colour from the options and change all selected controls to that colour. There is also a colour picker if you need to take a colour from the scene or anotehr control.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Deformations:',
      },
      {
        type: 'bulletPoints',
        points: [
          'This was created to clean Metahuman rigs up and prepare them for Unreal Engine, also at Shapeshifters Interactive',
          'It takes either a selection of meshes, or all meshes in the scene and runs cleaning and baking functions',
          'It checks all nodes attached to the mesh and removes duplicates, extras (like orig skincluster nodes) or lingering nodes',
          'It then bakes all deformations onto the mesh - it saves, unbinds and rebinds skin after to do this ',
          'If your scene is heavy, it might take a bit to finish running this, but its a one button step to prepare your rig for Unreal Engine. ',
        ],
      },
      {
        type: 'paragraph',
        text: 'Skinning:',
      },
      {
        type: 'bulletPoints',
        points: [
          'This tool was created as an add on to the existing skinning options that Maya provides',
          'Copy Skin Weights: This allows you to apply skinclusters to multiple unskinned meshes at once. You pick a source, as many targets as you want and run this. It is useful for quick mass binding multiple props at once.',
          'Select Bound Joints: This allows you to pick a mesh, and selects all bound joints for that mesh. Its an easy way to set aside a selection, see if you are missing a joint or manipulate the selection',
          'Rip Skin: This is an updated way of copying weights from one mesh to another - it offers more influence options and details such as mirroring. I use this for high poly meshes that need more fine-tuning.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Feel free to add more feature requests! I plan on growing this as needed, and am always open to suggestions!',
      },
    ],
    github: 'https://github.com/Anoshka/maya_rig_tools',
  },
  asset_management: {
    title: 'Asset Management',
    description: '',
    content: [
      {
        type: 'paragraph',
        text: 'A simple parser built at Shapeshifters Interactive, to access data from a bash shell, and any display on any user interface.',
      },
      {
        type: 'paragraph',
        text: 'Checks users authorisation for Jira and allows queries for:, ',
      },
      {
        type: 'bulletPoints',
        points: [
          'Current Users and user data',
          'All active tickets and open issues',
          'User data',
          'Specific user data based on partial information input - such as finding user info by email id',
        ],
      },
      {
        type: 'paragraph',
        text: 'Checks users authorisation for Perforce, subprocesses a bash shell to run p4 commands, allowing queries for:, ',
      },
      {
        type: 'bulletPoints',
        points: [
          'getting high level projects information',
          'adding files to perforce project',
          'get sync files list for all files that need to be synced',
          'auto check in - runs both add file and check in in one go',
          'get file - input a file name to search all depots and return exact location',
        ],
      },
    ],
    github: 'https://github.com/Anoshka/REST_P4_API',
  },
  crowd_automations: {
    title: 'Crowd Automations and other work at Versatile Media',
    description: '',
    content: [
      {
        type: 'paragraph',
        text: 'The challenge was to build a whole realistic crowd of 40 people within a week.',
      },
      {
        type: 'paragraph',
        text: 'We used photogrammetry to create the models, and Motion Builder to capture specific animations. ',
      },
      {
        type: 'paragraph',
        text: 'We then needed to replace the Motion Builder rig with a metahuman rig, for easy integration into Unreal Engine. We employed an HDA in Houdini to match a metahuman skeleton to the Motion Builder skeleton.',
      },
      {
        type: 'paragraph',
        text: 'The next part was the big time consumer:',
      },
      {
        type: 'bulletPoints',
        points: [
          'validating each mesh to ensure clean topology',
          'rigging each character with clean skins',
          'applying the skins to clothing',
          'applying the animation',
          'final checks and validation, and file exports for Unreal Engine',
        ],
      },
      {
        type: 'paragraph',
        text: 'This would have been a process between three departments, with each character taking 2-3 days to complete.',
      },
      {
        type: 'paragraph',
        text: 'To get around this, we built one character with clean skinning.',
      },
      {
        type: 'paragraph',
        text: 'After this, I created an HDA in Houdini that takes the model and skeleton files, as well as output folders as inputs.',
      },
      {
        type: 'paragraph',
        text: 'I then used the Maya plugin Vetala, and scripted validators, auto-rigging and skinning using the clean skin, and exporter functions so that the whole process could be run at once.',
      },
      {
        type: 'paragraph',
        text: 'Finally, I developed a script that subprpcesses an instance of Maya and runs the whole process. After that, all I needed to do was batch run this script from Houdini, autorigging all 40 characters in 2 days. ',
      },
      {
        type: 'spacing',
        height: '2rem', // You can adjust this value
      },
      {
        type: 'paragraph',
        text: 'While I was at Versatile Media, I also built and updated validators for mesh totpology, rigging node checkers and more. ',
      },
      {
        type: 'paragraph',
        text: 'I worked with the asset, rigging and animation teams to build shelf tools and update toolkits per artist requests.',
      },
      {
        type: 'paragraph',
        text: 'I also collaborated with the pipeline team to design infrastructures, migrate all our tools over to python 3, and document the pipeline on Confluence.',
      },
    ],
  },
  train_crash: {
    title: 'Train model, rig and crash',
    description: '',
    content: [
      {
        type: 'paragraph',
        text: 'I enjoy mechanical rigging, and found the way steam locomotive wheels work fascinating. While at Capilano University, I challanged myself to  build a mathematically accurate train.',
      },
      {
        type: 'paragraph',
        text: 'This train is loosely based on a prr q2 4474 steam locomotive. ',
      },
      {
        type: 'paragraph',
        text: 'This is the rendered model:',
      },

      {
        type: 'image',
        src: '/images/train_rig_model.png',
        alt: 'Train Rig Plan',
        caption: '',
        className: 'tech-art-project__image--rotated',
        containerClassName: 'tech-art-project__image-container--rotated',
      },
      {
        type: 'paragraph',
        text: 'I then rigged the wheels with an auto wheel system so they would inversely rotate when the cog moved forward.',
      },
      {
        type: 'paragraph',
        text: 'Then came the real mechanical setup - using the side rods to drive the wheels. To achieve this I used a series of math nodes and connections.',
      },
      {
        type: 'paragraph',
        text: 'Finally, I thought it would be fun to use my train to destroy a house, so I created a train crash:',
      },
      {
        type: 'video',
        src: '/videos/train_mute.mp4',
        caption: 'Train rig demonstration',
        className: 'tech-art-project__video--soundless',
      },
      {
        type: 'paragraph',
        text: 'I used Maya to build the train and the rig, my wheel autorigger for the train wheels,',
      },
      {
        type: 'paragraph',
        text: 'and Houdini for the particle effects, physics and rendering.',
      },
    ],
  },
  fireman_sam: {
    title: 'Fireman Sam, Lego & Friends and In The Night Garden',
    description: '',
    content: [
      {
        type: 'paragraph',
        text: '',
      },
      {
        type: 'paragraph',
        text: 'In my time at Wildbrain, I had the opportunity to work on three animated shows.',
      },

      {
        type: 'paragraph',
        text: 'Fireman Sam season 13 was teh first season that used Unreal Engine to render, and because of that, we had fun and unprecedented challenges in our rigging pipeline.',
      },
      {
        type: 'paragraph',
        text: 'I learnt the complexities of rigging for a game engine. I was also able to build rigging tools for our growing pipeline.',
      },
      {
        type: 'video',
        src: '/videos/fms_01_mute.mp4',
        caption: 'FMS demonstration',
        className: 'tech-art-project__video--soundless',
      },
      {
        type: 'paragraph',
        text: 'Here are some of the things I did:',
      },
      {
        type: 'bulletPoints',
        points: [
          'Developed a vehicle auto-rigger, that allows you to position the template and builds the whole rig for you. This was later adopted by other shows.',
          'Developed cloth rigs using nCloth and follicles for attaching objects to rigs',
          'Developed multiple rigging tools, like joint heirarchy and auto-naming, for my teammates and my rigging shelf',
        ],
      },
    ],
  },
  spidey: {
    title: 'Coming Soon!',
    description:
      'Due to copyright issues, I am waiting on studio approval to show my work here.',
    content: [],
  },
  pawpatrol: {
    title: 'Work at Shapeshifters Interactive',
    description: '',
    content: [
      {
        type: 'paragraph',
        text: '',
      },
      {
        type: 'paragraph',
        text: 'In my time at Shapeshifters Interactive, I had the opportunity to work on Paw Patrol Rubble and Crew, rigging tools forCall of Duty: Vanguard and multiple tools for an unnamed metahuman project (you can see some of my tools on my rigging toolkit page)',
      },

      {
        type: 'paragraph',
        text: 'Check out some of my work below:',
      },

      {
        type: 'video',
        src: '/videos/shapeshifters_mute.mp4',
        caption: 'FMS demonstration',
        className: 'tech-art-project__video--soundless',
      },
    ],
  },
  everything_must_ghost: {
    title: 'Everything Must Ghost',
    description:
      'A 3D first-person comedy horror game developed during a 1 week long game jam, showcasing comprehensive Unreal Engine technical artistry.',
    content: [
      {
        type: 'paragraph',
        text: 'Everything Must Ghost was developed during the "Out of Office" game jam, a weeklong intensive development challenge. As a programmer and technical artist, I was responsible for implementing core backend systems, character rigging, animation pipelines, and UI functionality using Unreal Engine and Maya.',
      },
      {
        type: 'paragraph',
        text: 'The game combines comedy and horror elements in a first-person experience where players must navigate a haunted environment while competing against an intelligent AI ghost.',
      },
      {
        type: 'bulletPoints',
        points: [
          'Backend Programming: Implemented randomized item weight system for dynamic item generation',
          'Value Calculation Systems: Developed algorithms to calculate randomized item values based on weight properties and game balance',
          'Character Rigging: Created complete character rigs with custom control systems optimized for real-time gameplay in Unreal Engine',
          'Animation Pipeline: Built comprehensive animation systems including state machines, animation triggers, and individual character animations',
          'UI Development: Implemented main menu system with settings, credits, story sections, and sound trigger connections',
          'Technical Integration: Seamlessly integrated systems for a polished, playable game experience within tight time constraints',
        ],
      },
      {
        type: 'paragraph',
        text: 'This project was valuable for developing my skills in Unreal Engine backend programming, technical art, and rapid prototyping. Working within the constraints of a game jam environment taught me to prioritize core functionality while maintaining code quality and performance standards.',
      },
      {
        type: 'paragraph',
        text: 'The experience challenged my skills as a technical artist and game programmer, solidifying my ability to wear multiple hats in a development team while delivering results under pressure.',
      },
      {
        type: 'image',
        src: game,
        alt: 'Everything Must Ghost Game Screenshot',
        link: 'https://neillondon.itch.io/everything-must-ghost',
        caption: 'Click to view on Itch.io',
      },
      {
        type: 'download',
        text: 'Download Game (ZIP)',
        link: 'https://github.com/Anoshka/portfolio/releases/download/v0.4.2/EverythingMustGhost.v0.4.2.zip',
      },
    ],
  },
};

function TechArtProjectPage() {
  const { unlocked } = useUnlock();
  const { projectId } = useParams();
  const project = projectDetails[projectId];

  // If the project is protected and not unlocked, redirect to tech art page
  if (project?.isProtected && !unlocked) {
    return <Navigate to="/tech_art" replace />;
  }

  if (!project) {
    return (
      <div className="tech-art-project">
        <h2>Project not found</h2>
        <Link to="/tech_art" className="tech-art-project__back-link">
          Back to Tech Art
        </Link>
      </div>
    );
  }

  const renderContent = (content) => {
    switch (content.type) {
      case 'paragraph':
        return <p className="tech-art-project__paragraph">{content.text}</p>;
      case 'spacing':
        return <div style={{ height: content.height }} />;
      case 'image':
        return (
          <figure className="tech-art-project__image-container">
            <a
              href={content.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-art-project__image-link"
            >
              <img
                src={content.src}
                alt={content.alt}
                className="tech-art-project__image"
              />
            </a>
            {content.caption && (
              <figcaption className="tech-art-project__image-caption">
                {content.caption}
              </figcaption>
            )}
          </figure>
        );
      case 'video':
        return (
          <figure className="tech-art-project__video-container">
            <video
              controls
              className="tech-art-project__video"
              poster="/path/to/your/video-thumbnail.jpg"
            >
              <source src={content.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {content.caption && (
              <figcaption className="tech-art-project__video-caption">
                {content.caption}
              </figcaption>
            )}
          </figure>
        );
      case 'bulletPoints':
        return (
          <ul className="tech-art-project__bullet-points">
            {content.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        );
      case 'download':
        return (
          <div className="tech-art-project__download-section">
            <a
              href={content.link}
              download
              className="tech-art-project__download-btn"
            >
              📥 {content.text}
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tech-art-project">
      <div className="tech-art-project__header">
        <h1 className="tech-art-project__title">{project.title}</h1>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="tech-art-project__github-link"
          >
            GitHub
            <svg
              className="tech-art-project__redirect-icon"
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
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        )}
      </div>
      <p className="tech-art-project__description">{project.description}</p>
      <div className="tech-art-project__content">
        {project.content.map((item, index) => (
          <div key={index} className="tech-art-project__content-item">
            {renderContent(item)}
          </div>
        ))}
      </div>
      <Link to="/tech_art" className="tech-art-project__back-link">
        ← Back to Tech Art
      </Link>
    </div>
  );
}

export default TechArtProjectPage;
