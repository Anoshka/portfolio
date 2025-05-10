import './Header.scss';
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/me_pic.png';
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

  const [selectedTheme, setSelectedTheme] = useState(themes[2]);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const themeSelectorRef = useRef(null);

  useEffect(() => {
    document.body.setAttribute('data-theme', selectedTheme.name);
  }, [selectedTheme]);

  // Handle click outside to close mobile menu and theme dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      // Close mobile menu if clicking outside
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.header__mobile-menu-btn')
      ) {
        setIsMobileMenuOpen(false);
      }

      // Close theme dropdown if clicking outside
      if (
        themeSelectorRef.current &&
        !themeSelectorRef.current.contains(event.target)
      ) {
        setIsThemeDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <section className="header__container">
        <NavLink to="/" className="header__logo-container">
          <img src={logo} alt="logo" className="header__logo" />
        </NavLink>

        <div className="header__right">
          {/* Theme Selector */}
          <div
            ref={themeSelectorRef}
            className={`header__theme-selector ${isThemeDropdownOpen ? 'open' : ''}`}
            onMouseEnter={() => setIsThemeDropdownOpen(true)}
            onMouseLeave={() => setIsThemeDropdownOpen(false)}
          >
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

            <div className="header__theme-dropdown">
              {themes
                .filter((theme) => theme.name !== selectedTheme.name)
                .map((theme) => (
                  <div
                    key={theme.name}
                    className="header__theme-option"
                    onClick={() => {
                      setSelectedTheme(theme);
                      setIsThemeDropdownOpen(false);
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

          {/* Mobile Menu Button */}
          <button
            className={`header__mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation */}
          <nav
            className={`header__nav ${isMobileMenuOpen ? 'open' : ''}`}
            ref={mobileMenuRef}
          >
            <NavLink
              to="/about"
              className="header__link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/resume"
              className="header__link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resume
            </NavLink>
            <NavLink
              to="/tech_art"
              className="header__link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tech Art
            </NavLink>
          </nav>
        </div>
      </section>
    </header>
  );
}

export default Header;
