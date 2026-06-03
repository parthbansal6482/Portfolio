import { motion } from 'framer-motion';
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
        <div className="bg-gradient-to-b from-black/30 via-transparent to-black absolute inset-0 pointer-events-none" />

        {/* Hero Content (bottom-aligned) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="grid grid-cols-12 gap-y-8 lg:gap-y-0 lg:gap-10 items-end">
            
            {/* Left 8 columns for Pragmatist */}
            <div className="col-span-12 lg:col-span-8 flex flex-col">
              <WordsPullUp
                text="Pragmatist"
                className="text-[17vw] sm:text-[16vw] md:text-[14.5vw] lg:text-[12vw] xl:text-[12.5vw] 2xl:text-[12.5vw] font-medium leading-[0.85] tracking-[-0.07em] w-full pb-4"
                style={{ color: '#E1E0CC' }}
              />
            </div>

            {/* Right 4 columns for description */}
            <div className="col-span-12 lg:col-span-4 flex flex-col items-start gap-4 lg:pl-6">
              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...ctaTransition, delay: 0.5 }}
                className="text-[#E1E0CC]/95 text-[11px] sm:text-xs md:text-xs lg:text-[13px] leading-relaxed font-normal tracking-wide text-left drop-shadow-md pb-4"
              >
                I’ve always seen software development as more than just making code work; it's about building smooth, scalable systems that last. I like spending my time diving into backend logic, untangling messy workflows, and squeezing out extra performance to create clean, frictionless tools that bring ideas to life without the headache.
              </motion.p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
