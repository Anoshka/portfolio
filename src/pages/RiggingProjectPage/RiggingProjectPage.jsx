import { useParams, Link, Navigate } from 'react-router-dom';
import '../TechArtProjectPage/TechArtProjectPage.scss';
import { useUnlock } from '../../context/UnlockContext';

const riggingProjectDetails = {
  fireman_sam: {
    title: 'Fireman Sam, Lego & Friends and In The Night Garden',
    description:
      'Highlights from my time at Wildbrain Studios, including the move to an Unreal Engine pipeline.',
    isProtected: true,
    content: [
      {
        type: 'paragraph',
        text: 'In my time at Wildbrain, I had the opportunity to work on three animated shows.',
      },
      {
        type: 'paragraph',
        text: 'Fireman Sam season 13 was the first season rendered in Unreal Engine, which brought unique rigging challenges and exciting opportunities.',
      },
      {
        type: 'paragraph',
        text: 'I learned the complexities of rigging for a game engine and developed tools to keep the production team moving.',
      },
      {
        type: 'video',
        src: '/videos/fms_01_mute.mp4',
        caption: 'Fireman Sam demonstration',
        className: 'tech-art-project__video--soundless',
      },
      {
        type: 'paragraph',
        text: 'Key contributions:',
      },
      {
        type: 'bulletPoints',
        points: [
          'Developed a vehicle auto-rigger for templated builds adopted across shows',
          'Implemented cloth rigs using nCloth and follicles for attachments',
          'Created a suite of rigging tools (joint hierarchy builder, auto-naming, shelf utilities)',
        ],
      },
    ],
  },
  pawpatrol: {
    title: 'Work at Shapeshifters Interactive',
    description:
      'Selected highlights from my Paw Patrol: Rubble & Crew contributions and related tooling.',
    isProtected: true,
    content: [
      {
        type: 'paragraph',
        text: 'At Shapeshifters Interactive I worked on Paw Patrol: Rubble & Crew, Call of Duty: Vanguard support tools, and an extensive Metahuman pipeline.',
      },
      {
        type: 'paragraph',
        text: 'This involved building modular tools, vehicle rigs, and providing production support across multiple franchises.',
      },
      {
        type: 'paragraph',
        text: 'Check out some of the work below:',
      },
      {
        type: 'video',
        src: '/videos/shapeshifters_mute.mp4',
        caption: 'Shapeshifters showcase',
        className: 'tech-art-project__video--soundless',
      },
    ],
  },
};

const RiggingProjectPage = () => {
  const { unlocked } = useUnlock();
  const { projectId } = useParams();
  const project = riggingProjectDetails[projectId];

  if (project?.isProtected && !unlocked) {
    return <Navigate to="/rigging" replace />;
  }

  if (!project) {
    return (
      <div className="tech-art-project">
        <h2>Rigging project not found</h2>
        <Link to="/rigging" className="tech-art-project__back-link">
          Back to Rigging
        </Link>
      </div>
    );
  }

  const renderContent = (content) => {
    switch (content.type) {
      case 'paragraph':
        return <p className="tech-art-project__paragraph">{content.text}</p>;
      case 'video':
        return (
          <figure className="tech-art-project__video-container">
            <video
              controls
              className={`tech-art-project__video ${content.className || ''}`}
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
              <li key={`point-${idx}`}>{point}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tech-art-project">
      <div className="tech-art-project__header">
        <h1 className="tech-art-project__title">{project.title}</h1>
      </div>
      <p className="tech-art-project__description">{project.description}</p>
      <div className="tech-art-project__content">
        {project.content.map((item, index) => (
          <div key={`content-${index}`} className="tech-art-project__content-item">
            {renderContent(item)}
          </div>
        ))}
      </div>
      <Link to="/rigging" className="tech-art-project__back-link">
        ← Back to Rigging
      </Link>
    </div>
  );
};

export default RiggingProjectPage;


