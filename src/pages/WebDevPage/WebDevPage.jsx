import WebDevGrid from '../../components/WebDevGrid/WebDevGrid.jsx';
// import Animation from "../../components/Animation/Animation.jsx";
import './WebDevPage.scss';

const WebDevPage = () => {
  return (
    <div className="work">
      {/* <div className="work__threejs-container">
        <Animation />
      </div> */}

      <WebDevGrid />
    </div>
  );
};

export default WebDevPage;
