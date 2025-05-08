import './Header.scss';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/avatar.png';
import SunIcon from '../../assets/icons/sunshine_clean.png';
import DarkIcon from '../../assets/icons/dark.png';

function Header() {
  const themes = [
    { name: 'light', type: 'image', image: SunIcon },
    { name: 'pink', type: 'color', color: '#FF69B4' },
    { name: 'blue', type: 'color', color: '#007BFF' },
    { name: 'green', type: 'color', color: '#28A745' },
    { name: 'yellow', type: 'color', color: '#FFC107' },
    { name: 'dark', type: 'image', image: DarkIcon },
  ];

  const [selectedTheme, setSelectedTheme] = useState(themes[3]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', selectedTheme.name);
  }, [selectedTheme]);

  return (
    <header className="header">
      <section className="header__container">
        <NavLink to="/" className="header__logo-container">
          <img src={logo} alt="logo" className="header__logo" />
        </NavLink>

        <nav className="header__nav">
          <NavLink to="/about" className="header__link">
            About
          </NavLink>
          <NavLink to="/resume" className="header__link">
            Resume
          </NavLink>
          <NavLink to="/tech_art" className="header__link">
            Tech Art
          </NavLink>
          <NavLink to="/web_dev" className="header__link">
            Web Dev
          </NavLink>

          <div
            className={`header__theme-selector ${isDropdownOpen ? 'open' : ''}`}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {/* Currently Selected Theme */}
            <div className="header__theme-selected">
              {selectedTheme.type === 'image' ? (
                <img src={selectedTheme.image} alt={selectedTheme.name} />
              ) : (
                <div
                  className="header__theme-circle"
                  style={{ backgroundColor: selectedTheme.color }}
                />
              )}
            </div>

            {/* Dropdown Menu */}
            <div className="header__theme-dropdown">
              {themes
                .filter((theme) => theme.name !== selectedTheme.name)
                .map((theme) => (
                  <div
                    key={theme.name}
                    className="header__theme-option"
                    onClick={() => {
                      setSelectedTheme(theme);
                      setIsDropdownOpen(false); // Close dropdown after selection
                    }}
                  >
                    {theme.type === 'image' ? (
                      <img src={theme.image} alt={theme.name} />
                    ) : (
                      <div
                        className="header__theme-circle"
                        style={{ backgroundColor: theme.color }}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </nav>
      </section>
    </header>
  );
}

export default Header;
