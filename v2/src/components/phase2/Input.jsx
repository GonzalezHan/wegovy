import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileSpreadsheet } from 'lucide-react';

const Input = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);

  // Mini sheets for different team members
  const sheets = [
    { name: "영업팀_실적.xlsx", delay: 0.2, pos: "top-10 left-10", color: "bg-blue-500" },
    { name: "마케팅_비용.xlsx", delay: 0.4, pos: "top-40 right-10", color: "bg-pink-500" },
    { name: "운영팀_비품.xlsx", delay: 0.6, pos: "bottom-10 left-32", color: "bg-green-500" },
  ];

  return (
    <section ref={ref} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-white">
      
      {/* Background Floating Sheets */}
      <div className="absolute inset-0 pointer-events-none">
        {sheets.map((sheet, idx) => {
          const sheetY = useTransform(scrollYProgress, [0, 1], [0, -100 * (idx + 1)]);
          return (
            <motion.div 
              key={idx}
              style={{ y: sheetY }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: sheet.delay, duration: 0.5 }}
              viewport={{ once: true }}
              className={`absolute ${sheet.pos} w-48 shadow-xl rounded-lg border border-slate-200 bg-white overflow-hidden`}
            >
              <div className={`${sheet.color} px-3 py-2 text-white text-xs font-bold flex items-center gap-2`}>
                <FileSpreadsheet size={14} />
                {sheet.name}
              </div>
              <div className="p-3 space-y-2">
                 <div className="flex gap-2">
                   <div className="w-1/3 h-2 bg-slate-200 rounded" />
                   <motion.div 
                      className="w-2/3 h-2 bg-slate-800 rounded"
                      initial={{ width: 0 }}
                      whileInView={{ width: '66%' }}
                      transition={{ delay: sheet.delay + 0.3, duration: 1, ease: "easeOut" }}
                   />
                 </div>
                 <div className="flex gap-2">
                   <div className="w-1/3 h-2 bg-slate-200 rounded" />
                   <motion.div 
                      className="w-1/2 h-2 bg-slate-800 rounded"
                      initial={{ width: 0 }}
                      whileInView={{ width: '50%' }}
                      transition={{ delay: sheet.delay + 0.6, duration: 1, ease: "easeOut" }}
                   />
                 </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="z-10 text-center px-6 max-w-4xl"
      >
        <span className="text-blue-600 font-bold tracking-wider text-sm uppercase block mb-4">Step 1. Data Input</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          금요일 오후 4시,<br/>
          팀원들은 평소처럼 자신의 시트만 <span className="text-blue-600">입력</span>하면 됩니다.
        </h2>
      </motion.div>
    </section>
  );
};

export default Input;
