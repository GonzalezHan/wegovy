import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Agitation = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  
  // Timer visual that beats like a heart
  const timerScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  return (
    <section ref={ref} className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      
      {/* Background Chaos Lines */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ scale }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      <motion.div 
        style={{ opacity: textOpacity, y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
        className="z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl"
      >
        <motion.div 
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: ["0 0 0px 0px rgba(239, 68, 68, 0)", "0 0 40px 10px rgba(239, 68, 68, 0.3)", "0 0 0px 0px rgba(239, 68, 68, 0)"]
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          style={{ scale: timerScale }}
          className="w-32 h-32 rounded-full border-4 border-red-500/80 flex items-center justify-center mb-10 bg-red-900/20 backdrop-blur-sm"
        >
          <span className="text-3xl font-mono text-red-500/90 font-bold">08:00</span>
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-snug">
          취합에 <span className="text-red-500">3시간</span>, 정제에 <span className="text-red-500">5시간</span>.<br/> 
          그리고 피할 수 없는 휴먼 에러.
        </h2>
      </motion.div>
    </section>
  );
};

export default Agitation;
