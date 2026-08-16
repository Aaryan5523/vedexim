import Hero from "../sections/Hero";
import About from "../sections/About";
import Collections from "../sections/Collections";
import Testimonials from "../sections/Testimonials";
import WhyUs from "../sections/WhyUs";
import Process from "../sections/Process";
import Contact from "../sections/Contact";

function Home() {
  return (
    <main className="home-page">

      <Hero />

      <About />

      <Collections />

      <Testimonials />

      <WhyUs />

      <Process />

      <Contact />

    </main>
  );
}

export default Home;