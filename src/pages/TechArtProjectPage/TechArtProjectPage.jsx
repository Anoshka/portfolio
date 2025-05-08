import { useParams, Link } from 'react-router-dom';

// Example data source (customize as needed)
const projectDetails = {
  auto_rigger: {
    title: 'Auto Rigger',
    description:
      'A powerful automation tool designed to streamline the character rigging process. This tool significantly reduces the manual effort required, providing a fast, efficient, and consistent rigging workflow.',
    features: [
      'Fully automated joint placement and skinning process',
      'Supports both biped and quadruped characters',
      'Intuitive UI for custom adjustments and fine-tuning',
      'Reduces rigging time by up to 70%',
    ],
  },
  rigging_toolkit: {
    title: 'Rigging Toolkit',
    description:
      'A collection of custom scripts and tools that enhance the rigging process for animators and technical artists.',
    features: [
      'Automated weight painting for optimized deformations',
      'Smart joint mirroring and renaming features',
      'Integration with industry-standard tools like Autodesk Maya',
      'Python-based scripting for easy customization',
    ],
  },
  // Add more projects as needed
};

function TechArtProjectPage() {
  const { projectId } = useParams();
  const project = projectDetails[projectId];

  if (!project) {
    return (
      <div>
        <h2>Project not found</h2>
        <Link to="/tech_art">Back to Tech Art</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {project.features && (
        <ul>
          {project.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      )}
      {/* Add more custom fields/media as needed */}
      <Link to="/tech_art">← Back to Tech Art</Link>
    </div>
  );
}

export default TechArtProjectPage;
