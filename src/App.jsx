import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
//component imports
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
//page imports
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import ResumePage from './pages/ResumePage/ResumePage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import TechArtPage from './pages/TechArtPage/TechArtPage.jsx';
import WebDevPage from './pages/WebDevPage/WebDevPage.jsx';
import TechArtProjectPage from './pages/TechArtProjectPage/TechArtProjectPage.jsx';
import WebDevProjectPage from './pages/WebDevProjectPage/WebDevProjectPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/tech_art" element={<TechArtPage />} />
        <Route path="/web_dev" element={<WebDevPage />} />
        <Route path="/tech_art/:projectId" element={<TechArtProjectPage />} />
        <Route path="/web_dev/:projectId" element={<WebDevProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
