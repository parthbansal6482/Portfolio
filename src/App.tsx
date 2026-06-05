import { Routes, Route } from 'react-router-dom';
import { Mail, Github, Linkedin } from 'lucide-react';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="bg-black text-[#E1E0CC] selection:bg-primary selection:text-black min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <CustomCursor />
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* Inquiry / Footer Section */}
      <footer id="contact" className="bg-[#101010] py-20 px-4 md:px-6 flex flex-col items-center border-t border-neutral-900">
        <div className="max-w-4xl w-full text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight mb-8">
            Let's create something<br />
            <span className="italic font-serif">extraordinary.</span>
          </h2>
          
          {/* Social Icons row */}
          <div className="flex gap-4 items-center justify-center mb-12">
            <a
              href="mailto:parth44bansal@gmail.com"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-primary hover:text-white transition-all duration-300 hover:scale-110"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>

            <a
              href="https://github.com/parthbansal6482"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-primary hover:text-white transition-all duration-300 hover:scale-110"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/parth-bansal-5b2825305/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-primary hover:text-white transition-all duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="https://x.com/Parthbansal6482"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-primary hover:text-white transition-all duration-300 hover:scale-110"
              title="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          <div className="w-full border-t border-neutral-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-normal">
            <div>© {new Date().getFullYear()} Parth Bansal. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="https://github.com/parthbansal6482" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/parth-bansal-5b2825305/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="https://x.com/Parthbansal6482" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">X (Twitter)</a>
              <a href="mailto:parth44bansal@gmail.com" className="hover:text-primary transition-colors">Mail</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
