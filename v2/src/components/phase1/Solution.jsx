import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Solution = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // track when this section enters and leaves
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [50, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0.2, 0.4], [0.9, 1]);

  return (
    <section ref={ref} className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      
      {/* Light Burst Effect that happens roughly when this section is in view */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
          opacity: useTransform(scrollYProgress, [0.2, 0.35], [0, 0.5]),
          scale: useTransform(scrollYProgress, [0.2, 0.7], [0.5, 1.5]) // expanding light
        }}
      />

      <motion.div 
        style={{ opacity, y, scale }}
        className="z-10 text-center px-6 max-w-5xl"
      >
        <motion.div 
          className="mb-8"
          initial={{ rotateX: 90 }}
          whileInView={{ rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, margin: "-20%" }}
        >
          <div className="inline-block px-6 py-2 rounded-full border-2 border-slate-900 font-bold text-sm tracking-widest text-slate-800 uppercase mb-6 shadow-sm">
            Business Automation TF
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight text-slate-900 mb-6 drop-shadow-sm">
            데이터 취합부터 최종 보고서까지,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              단 한 번의 클릭으로.
            </span>
          </h2>
        </motion.div>
        
        <p className="text-xl md:text-2xl text-slate-600 font-medium">
          구글 앱스크립트(GAS)가 이끄는 재무 부서의 제로 웨이스트(Zero-Waste) 혁명.
        </p>
      </motion.div>
    </section>
  );
};

export default Solution;
