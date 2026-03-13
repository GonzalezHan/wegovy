import { motion } from 'framer-motion';
import { 
  Flag, Rocket, ShieldCheck, Zap, 
  FileText, FileSpreadsheet, Presentation, 
  Server, Cloud, Settings, Activity, Database,
  Cpu, PieChart
} from 'lucide-react';

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

const RoadmapTest = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-8 bg-[#284283] text-white">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 items-center">
        
        {/* LEFT: 2x2 Grid */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              우리가 그리는 <span className="text-white">내일</span>
            </h2>
            <p className="opacity-70 text-lg">TF의 최종 목표는 부서 전체의 체질 개선입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {phases.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all bg-white/5 relative overflow-hidden group"
                >
                  <div className="absolute -inset-4 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: item.color.includes('blue') ? '#3b82f6' : item.color.includes('purple') ? '#a855f7' : item.color.includes('green') ? '#22c55e' : '#f97316' }} />
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-full border mb-4 ${item.color}`}>
                    <Icon size={14} />
                    <span>{item.phase}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="opacity-70 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Pipeline Automation Animation */}
        <div className="w-full lg:w-1/2 h-[600px] flex items-center justify-center relative rounded-3xl overflow-hidden glass-panel bg-[#0f111a] border border-white/5 shadow-2xl">
          
          {/* Background Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] top-0 left-0" />
            <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] bottom-0 right-0" />
          </div>

          {/* SVG Pipeline Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="flow-gradient-1" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="flow-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="flow-gradient-3" x1="100%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="flow-gradient-out" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Base Lines */}
            <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="url(#flow-gradient-1)" strokeWidth="6" strokeLinecap="round" />
            <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="url(#flow-gradient-2)" strokeWidth="6" strokeLinecap="round" />
            <line x1="75%" y1="20%" x2="50%" y2="50%" stroke="url(#flow-gradient-3)" strokeWidth="6" strokeLinecap="round" />
            <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="url(#flow-gradient-out)" strokeWidth="12" strokeLinecap="round" />

            {/* Animated Flow Packets (Dashed Lines) */}
            <motion.line 
              x1="25%" y1="20%" x2="50%" y2="50%" 
              stroke="#60a5fa" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="10 30"
              animate={{ strokeDashoffset: -40 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.line 
              x1="50%" y1="20%" x2="50%" y2="50%" 
              stroke="#34d399" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="10 30"
              animate={{ strokeDashoffset: -40 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.line 
              x1="75%" y1="20%" x2="50%" y2="50%" 
              stroke="#a78bfa" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="10 30"
              animate={{ strokeDashoffset: -40 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />

            {/* Output High-speed Flow */}
            <motion.line 
              x1="50%" y1="50%" x2="50%" y2="80%" 
              stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
              strokeDasharray="20 40"
              animate={{ strokeDashoffset: -60 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* Interactive Nodes Overlay */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            
            {/* Source 1: Workspace (Top Left) */}
            <div className="absolute left-[25%] top-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div 
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                {/* File Stack */}
                <div className="absolute -top-3 -left-3 w-14 h-14 bg-yellow-500/20 border border-yellow-500/40 rounded-xl flex items-center justify-center backdrop-blur-md rotate-[-8deg]">
                  <Presentation className="text-yellow-400 opacity-50" size={24} />
                </div>
                <div className="absolute -top-1 -left-1 w-14 h-14 bg-green-500/20 border border-green-500/40 rounded-xl flex items-center justify-center backdrop-blur-md rotate-[-4deg]">
                  <FileSpreadsheet className="text-green-400 opacity-70" size={24} />
                </div>
                <div className="w-14 h-14 bg-blue-500/20 border border-blue-500/40 rounded-xl shadow-lg flex items-center justify-center backdrop-blur-md relative z-10">
                  <FileText className="text-blue-400" size={24} />
                </div>
              </motion.div>
            </div>

            {/* Source 2: External API (Top Middle) */}
            <div className="absolute left-[50%] top-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div 
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl shadow-lg flex items-center justify-center backdrop-blur-md relative z-10"
              >
                <Cloud className="text-emerald-400" size={28} />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-emerald-500/20 rounded-2xl"
                />
              </motion.div>
            </div>

            {/* Source 3: Internal ERP (Top Right) */}
            <div className="absolute left-[75%] top-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div 
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex gap-1"
              >
                <div className="flex flex-col gap-1 items-end mt-2 opacity-60">
                  <Database className="text-purple-400" size={18} />
                  <Database className="text-purple-400" size={18} />
                </div>
                <div className="w-14 h-16 bg-purple-500/10 border border-purple-500/30 rounded-xl shadow-lg flex flex-col items-center justify-center backdrop-blur-md gap-1">
                  <Server className="text-purple-400" size={24} />
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CENTRAL CORE: Automated Process */}
            <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
              <div className="relative">
                {/* Outer Rotating Gear/Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 -m-6 rounded-xl border-2 border-dashed border-blue-500/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 -m-3 rounded-full border border-teal-500/40"
                />
                
                {/* Core Base */}
                <div className="w-24 h-24 bg-gradient-to-tr from-slate-900 to-slate-800 border-2 border-slate-700/80 shadow-[0_0_50px_rgba(59,130,246,0.3)] rounded-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
                  {/* Internal Glow */}
                  <div className="absolute inset-0 bg-blue-500/10" />
                  
                  {/* Central CPU/Gear */}
                  <motion.div
                    animate={{ rotate: 180 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="relative z-10"
                  >
                    <Settings className="text-blue-400" size={36} strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Satellite Gears */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-slate-800 border border-slate-700 rounded-lg p-1.5 shadow-lg"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Settings className="text-emerald-400" size={16} />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-3 -left-3 bg-slate-800 border border-slate-700 rounded-lg p-1.5 shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <Settings className="text-purple-400" size={14} />
                </motion.div>

              </div>
            </div>

            {/* Output Dashboards (Bottom) */}
            <div className="absolute left-[50%] top-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div
                animate={{ 
                  y: [5, -5, 5],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-56 h-auto bg-[#1a1f35] border border-blue-500/20 rounded-xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col gap-3 relative z-10"
              >
                {/* Dashboard Header */}
                <div className="flex justify-between items-center border-b border-indigo-500/20 pb-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                    <div className="w-2 h-2 rounded-full bg-green-400/80" />
                  </div>
                  <Cpu className="text-blue-400/50" size={14} />
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Card 1 */}
                  <div className="bg-slate-800/50 rounded p-2 border border-slate-700/50 flex flex-col items-center justify-center">
                    <Activity className="text-emerald-400 mb-1" size={16} />
                    <div className="h-1 w-8 bg-emerald-400/30 font-bold rounded" />
                    <motion.div 
                       className="text-[10px] font-black text-emerald-300 mt-1"
                       animate={{ opacity: [1, 0.5, 1] }}
                       transition={{ duration: 2, repeat: Infinity }}
                    >+46%</motion.div>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-slate-800/50 rounded p-2 border border-slate-700/50 flex flex-col items-center justify-center">
                    <PieChart className="text-purple-400 mb-1" size={16} />
                    <div className="h-1 w-8 bg-purple-400/30 font-bold rounded" />
                    <div className="text-[10px] font-black text-purple-300 mt-1">377</div>
                  </div>
                </div>

                {/* Big Chart */}
                <div className="w-full h-16 bg-blue-900/10 border border-blue-500/20 rounded relative overflow-hidden flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <motion.path 
                      d="M0 40 L0 30 L10 25 L20 35 L30 15 L40 20 L50 10 L60 25 L70 5 L80 15 L90 5 L100 10 L100 40 Z" 
                      fill="url(#flow-gradient-1)"
                      opacity="0.8"
                    />
                    <motion.path 
                      d="M0 30 L10 25 L20 35 L30 15 L40 20 L50 10 L60 25 L70 5 L80 15 L90 5 L100 10" 
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default RoadmapTest;
