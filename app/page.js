import StatusBar from "./components/StatusBar";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Terminal from "./components/Terminal";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Skills from "./components/Skills";
import FiberCalculator from "./components/FiberCalculator";
import Certification from "./components/Certification";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorFX from "./components/CursorFX";
import MusicPlayer from "./components/MusicPlayer";
import ScrollReveal from "./components/ScrollReveal";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import Preloader from "./components/Preloader";
import CommandPalette from "./components/CommandPalette";

export default function Home() {
  return (
    <>
      <Preloader />
      <CommandPalette />
      <CursorFX />
      <ScrollProgress />
      <div className="site-content">
        <StatusBar />
        <Nav />
        <Hero />
        <ScrollReveal><Terminal /></ScrollReveal>
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Experience /></ScrollReveal>
        <ScrollReveal><Projects /></ScrollReveal>
        <ScrollReveal><Gallery /></ScrollReveal>
        <ScrollReveal>
          <Skills />
          <div className="wrap">
            <FiberCalculator />
          </div>
        </ScrollReveal>
        <ScrollReveal><Certification /></ScrollReveal>
        <ScrollReveal><Education /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
        <Footer />
      </div>
      <BackToTop />
      <MusicPlayer />
    </>
  );
}
