import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Rocket, ShieldCheck, Zap } from 'lucide-react';

const phases = [
  {
    phase: "Phase 1: 기반 구축",
    title: "단순 수작업 제로화",
    description: "각 파트별 단순 반복적인 엑셀 취합 및 이메일 발송 작업을 100% 자동화합니다.",
    icon: Zap,
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    phase: "Phase 2: 고도화",
    title: "외부 시스템 완벽 연동",
    description: "내부 ERP 및 외부 금융 API 실시간 연동을 통해 데이터의 정합성과 무결성을 확보합니다.",
    icon: ShieldCheck,
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    phase: "Phase 3: 혁신",
    title: "예측 분석 및 리포팅 플랫폼",
    description: "단순 통계를 넘어 AI 기반의 재무 예측 모델을 결합한 스마트 대시보드를 전 부서에 배포합니다.",
    icon: Rocket,
    color: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  {
    phase: "Phase 4: 내재화",
    title: "전사적 자동화 문화 확산",
    description: "재무 부서를 넘어 타 부서에도 자동화 성공 사례를 전파하고, 시민 개발자(Citizen Developer)를 양성합니다.",
    icon: Flag,
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30"
  }
];

const Roadmap = () => {
  return (
    <section className="min-h-screen py-32 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 w-full">
        
        <div className="text-center mb-24 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold"
          >
            우리가 그리는 <span className="text-gradient">내일</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg">TF의 최종 목표는 부서 전체의 체질 개선입니다.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue via-brand-purple to-transparent md:-translate-x-1/2 opacity-30" />

          <div className="space-y-16">
            {phases.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;
              
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center group"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[20px] md:left-1/2 w-10 h-10 rounded-full glass-panel border border-white/20 flex items-center justify-center z-10 -translate-x-1/2 translate-y-2 md:translate-y-0 bg-background group-hover:scale-110 transition-transform duration-300">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple animate-pulse" />
                  </div>

                  {/* Content Container - alternating left/right on desktop */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 pt-2 md:pt-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors bg-card/50">
                       <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full border mb-4 ${item.color} ${isEven ? 'md:flex-row-reverse md:ml-auto' : ''}`}>
                         <Icon size={14} />
                         <span>{item.phase}</span>
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Roadmap;
