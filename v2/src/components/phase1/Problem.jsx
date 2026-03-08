import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Problem = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  // Generate some dummy excel UI elements to float around
  const excelElements = Array.from({ length: 8 }).map((_, i) => {
    return (
      <motion.div
        key={i}
        className="absolute bg-white/5 border border-white/10 rounded backdrop-blur-sm p-4 w-48 h-32 flex flex-col gap-2"
        style={{
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          y: useTransform(scrollYProgress, [0, 1], [Math.random() * 100, Math.random() * -200]),
          opacity: useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.3, 0]),
          rotate: Math.random() * 20 - 10,
        }}
      >
        <div className="flex gap-1">
           <div className="w-3 h-3 bg-red-500/50 rounded-full" />
           <div className="w-3 h-3 bg-yellow-500/50 rounded-full" />
           <div className="w-3 h-3 bg-green-500/50 rounded-full" />
        </div>
        <div className="w-full h-2 bg-white/20 rounded mt-2" />
        <div className="w-3/4 h-2 bg-white/20 rounded" />
        <div className="w-5/6 h-2 bg-white/20 rounded" />
      </motion.div>
    );
  });

  return (
    <section ref={ref} className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background Excel Parallax effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {excelElements}
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="z-10 text-center px-6 max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white/90">
          매주 금요일, <br/> 우리는 숫자가 아닌 <br/> 
          <span className="text-red-500/80 italic">'복붙(Ctrl+C, V)'</span>과 싸웁니다.
        </h1>
      </motion.div>
    </section>
  );
};

export default Problem;
