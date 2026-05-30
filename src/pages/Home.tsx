import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Features from '../components/Features';

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Skills Section */}
      <Skills />

      {/* 4. Features / Projects Section */}
      <Features />
    </>
  );
}
