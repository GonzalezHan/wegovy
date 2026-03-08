import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Clock, AlertTriangle, Activity } from 'lucide-react';

const cases = [
  {
    title: "월 결산 자동 취합 시스템",
    description: "각 파트에서 개별적으로 작성하던 엑셀 데이터를 GAS를 통해 하나의 시트로 자동 병합 및 검증합니다.",
    metrics: [
      { label: "단축 시간", value: "월 40시간", icon: Clock, color: "text-blue-600" },
      { label: "오류율 감소", value: "95%", icon: TrendingUp, color: "text-green-600" },
    ]
  },
  {
    title: "비용 정산 알림 봇",
    description: "구글 폼으로 접수된 비용 정산 내역을 파악하여, 이메일과 구글 챗으로 자동 승인/반려 알림을 전송합니다.",
    metrics: [
      { label: "처리 대기 시간", value: "-3일", icon: Clock, color: "text-blue-600" },
      { label: "누락 방지", value: "100%", icon: CheckCircle2, color: "text-green-600" },
    ]
  },
  {
    title: "환율 데이터 자동 스크래핑",
    description: "매일 고시되는 환율 정보를 자동으로 읽어와 내부 데이터베이스 시트에 기록하고 변동 추이를 리포팅합니다.",
    metrics: [
      { label: "휴먼 에러", value: "0", icon: AlertTriangle, color: "text-amber-500" },
      { label: "데이터 최신성", value: "실시간", icon: Activity, color: "text-purple-600" },
    ]
  }
];

const Cases = () => {
  return (
    <div className="w-full pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900"
          >
            우리가 만들어낸 <span className="text-gradient">변화들</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg"
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
               <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
               
               <div className="relative h-full p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                     {item.metrics.map((metric, i) => {
                       const Icon = metric.icon;
                       return (
                         <div key={i} className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm text-slate-500">
                              <Icon size={16} className={metric.color}/> {metric.label}
                            </span>
                            <span className="font-bold text-lg text-slate-800">{metric.value}</span>
                         </div>
                       )
                     })}
                  </div>
               </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Cases;
