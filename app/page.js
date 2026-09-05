import StatusBar from "./components/StatusBar";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Terminal from "./components/Terminal";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TopologyMap from "./components/TopologyMap";
import SubmarineCableMap from "./components/SubmarineCableMap";
import Gallery from "./components/Gallery";
import NetworkTools from "./components/NetworkTools";
import Skills from "./components/Skills";
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
import IncidentSimulator from "./components/IncidentSimulator";
import ResumeModal from "./components/ResumeModal";
import NOCWallboard from "./components/NOCWallboard";
import { LanguageProvider } from "./context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <Preloader />
      <CommandPalette />
      <ResumeModal />
      <NOCWallboard />
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
        <ScrollReveal><TopologyMap /></ScrollReveal>
        <ScrollReveal><SubmarineCableMap /></ScrollReveal>
        <ScrollReveal><IncidentSimulator /></ScrollReveal>
        <ScrollReveal><Gallery /></ScrollReveal>
        <ScrollReveal><NetworkTools /></ScrollReveal>
        <ScrollReveal><Skills /></ScrollReveal>
        <ScrollReveal><Certification /></ScrollReveal>
        <ScrollReveal><Education /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
        <Footer />
      </div>
      <BackToTop />
      <MusicPlayer />
    </LanguageProvider>
  );
}
