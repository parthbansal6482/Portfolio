import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import WordsPullUp from './WordsPullUp';

export default function Hero() {
  const ctaTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <section className="h-screen w-screen p-4 md:p-6 bg-black relative flex flex-col justify-between">
      <div className="rounded-2xl md:rounded-[2rem] overflow-hidden relative w-full h-full bg-neutral-950 flex flex-col">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0 pointer-events-none"
        />

        {/* Noise overlay */}
        <div className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none absolute inset-0" />

        {/* Gradient overlay */}
        <div className="bg-gradient-to-b from-black/30 via-transparent to-black/60 absolute inset-0 pointer-events-none" />

        {/* Navbar */}
        <Navbar />

        {/* Hero Content (bottom-aligned) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="grid grid-cols-12 gap-y-6 lg:gap-y-0 lg:gap-6 items-end">
            
            {/* Left 8 columns for giant title */}
            <div className="col-span-12 lg:col-span-8 flex flex-col">
              <WordsPullUp
                text="Prisma"
                showAsterisk={true}
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: '#E1E0CC' }}
              />
            </div>

            {/* Right 4 columns for description and CTA button */}
            <div className="col-span-12 lg:col-span-4 flex flex-col items-start gap-6 sm:gap-8 lg:pl-4">
              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...ctaTransition, delay: 0.5 }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] font-normal tracking-wide text-left"
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...ctaTransition, delay: 0.7 }}
              >
                <button
                  type="button"
                  className="bg-primary rounded-full pl-5 pr-2 py-2 flex items-center gap-2 group hover:gap-3 transition-all duration-300 text-black font-medium text-sm sm:text-base"
                >
                  <span>Join the lab</span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </button>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
