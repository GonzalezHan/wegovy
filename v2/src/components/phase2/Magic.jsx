import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MousePointer2, Zap } from 'lucide-react';

const Magic = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);
  
  // Magic Data merging animation
  const dataGatheringProgress = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  return (
    <section ref={ref} className="h-screen w-full flex flex-col md:flex-row items-center justify-center relative overflow-hidden bg-white gap-10 px-6 max-w-7xl mx-auto">
      
      <motion.div 
        style={{ opacity, y }}
        className="z-10 text-left max-w-xl md:w-1/2"
      >
        <span className="text-purple-600 font-bold tracking-wider text-sm uppercase block mb-4">Step 2. Automation Magic</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
          취합을 위한 끝없는 엑셀 노가다?<br/>
          이제 <span className="text-purple-600">버튼 한 번</span>이면 끝납니다.
        </h2>
        <p className="text-lg text-slate-600">
          앱스크립트가 각기 다른 시트에 흩어진 수백 개의 데이터를 자동으로 탐색, 취합, 정제하여 하나의 마스터 뷰로 통합합니다.
        </p>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative w-full md:w-1/2 h-96 flex items-center justify-center pointer-events-none"
      >
        {/* Master Sheet UI */}
        <div className="absolute w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-0">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
            <div className="font-bold text-slate-700 text-sm">재무팀 마스터 주간보고서</div>
            <motion.div 
              style={{
                scale: useTransform(scrollYProgress, [0.45, 0.5, 0.55], [1, 0.95, 1]),
                backgroundColor: useTransform(scrollYProgress, [0.45, 0.5], ["#3b82f6", "#16a34a"])
              }}
              className="px-3 py-1.5 rounded-md text-white text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <Zap size={14} /> 자동 취합 실행
            </motion.div>
          </div>
          <div className="p-4 h-48 relative">
            {/* Gathered data mockups */}
            <motion.div 
              style={{ opacity: dataGatheringProgress, y: useTransform(dataGatheringProgress, [0, 1], [20, 0]) }}
              className="space-y-3"
            >
              <div className="w-full h-4 bg-green-100 rounded border border-green-200" />
              <div className="w-5/6 h-4 bg-blue-100 rounded border border-blue-200" />
              <div className="w-full h-4 bg-purple-100 rounded border border-purple-200" />
              <div className="w-4/5 h-4 bg-yellow-100 rounded border border-yellow-200" />
            </motion.div>
          </div>
        </div>

        {/* Virtual Mouse Pointer */}
        <motion.div
          className="absolute z-20 text-slate-900 drop-shadow-md"
          style={{
            x: useTransform(scrollYProgress, [0.3, 0.45], [150, 100]),
            y: useTransform(scrollYProgress, [0.3, 0.45], [150, -130]),
            scale: useTransform(scrollYProgress, [0.45, 0.5, 0.55], [1, 0.8, 1])
          }}
        >
          <MousePointer2 size={32} fill="currentColor" />
        </motion.div>

        {/* Flying Data Particles */}
        <motion.div 
           className="absolute w-4 h-4 bg-green-400 rounded-sm z-10"
           style={{
             x: useTransform(scrollYProgress, [0.45, 0.55], [-200, 0]),
             y: useTransform(scrollYProgress, [0.45, 0.55], [100, 0]),
             opacity: useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0, 1, 0])
           }}
        />
        <motion.div 
           className="absolute w-4 h-4 bg-blue-400 rounded-sm z-10"
           style={{
             x: useTransform(scrollYProgress, [0.45, 0.55], [200, 0]),
             y: useTransform(scrollYProgress, [0.45, 0.55], [-100, 0]),
             opacity: useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0, 1, 0])
           }}
        />

      </motion.div>
    </section>
  );
};

export default Magic;
