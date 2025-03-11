import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
//component imports
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
//page imports
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
