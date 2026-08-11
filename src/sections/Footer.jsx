import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeMenuAndNavigate = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      {/* =========================================
          FOOTER TOP
      ========================================= */}

      <div className="footer-top">

        {/* BRAND */}

        <div className="footer-brand">

          <a
            href="#home"
            onClick={closeMenuAndNavigate}
          >
            <img
              src="/images/logo/vedexim.png"
              alt="VED EXIM"
              className="footer-logo"
            />
          </a>

          <p>
            Premium ceramic surfaces
            <br />
            for contemporary spaces.
          </p>

        </div>


        {/* NAVIGATION */}

        <div className="footer-navigation">

          <p className="footer-label">
            NAVIGATION
          </p>

          <a href="/home">
            Home
          </a>

          <a href="/about">
            About
          </a>

          <a href="/collections">
            Collections
          </a>

          <a href="/products">
            Products
          </a>

          <a href="/process">
            Our Process
          </a>

          <a href="/contact">
            Contact
          </a>

        </div>


        {/* CONTACT */}

        <div className="footer-contact">

          <p className="footer-label">
            GET IN TOUCH
          </p>

          <a href="mailto:vedeximmorbi@gmail.com">
            vedeximmorbi@gmail.com
          </a>

          <a href="tel:+919909026328">
            +91 99090 26328
          </a>

          <p className="footer-location">
            India
          </p>


          {/* SOCIAL MEDIA */}

<div className="footer-social">

  <a
    href="https://instagram.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <span className="social-icon">◎</span>
    <span>Instagram</span>
  </a>

  <a
    href="https://facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <span className="social-icon">f</span>
    <span>Facebook</span>
  </a>

  <a
    href="https://youtube.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
  >
    <span className="social-icon">▶</span>
    <span>YouTube</span>
  </a>

  <a
    href="https://linkedin.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <span className="social-icon">in</span>
    <span>LinkedIn</span>
  </a>

  <a
    href="https://twitter.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
  >
    <span className="social-icon">𝕏</span>
    <span>Twitter</span>
  </a>

</div>



        </div>

      </div>

      {/* =========================================
          BOTTOM
      ========================================= */}

      <div className="footer-bottom">

        <span>
          © 2026 VED EXIM
        </span>

        <span>
          CERAMICS · SURFACES · SANITARYWARE
        </span>

        <button
          type="button"
          onClick={scrollToTop}
          className="footer-top-button"
        >
          BACK TO TOP
          <span>↑</span>
        </button>

      </div>

    </footer>
  );
}

export default Footer;