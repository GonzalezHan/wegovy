
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
    <section className="h-full w-full flex flex-col justify-center relative overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto px-4 w-full pt-16 md:pt-20">
        
        <div className="text-center mb-24 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold"
          >
            우리가 그리는 <span className="text-gradient">내일</span>
          </motion.h2>
          <p className="opacity-70 text-lg">TF의 최종 목표는 부서 전체의 체질 개선입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {phases.map((item, idx) => {
            const Icon = item.icon;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2 bg-white/5 hover:bg-white/10 group relative overflow-hidden"
              >
                {/* Background Glow Effect on Hover */}
                <div className="absolute -inset-4 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 bg-current pointer-events-none" style={{ color: item.color.split(' ')[1].replace('text-', '') }} />
                
                <div className="relative z-10 flex flex-col h-full">
                   <div className={`inline-flex items-center self-start gap-2 px-4 py-2 text-sm font-bold rounded-full border mb-6 ${item.color}`}>
                     <Icon size={16} />
                     <span>{item.phase}</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                   <p className="opacity-75 text-base leading-relaxed mt-auto">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Roadmap;
