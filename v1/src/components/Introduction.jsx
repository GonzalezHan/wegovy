import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileSpreadsheet, Bot, ArrowRight, Zap } from 'lucide-react';

const Introduction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen py-24 flex items-center bg-background border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="space-y-24"
        >
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
             <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold">
               왜 업무자동화를 <span className="text-gradient">시작</span>했는가?
             </motion.h2>
             <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
               반복되고 소모적인 수작업에서 벗어나, 재무 부서 본연의 가치 있는 분석과 전략 수립에 집중하기 위한 여정.
             </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
             {/* Decorative connecting line for desktop */}
             <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0"></div>

             {/* Past */}
             <motion.div variants={itemVariants} className="relative z-10 p-8 glass-panel rounded-2xl flex flex-col items-center text-center space-y-4 border border-red-500/20 bg-background/50">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-400">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold">단순 반복 업무</h3>
                <p className="text-muted-foreground text-sm">
                  데이터 복사, 붙여넣기, 수기 검증 등 영혼을 갉아먹는 단순 반복 작업의 늪.
                </p>
             </motion.div>

             {/* Arrow Center */}
             <motion.div variants={itemVariants} className="relative z-10 flex items-center justify-center py-4 md:py-0">
               <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/50 animate-pulse">
                 <ArrowRight size={24} className="rotate-90 md:rotate-0" />
               </div>
             </motion.div>

             {/* Future/Present */}
             <motion.div variants={itemVariants} className="relative z-10 p-8 glass-panel rounded-2xl flex flex-col items-center text-center space-y-4 border border-brand-blue/20 bg-background/50">
                <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl animate-pulse mix-blend-screen" />
                <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4 text-brand-blue relative z-10">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold relative z-10">스마트 워크플로우</h3>
                <p className="text-muted-foreground text-sm relative z-10">
                  스크립트 기반의 매끄러운 자동화로 데이터가 스스로 흐르고 취합되는 환경.
                </p>
             </motion.div>

          </div>

          <motion.div variants={itemVariants} className="text-center pt-8">
            <p className="text-xl md:text-2xl font-light text-white/80 max-w-4xl mx-auto leading-relaxed">
              우리는 이 문제를 해결하기 위해 가장 강력하고 접근성 높은 무기를 선택했습니다.<br/>
              바로 <strong className="text-white font-semibold flex items-center justify-center gap-2 mt-4 text-3xl"><FileSpreadsheet className="text-green-500"/> Google Workspace 환경의 잠재력을 폭발시킬</strong>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
