import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import LogoShowcase from "./sections/LogoShowcase";
import Work from "./sections/Work";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import TechStack from "./sections/TechStack";
import Research from "./sections/Research";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => (
  <>
    <Navbar />
    <Hero />
    <LogoShowcase />
    <Work />
    <div className="md:mt-20 mt-10">
      <FeatureCards />
    </div>
    <Experience />
    <TechStack />
    <Research />
    <Contact />
    <Footer />
  </>
);

export default App;
