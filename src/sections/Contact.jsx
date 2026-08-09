import { useEffect, useRef, useState } from "react";
import "./Contact.css";

function Contact() {
  const sectionRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    event.target.reset();

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3500);
  };

  return (
    <>
      <section
        className="contact-section"
        id="contact"
        ref={sectionRef}
      >

        {/* LEFT CONTENT */}

        <div className="contact-intro">

          <p className="contact-label">
            GET IN TOUCH
          </p>

          <h2>
            Let's create
            <br />
            <em>something remarkable.</em>
          </h2>

          <p className="contact-description">
            Tell us about your project, requirements or
            collection interests. Our team will be happy
            to help you find the right surface solution.
          </p>

          <div className="contact-details">

            <a href="mailto:info@vedexim.com">
              info@vedexim.com
            </a>

            <a href="tel:+919999999999">
              +91 99999 99999
            </a>

          </div>

        </div>


        {/* FORM */}

        <div className="contact-form-wrapper">

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-field">

              <label htmlFor="name">
                YOUR NAME
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />

            </div>


            <div className="form-field">

              <label htmlFor="email">
                EMAIL ADDRESS
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />

            </div>


            <div className="form-field">

              <label htmlFor="phone">
                PHONE NUMBER
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                required
              />

            </div>


            <div className="form-field">

              <label htmlFor="message">
                PROJECT / MESSAGE
              </label>

              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Tell us about your project"
                required
              ></textarea>

            </div>


            <button
              type="submit"
              className="contact-submit"
            >
              <span>
                SEND INQUIRY
              </span>

              <strong>
                ↗
              </strong>
            </button>

          </form>

        </div>


        {/* BOTTOM */}

        <div className="contact-bottom">

          <span>
            VED EXIM
          </span>

          <span>
            CERAMICS · SURFACES · SANITARYWARE
          </span>

          <span>
            INDIA
          </span>

        </div>

      </section>


      {/* SUCCESS ALERT */}

      {showAlert && (
        <div className="inquiry-alert">

          <div className="inquiry-alert-box">

            <div className="inquiry-check">
              ✓
            </div>

            <div>
              <p className="inquiry-alert-title">
                Inquiry Sent
              </p>

              <p className="inquiry-alert-text">
                Thank you for contacting Ved Exim.
                <br />
                We will get back to you soon.
              </p>
            </div>

            <button
              type="button"
              className="inquiry-alert-close"
              onClick={() => setShowAlert(false)}
              aria-label="Close"
            >
              ×
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Contact;