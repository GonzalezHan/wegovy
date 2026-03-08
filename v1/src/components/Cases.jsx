import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const cases = [
  {
    title: "월 결산 자동 취합 시스템",
    description: "각 파트에서 개별적으로 작성하던 엑셀 데이터를 GAS를 통해 하나의 시트로 자동 병합 및 검증합니다.",
    metrics: [
      { label: "단축 시간", value: "월 40시간", icon: Clock, color: "text-blue-400" },
      { label: "오류율 감소", value: "95%", icon: TrendingUp, color: "text-green-400" },
    ]
  },
  {
    title: "비용 정산 알림 봇",
    description: "구글 폼으로 접수된 비용 정산 내역을 파악하여, 이메일과 구글 챗으로 자동 승인/반려 알림을 전송합니다.",
    metrics: [
      { label: "처리 대기 시간", value: "-3일", icon: Clock, color: "text-blue-400" },
      { label: "누락 방지", value: "100%", icon: CheckCircle2, color: "text-green-400" },
    ]
  },
  {
    title: "환율 데이터 자동 스크래핑",
    description: "매일 고시되는 환율 정보를 자동으로 읽어와 내부 데이터베이스 시트에 기록하고 변동 추이를 리포팅합니다.",
    metrics: [
      { label: "휴먼 에러", value: "Zerp", icon: AlertTriangle, color: "text-red-400" },
      { label: "데이터 최신성", value: "실시간", icon: Activity, color: "text-purple-400" },
    ]
  }
];

// Fallback for Activity icon if missed in import above
import { Activity } from 'lucide-react'; 

const Cases = () => {
  return (
    <section className="min-h-screen py-32 bg-background relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold"
          >
            우리가 만들어낸 <span className="text-gradient">변화들</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            작은 스크립트 하나가 모여 부서 전체의 생산성을 혁신하고 있습니다.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <motion.div
               key={idx}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: idx * 0.15 }}
               className="group relative"
            >
               {/* Hover glow effect */}
               <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
               
               <div className="relative h-full p-8 rounded-2xl glass-panel border border-white/10 bg-card/50 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                     {item.metrics.map((metric, i) => {
                       const Icon = metric.icon;
                       return (
                         <div key={i} className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon size={16} className={metric.color}/> {metric.label}
                            </span>
                            <span className="font-bold text-lg">{metric.value}</span>
                         </div>
                       )
                     })}
                  </div>
               </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Cases;
