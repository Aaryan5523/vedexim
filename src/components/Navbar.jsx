import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

useEffect(() => {
  document.body.classList.toggle("menu-open", menuOpen);

  return () => {
    document.body.classList.remove("menu-open");
  };
}, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

      {/* LEFT LOGO */}

      <a
  href="#home"
  className="navbar-logo"
  onClick={closeMenu}
>
  <img
    src="/images/logo/vedexim.png"
    alt="VED EXIM"
  />
</a>


      {/* MENU BUTTON */}

      <button
        type="button"
        className={`menu-button ${menuOpen ? "menu-active" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Open navigation menu"
      >
        <span></span>
        <span></span>
      </button>


      {/* MENU PANEL */}

      <div className={`menu-panel ${menuOpen ? "menu-open" : ""}`}>

        <div className="menu-heading">
          NAVIGATION
        </div>

        <nav className="menu-nav">

          <a href="#home" onClick={closeMenu}>
            <span>01</span>
            Home
          </a>

          <a href="#about" onClick={closeMenu}>
            <span>02</span>
            About
          </a>

          <a href="#collections" onClick={closeMenu}>
            <span>03</span>
            Collections
          </a>

          <a href="#products" onClick={closeMenu}>
            <span>04</span>
            Products
          </a>

          <a href="#why-us" onClick={closeMenu}>
            <span>05</span>
            Why VED EXIM
          </a>

          <a href="#process" onClick={closeMenu}>
            <span>06</span>
            Our Process
          </a>

          <a href="#contact" onClick={closeMenu}>
            <span>07</span>
            Contact
          </a>

        </nav>

        <div className="menu-footer">
          CERAMICS · SURFACES · SANITARYWARE
        </div>

      </div>

    </header>
  );
}

export default Navbar;