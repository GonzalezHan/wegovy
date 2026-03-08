import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, CheckCircle2 } from 'lucide-react';

const Output = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);

  // Slack Notification popup timing
  const popupY = useTransform(scrollYProgress, [0.4, 0.5], [50, 0]);
  const popupOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  return (
    <section ref={ref} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-white px-6">
      
      <motion.div 
        style={{ opacity, y }}
        className="z-10 text-center max-w-4xl mb-16"
      >
        <span className="text-green-600 font-bold tracking-wider text-sm uppercase block mb-4">Step 3. Result & Distribution</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          데이터 취합부터 최종 보고까지,<br/>
          이 모든 과정에 걸린 시간 <span className="text-green-600">단 3초</span>.
        </h2>
      </motion.div>

      {/* Final Dashboard UI */}
      <motion.div 
        style={{ opacity, scale: useTransform(scrollYProgress, [0.3, 0.5], [0.95, 1]) }}
        className="w-full max-w-4xl bg-white border border-slate-200 shadow-xl rounded-xl p-6 relative"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-slate-800">재무 본부 주간 결산 대시보드</h3>
            <span className="text-sm text-slate-500">자동 생성됨 • 1분 전</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
            <div className="text-sm text-slate-500 mb-1">총 매출</div>
            <div className="text-2xl font-bold text-slate-800">₩ 12.4억</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
            <div className="text-sm text-slate-500 mb-1">비용</div>
            <div className="text-2xl font-bold text-slate-800">₩ 3.2억</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
            <div className="text-sm text-slate-500 mb-1">영업이익률</div>
            <div className="text-2xl font-bold text-green-600">74%</div>
          </div>
        </div>

        <div className="w-full h-48 bg-slate-50 border border-slate-100 rounded-lg flex items-end p-4 gap-2">
           {/* Dummy Chart bars */}
           {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
             <div key={i} className="flex-1 bg-blue-500/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
           ))}
        </div>

        {/* Slack-style Notification Popup */}
        <motion.div 
          style={{ y: popupY, opacity: popupOpacity }}
          className="absolute -right-4 -bottom-10 md:-right-10 md:-bottom-10 bg-white shadow-2xl border border-slate-100 rounded-lg p-4 flex gap-4 items-start w-80 z-50"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0">
            <MessageSquare size={20} />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-slate-900">자동화 봇 (GAS)</span>
              <span className="text-xs text-slate-400">방금</span>
            </div>
            <p className="text-sm text-slate-600">
              본부장님, 이번 주 재무팀 주간보고서 최종본 공유드립니다. <CheckCircle2 size={14} className="inline text-green-500"/>
            </p>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Output;
