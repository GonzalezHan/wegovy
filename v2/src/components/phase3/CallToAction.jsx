import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, Coffee } from 'lucide-react';

const CallToAction = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);

  // Line chart drawing animation
  const pathLength = useTransform(scrollYProgress, [0.5, 0.9], [0, 1]);

  return (
    <section ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[#fafafa]">
      
      <motion.div 
        style={{ opacity, y }}
        className="z-10 text-center px-6 max-w-4xl"
      >
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-600">
            <Coffee size={40} strokeWidth={1.5} />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-8">
          이제 엑셀 대신,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
            진짜 재무의 본질
          </span>에 집중할 시간입니다.
        </h2>
        
        <p className="text-xl text-slate-500 font-medium mb-16 max-w-2xl mx-auto">
          단순 반복 업무에서 벗어나, 데이터 분석과 전략적 의사결정에 더 많은 시간과 가치를 투자하세요.
        </p>

        {/* Abstract Ascending Chart ending */}
        <div className="w-full max-w-2xl mx-auto h-40 relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
              </linearGradient>
            </defs>
            <motion.path 
              d="M 0 100 C 100 100, 150 50, 200 60 C 250 70, 300 10, 400 0" 
              fill="none" 
              stroke="url(#lineGrad)" 
              strokeWidth="6" 
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <motion.circle 
               cx="400" cy="0" r="8" 
               fill="#10b981"
               style={{ opacity: useTransform(pathLength, [0.95, 1], [0, 1]) }}
            />
          </svg>
        </div>

      </motion.div>
    </section>
  );
};

export default CallToAction;
