import './Card.scss';

const Card = ({ title, image, link }) => {
  return (
    <a href={link} className="project-card">
      <div
        className="project-card__image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="project-card__overlay">
          <h3 className="project-card__title">{title}</h3>
        </div>
      </div>
    </a>
  );
};

export default Card;
