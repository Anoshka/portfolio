import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";
import linkedinIcon from "../../assets/icons/linkedin_clean.png";
import emailIcon from "../../assets/icons/email_clean.png";
import githubIcon from "../../assets/icons/github_clean.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__links">
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <img src={githubIcon} alt="LinkedIn" />
          </a>
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>

          <a href="mailto:your.email@example.com" className="footer__link">
            <img src={emailIcon} alt="Email" />
          </a>
        </div>
        <p className="footer__text">Anoshka Jhaveri © 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
