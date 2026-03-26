import BackgroundFX from "./components/BackgroundFX";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <BackgroundFX />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}