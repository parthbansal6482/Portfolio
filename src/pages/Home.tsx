import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Features / Projects Section */}
      <Features />
    </>
  );
}
