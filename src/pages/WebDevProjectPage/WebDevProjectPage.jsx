import { useParams, Link } from 'react-router-dom';

// Example data source (customize as needed)
const projectDetails = {
  portfolio_site: {
    title: 'Portfolio Site',
    description:
      'A modern portfolio website built with React, showcasing my work and skills as a web developer.',
    features: [
      'Responsive design',
      'Interactive project gallery',
      'Contact form with email integration',
    ],
  },
  blog_platform: {
    title: 'Blog Platform',
    description:
      'A full-featured blog platform with user authentication, post creation, and comments.',
    features: [
      'User authentication',
      'Rich text editor for posts',
      'Comment system',
    ],
  },
  // Add more projects as needed
};

function WebDevProjectPage() {
  const { projectId } = useParams();
  const project = projectDetails[projectId];

  if (!project) {
    return (
      <div>
        <h2>Project not found</h2>
        <Link to="/tech_art" className="tech-art-project__back-link">
          Back to Tech Art
        </Link>
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
      <Link to="/tech_art">← Back to Tech Art</Link>
    </div>
  );
}

export default WebDevProjectPage;
