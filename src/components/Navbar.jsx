import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <header
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >

      {/* LEFT LOGO */}

      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        <img
          src="/images/logo/vedexim.png"
          alt="VED EXIM"
        />
      </Link>


      {/* MENU BUTTON */}

      <button
        type="button"
        className={`menu-button ${
          menuOpen ? "menu-active" : ""
        }`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
      </button>


      {/* MENU PANEL */}

      <div
        className={`menu-panel ${
          menuOpen ? "menu-open" : ""
        }`}
      >

        <div className="menu-heading">
          NAVIGATION
        </div>


        <nav className="menu-nav">

          {/* HOME */}

          <Link
            to="/"
            onClick={closeMenu}
          >
            <span>01</span>
            Home
          </Link>


          {/* ABOUT */}

          <Link
            to="/#about"
            onClick={closeMenu}
          >
            <span>02</span>
            About
          </Link>


          {/* COLLECTIONS PAGE */}

          <Link
            to="/collections"
            onClick={closeMenu}
          >
            <span>03</span>
            Collections
          </Link>


          {/* PRODUCTS */}

          <Link
            to="/#products"
            onClick={closeMenu}
          >
            <span>04</span>
            Products
          </Link>


          {/* WHY VED EXIM */}

          <Link
            to="/#why-us"
            onClick={closeMenu}
          >
            <span>05</span>
            Why VED EXIM
          </Link>


          {/* PROCESS */}

          <Link
            to="/#process"
            onClick={closeMenu}
          >
            <span>06</span>
            Our Process
          </Link>


          {/* CONTACT */}

          <Link
            to="/#contact"
            onClick={closeMenu}
          >
            <span>07</span>
            Contact
          </Link>

        </nav>


        {/* MENU FOOTER */}

        <div className="menu-footer">
          CERAMICS · SURFACES · SANITARYWARE
        </div>

      </div>

    </header>
  );
}

export default Navbar;