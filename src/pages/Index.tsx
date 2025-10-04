import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BackgroundMesh from "@/components/BackgroundMesh";
import SpiderWeb from "@/components/SpiderWeb";

// Lazy load visual components
const AmbientParticles = lazy(() => import("@/components/AmbientParticles"));
const ScrollBlobs = lazy(() => import("@/components/ScrollBlobs"));

// Lazy load components below the fold
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const TechStack = lazy(() => import("@/components/TechStack"));
const Education = lazy(() => import("@/components/Education"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Certifications = lazy(() => import("@/components/Certifications"));
const Gallery = lazy(() => import("@/components/Gallery"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  // Portfolio index page with interactive spider web background
  return (
    <div className="min-h-screen relative">
      <SpiderWeb />
      <BackgroundMesh />
      <Suspense fallback={null}>
        <ScrollBlobs />
        <AmbientParticles />
      </Suspense>
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="h-screen" />}>
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Education />
        <Achievements />
        <Certifications />
        <Gallery />
        <Contact />
      </Suspense>
    </div>
  );
};

export default Index;
