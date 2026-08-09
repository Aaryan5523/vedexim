import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      {/* TOP */}

      <div className="footer-top">

        <div className="footer-brand">

          <a href="#home" onClick={scrollToTop}>
            <span>VED</span>
            <small>EXIM</small>
          </a>

          <p>
            Premium ceramic surfaces
            <br />
            for contemporary spaces.
          </p>

        </div>


        <div className="footer-navigation">

          <p className="footer-label">
            NAVIGATION
          </p>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#collections">Collections</a>
          <a href="#products">Products</a>
          <a href="#why-us">Why VED EXIM</a>
          <a href="#process">Our Process</a>
          <a href="#contact">Contact</a>

        </div>


        <div className="footer-contact">

          <p className="footer-label">
            GET IN TOUCH
          </p>

          <a href="mailto:info@vedexim.com">
            info@vedexim.com
          </a>

          <a href="tel:+919999999999">
            +91 99999 99999
          </a>

          <p className="footer-location">
            India
          </p>

        </div>

      </div>


      {/* LARGE BRAND */}

      <div className="footer-large-logo">
        VED EXIM
      </div>


      {/* BOTTOM */}

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