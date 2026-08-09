import { useEffect, useRef } from "react";
import "./Contact.css";

function Contact() {
  const sectionRef = useRef(null);

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

  return (
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

        <form className="contact-form">

          <div className="form-field">

            <label htmlFor="name">
              YOUR NAME
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
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
            ></textarea>

          </div>


          <button
            type="submit"
            className="contact-submit"
          >
            <span>SEND INQUIRY</span>
            <strong>↗</strong>
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
  );
}

export default Contact;