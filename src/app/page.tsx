import Preloader from "../components/ui/Preloader";
import Navbar from "../components/navigation/Navbar";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Capabilities from "../components/sections/Capabilities"; // The Flashlight Room
import Process from "../components/sections/Process";           // The Fingerprint Scanner
import About from "../components/sections/About";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="relative bg-background selection:bg-white selection:text-black">
        <Navbar />
        <Hero />
        
        {/* Act I: The Cinematic Aperture HUD */}
        <Projects />
        
        {/* Act II: The Blackout Room (Flashlight Engine) */}
        <Capabilities />
        
        {/* Act III: The Biometric Security Gateway */}
        <Process />
        
        {/* Act IV: The Classy Editorial Origin */}
        <About />
        
        {/* Act V: The Anchor */}
        <Footer />
      </main>
    </>
  );
}