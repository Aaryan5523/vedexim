import { useEffect, useState } from "react";

const heroImages = [
  "https://archello.s3.eu-central-1.amazonaws.com/images/2024/11/28/ceramiche-refin-s.p.a.-etherea-ceramic-wall-tiles-archello.1732787201.209.jpg",

  "https://www.zicanaboutique.com/cdn/shop/articles/large-format-porcelain-tile.jpg",

  "https://vdt.bg/media/images/25/a5/orig.jpg",

  "https://gruppoconcorde-cdn.thron.com/delivery/public/image/gruppoconcorde/21ef037d-7ad6-4dd2-85e9-e92c8455aaa9/u38j94/std/1023x0/AtlasConcorde_MarvelPro_018_00_CremoDelicato.tif"
];

function Hero() {

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((previous) => {
        return (previous + 1) % heroImages.length;
      });

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <section className="hero" id="home">

      {/* AUTO IMAGE SLIDER */}

      <div className="hero-background">

        {heroImages.map((image, index) => (

          <img
            key={index}
            src={image}
            alt={`VED EXIM Ceramic Collection ${index + 1}`}
            className={
              index === currentImage
                ? "active"
                : ""
            }
          />

        ))}

      </div>


      {/* OVERLAY */}

      <div className="hero-overlay"></div>


      {/* HERO CONTENT */}

      <div className="hero-content">

        <p className="hero-eyebrow">
          CERAMICS · SURFACES · SANITARYWARE
        </p>

        <h1>
          Crafted
          <br />
          <em>for living.</em>
        </h1>

        <p className="hero-description">
          Premium ceramic surfaces and timeless forms,
          created with precision and designed for
          contemporary spaces.
        </p>

        <a
          href="#collections"
          className="hero-button"
        >
          Explore Collection
          <span>↗</span>
        </a>

      </div>


      {/* HERO FOOTER */}

      <div className="hero-footer">

        <span>VED EXIM</span>

        <div className="hero-scroll">

          <span>
            SCROLL TO EXPLORE
          </span>

          <div className="scroll-line"></div>

        </div>

        <span>EST. 1998</span>

      </div>

    </section>
  );
}

export default Hero;