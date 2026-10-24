
import { useEffect, useState } from "react";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [greenTheme, setGreenTheme] = useState(false);
  const [typedText, setTypedText] = useState("");

  const fullText = "Software Developer";

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <section
      id="home"
      className={`hero-section ${greenTheme ? "green-theme" : ""}`}
    >
      <style>{`
        .hero-section {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          color: #ffffff;
          font-family: Arial, sans-serif;

          background-image:
            linear-gradient(
              rgba(3, 12, 8, 0.76),
              rgba(3, 12, 8, 0.84)
            ),
            url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRds4QWVHUpJsImn4M8Tb6qV-BAcWkBAejGiOOThKbJrg&s=10");

          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          transition: color 0.3s ease;
        }

        .hero-section.green-theme {
          color: #14532d;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.88),
              rgba(220, 252, 231, 0.91)
            ),
            url("https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }

        .hero-nav {
          width: 100%;
          min-height: 82px;
          padding: 18px 7%;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 10;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .hero-logo {
          color: #4ade80;
          font-size: 26px;
          font-weight: 800;
          text-decoration: none;
          white-space: nowrap;
        }

        .green-theme .hero-logo {
          color: #15803d;
        }

        .hero-nav-right {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .hero-nav-links {
          display: flex;
          align-items: center;
          gap: 23px;
        }

        .hero-nav-links a {
          color: inherit;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .hero-nav-links a:hover {
          color: #4ade80;
        }

        .theme-toggle,
        .menu-toggle {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: transparent;
          color: #4ade80;
          border: 1px solid #4ade80;
          cursor: pointer;
          flex-shrink: 0;
          transition: 0.25s ease;
        }

        .theme-toggle:hover,
        .menu-toggle:hover {
          background: #22c55e;
          color: #ffffff;
          transform: scale(1.05);
        }

        .green-theme .theme-toggle,
        .green-theme .menu-toggle {
          color: #15803d;
          border-color: #15803d;
        }

        .menu-toggle {
          display: none;
        }

        .hero-content {
          width: 86%;
          max-width: 1200px;
          min-height: calc(100vh - 82px);
          margin: auto;
          padding: 55px 0 75px;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          gap: 55px;
        }

        .hero-intro {
          display: inline-block;
          padding: 10px 16px;
          margin-bottom: 22px;
          border: 1px solid rgba(74,222,128,0.65);
          border-radius: 30px;
          background: rgba(34,197,94,0.12);
          color: #4ade80;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .green-theme .hero-intro {
          color: #15803d;
          background: rgba(34,197,94,0.1);
        }

        .hero-title {
          margin: 0 0 20px;
          font-size: clamp(38px, 5.5vw, 72px);
          line-height: 1.12;
          letter-spacing: -2px;
          font-weight: 800;
          overflow-wrap: anywhere;
        }

        .hero-highlight {
          color: #4ade80;
        }

        .green-theme .hero-highlight {
          color: #15803d;
        }

        .hero-role {
          min-height: 35px;
          margin: 0 0 20px;
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 700;
        }

        .typing-cursor {
          color: #4ade80;
          animation: heroBlink 0.8s infinite;
        }

        .hero-description {
          max-width: 610px;
          margin-bottom: 30px;
          color: #e2e8f0;
          font-size: 16px;
          line-height: 1.9;
        }

        .green-theme .hero-description {
          color: #334155;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 30px;
        }

        .hero-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          padding: 14px 23px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: 0.25s ease;
        }

        .hero-button-primary {
          background: #22c55e;
          color: #052e16;
          border: 1px solid #22c55e;
        }

        .hero-button-primary:hover {
          background: #4ade80;
          transform: translateY(-3px);
        }

        .hero-button-secondary {
          color: inherit;
          border: 1px solid #4ade80;
          background: rgba(0,0,0,0.12);
        }

        .green-theme .hero-button-secondary {
          background: rgba(255,255,255,0.6);
          border-color: #15803d;
        }

        .hero-button-secondary:hover {
          background: rgba(34,197,94,0.18);
          transform: translateY(-3px);
        }

        .hero-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hero-tech span {
          padding: 8px 13px;
          border: 1px solid rgba(148,163,184,0.45);
          border-radius: 6px;
          background: rgba(15,23,42,0.45);
          color: inherit;
          font-size: 12px;
          font-weight: 600;
        }

        .green-theme .hero-tech span {
          background: rgba(255,255,255,0.6);
          border-color: rgba(21,128,61,0.3);
        }

        .hero-image-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-image-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(34,197,94,0.3);
          filter: blur(50px);
        }

        .hero-image-frame {
          position: relative;
          width: min(340px, 100%);
          aspect-ratio: 4 / 5;
          padding: 10px;
          border: 2px solid #22c55e;
          border-radius: 170px 170px 24px 24px;
          background: rgba(34,197,94,0.1);
          box-shadow: 0 20px 80px rgba(34,197,94,0.2);
          box-sizing: border-box;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 160px 160px 18px 18px;
        }

        .hero-image-note {
          position: absolute;
          bottom: 24px;
          left: -25px;
          padding: 15px 18px;
          border: 1px solid rgba(74,222,128,0.6);
          border-radius: 10px;
          background: #0f172a;
          color: #ffffff;
          box-shadow: 0 10px 35px rgba(0,0,0,0.25);
          font-size: 13px;
          font-weight: 700;
        }

        .green-theme .hero-image-note {
          background: #ffffff;
          color: #14532d;
        }

        .hero-image-note span {
          display: block;
          color: #4ade80;
          margin-top: 5px;
          font-size: 12px;
        }

        .hero-scroll {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: inherit;
          opacity: 0.8;
          font-size: 11px;
          letter-spacing: 2px;
          text-decoration: none;
        }

        @keyframes heroBlink {
          50% { opacity: 0; }
        }

        @media (max-width: 1000px) {
          .hero-nav-links {
            gap: 13px;
          }

          .hero-content {
            gap: 30px;
          }

          .hero-image-frame {
            width: min(300px, 100%);
          }
        }

        @media (max-width: 780px) {
          .hero-nav {
            padding: 16px 6%;
          }

          .menu-toggle {
            display: inline-flex;
          }

          .hero-nav-right {
            gap: 12px;
          }

          .hero-nav-links {
            display: none;
            position: absolute;
            top: 75px;
            left: 5%;
            right: 5%;
            padding: 15px;
            border: 1px solid rgba(74,222,128,0.4);
            border-radius: 12px;
            background: #0f172a;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          }

          .green-theme .hero-nav-links {
            background: #ffffff;
          }

          .hero-nav-links.menu-open {
            display: flex;
          }

          .hero-nav-links a {
            padding: 13px 8px;
          }

          .hero-content {
            width: 88%;
            min-height: auto;
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 50px;
            gap: 45px;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons,
          .hero-tech {
            justify-content: center;
          }

          .hero-image-wrap {
            max-width: 360px;
            width: 100%;
            margin: 0 auto 35px;
          }

          .hero-image-frame {
            width: min(290px, 85%);
          }

          .hero-image-note {
            left: -5px;
          }

          .hero-scroll {
            display: none;
          }

          .hero-section,
          .hero-section.green-theme {
            background-attachment: scroll;
          }
        }

        @media (max-width: 420px) {
          .hero-logo {
            font-size: 21px;
          }

          .hero-title {
            letter-spacing: -1px;
          }

          .hero-button {
            width: 100%;
            box-sizing: border-box;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-section *,
          .hero-section *::before,
          .hero-section *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav className="hero-nav">
        <a href="#home" className="hero-logo">
          IDDY<span>.</span>
        </a>

        <div className="hero-nav-right">
          <div className={`hero-nav-links ${menuOpen ? "menu-open" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* WHITE / GREEN THEME ICON */}
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setGreenTheme((previous) => !previous)}
            aria-label="Toggle white and green theme"
            title="Change theme"
          >
            {greenTheme ? (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
              </svg>
            )}
          </button>

          {/* MOBILE MENU ICON */}
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-intro">WELCOME TO MY PORTFOLIO</div>

          <h1 className="hero-title">
            Hi, I'm <span className="hero-highlight">KIZUNGU IDDY</span>
          </h1>

          <h2 className="hero-role">
            I'm a <span className="hero-highlight">{typedText}</span>
            <span className="typing-cursor">|</span>
          </h2>

          <p className="hero-description">
            I am a passionate software developer who builds modern,
            responsive, and user-friendly web applications. I enjoy turning
            ideas into real digital experiences using clean code and creative
            solutions.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="hero-button hero-button-primary">
              View My Projects <span>↗</span>
            </a>

            <a href="#contact" className="hero-button hero-button-secondary">
              Contact Me <span>✉</span>
            </a>
          </div>

          <div className="hero-tech">
            <span>React.js</span>
            <span>Node.js</span>
            <span>JavaScript</span>
            <span>PHP</span>
            <span>MySQL</span>
          </div>
        </div>

        {/* PROFILE IMAGE */}
        <div className="hero-image-wrap">
          <div className="hero-image-glow"></div>

          <div className="hero-image-frame">
            <img
              src="/profile.jpg"
              alt="Kizungu Iddy"
              className="hero-image"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="hero-image-note">
            Available for opportunities
            <span>● Software Development</span>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll">
        SCROLL TO EXPLORE ↓
      </a>
    </section>
  );
};

export default Hero;
