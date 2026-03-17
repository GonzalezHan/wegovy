import { useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import {
  Database, Bot, Share2, LineChart,
  User, Flag, Activity
} from 'lucide-react';

/* =============================================
   DATA
   ============================================= */
const CARDS = [
  {
    id: 0,
    icon: Database,
    color: "blue",
    title: "Data Pipeline",
    desc: "흩어진 시트, 폼 데이터를 표준화된 파이프라인으로 연결해 자동 취합합니다.",
  },
  {
    id: 1,
    icon: Bot,
    color: "purple",
    title: "AI Agent",
    desc: "보고서 요약 및 이상 탐지를 지원하는 AI 에이전트를 단계적으로 도입합니다.",
  },
  {
    id: 2,
    icon: Share2,
    color: "green",
    title: "Integration",
    desc: "ERP, 외부 API를 연동해 데이터의 실시간성과 정합성을 극대화합니다.",
  },
  {
    id: 3,
    icon: LineChart,
    color: "orange",
    title: "Auto-reporting",
    desc: "배포까지 이어지는 완전 자동 리포팅 체계로 업무를 마무리합니다.",
  },
];

const COLOR_MAP = {
  blue:   { badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",   active: "border-blue-500/50 bg-blue-500/10 shadow-blue-500/20",   glow: "#3b82f6" },
  purple: { badge: "bg-purple-500/20 text-purple-300 border-purple-500/30", active: "border-purple-500/50 bg-purple-500/10 shadow-purple-500/20", glow: "#a855f7" },
  green:  { badge: "bg-green-500/20 text-green-300 border-green-500/30",   active: "border-green-500/50 bg-green-500/10 shadow-green-500/20",   glow: "#22c55e" },
  orange: { badge: "bg-orange-500/20 text-orange-300 border-orange-500/30", active: "border-orange-500/50 bg-orange-500/10 shadow-orange-500/20", glow: "#f97316" },
};

/* =============================================
   CARD ITEM (Dark Navy optimized)
   ============================================= */
const CardItem = ({ card, isActive }) => {
  const cm = COLOR_MAP[card.color];
  const Icon = card.icon;
  return (
    <motion.div
      className={`border rounded-2xl p-4 md:p-5 transition-all duration-500 relative overflow-hidden cursor-default ${
        isActive
          ? `${cm.active} scale-[1.02] border-opacity-100 shadow-2xl`
          : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="roadmapCardHighlight"
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${cm.glow}20 0%, transparent 70%)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <div className="relative z-10 flex items-center gap-4 mb-2.5">
        <div className={`p-1.5 rounded-lg border shrink-0 ${isActive ? cm.badge : 'bg-white/5 text-slate-500 border-white/5'}`}>
          <Icon size={22} />
        </div>
        <h3 className={`text-[20px] font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
          {card.title}
        </h3>
      </div>
      <p className="relative z-10 text-[16px] leading-relaxed text-white break-keep line-clamp-2">
        {card.desc}
      </p>
    </motion.div>
  );
};

/* =============================================
   GRAPH SCENE (Dark Navy Theme)
   ============================================= */
const GraphScene = ({ activeCard }) => {
  const pathData = "M 10 335 Q 100 335, 200 250 T 390 165"; 
  
  const nodes = [
    { id: 0, cx: 10,  cy: 335, label: "Level 1", icon: Database, color: "#3b82f6" },
    { id: 1, cx: 136, cy: 290, label: "Level 2", icon: Bot, color: "#a855f7" },
    { id: 2, cx: 263, cy: 220, label: "Level 3", icon: Share2, color: "#22c55e" },
    { id: 3, cx: 390, cy: 165, label: "Level 4", icon: LineChart, color: "#f97316" },
  ];

  return (
    <div className="absolute inset-0 w-full h-full p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="relative w-full h-full max-w-md aspect-square">
        <svg className="absolute inset-0 w-full h-full drop-shadow-sm" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="33%" stopColor="#a855f7" />
              <stop offset="66%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
               <feGaussianBlur stdDeviation="4" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Base Path (Shadow/Track) */}
          <path d={pathData} fill="none" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
          
          {/* Active Animated Path */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: Math.min(1, (activeCard + 1) / 4) }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          {/* Nodes */}
          {nodes.map((node) => {
            const isReached = activeCard >= node.id;
            const Icon = node.icon;
            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.cx} cy={node.cy}
                  r={isReached ? 6 : 4}
                  fill={isReached ? node.color : "#475569"}
                  initial={false}
                  animate={{ 
                    scale: isReached ? [1, 1.3, 1] : 1,
                    fill: isReached ? node.color : "#475569"
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                <AnimatePresence>
                  {isReached && (
                    <motion.g
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <rect
                        x={node.cx - 40} y={node.cy - 70}
                        width="80" height="60"
                        rx="12"
                        fill="#0F172A"
                        stroke={node.color}
                        strokeWidth="1.5"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}
                      />
                      <foreignObject x={node.cx - 14} y={node.cy - 64} width="28" height="28">
                        <div className="flex items-center justify-center w-full h-full" style={{ color: node.color }}>
                          <Icon size={22} />
                        </div>
                      </foreignObject>
                      <text
                        x={node.cx} y={node.cy - 25}
                        textAnchor="middle"
                        className="font-black"
                        fill="#94A3B8"
                        fontSize="14"
                      >
                        {node.label}
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            );
          })}
        </svg>

        {/* Horizontal Progress Bar */}
        <div className="absolute -bottom-4 left-1 right-1 flex flex-col items-center gap-2">
          <div className="relative w-full h-2 bg-white/5 rounded-full border border-white/5 overflow-hidden flex items-center">
             <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${((activeCard + 1) / 4) * 100}%` }}
                transition={{ type: "spring", stiffness: 40, damping: 15 }}
             />
          </div>
          <div className="w-full flex justify-between items-center px-1">
             <div className="flex flex-col items-center gap-1">
                <User size={16} className={activeCard >= 0 ? "text-blue-400" : "text-slate-700"} />
                <span className="text-[9px] font-bold text-slate-600">START</span>
             </div>
             <div className="flex flex-col items-center gap-1">
                <Flag size={16} className={activeCard === 3 ? "text-orange-400" : "text-slate-700"} />
                <span className="text-[9px] font-bold text-slate-600">GOAL</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =============================================
   MAIN: Roadmap
   ============================================= */
const THRESHOLDS = [0.0625, 0.125, 0.1875]; 

const Roadmap = ({ progress }) => {
  const [activeCard, setActiveCard] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    if (v < THRESHOLDS[0]) setActiveCard(0);
    else if (v < THRESHOLDS[1]) setActiveCard(1);
    else if (v < THRESHOLDS[2]) setActiveCard(2);
    else setActiveCard(3);
  });

  return (
    <section className="h-full w-full flex flex-col justify-center relative overflow-hidden bg-[#050B1A] text-white border-t border-white/5">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col h-full py-20 lg:py-0 justify-center relative z-10">

        {/* ── 상단 카피 ── */}
        <div className="mb-12 md:mb-16 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Activity size={12} className="text-blue-400" />
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">The Future Roadmap</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6 uppercase">
            우리가 그리는 내일
          </h2>
          <p className="text-[30px] text-slate-400 font-medium max-w-3xl break-keep leading-snug border-l-2 border-blue-500/50 pl-6">
            데이터 파이프라인부터 자동화 리포팅까지,<br />
            지속 가능한 <span className="text-white font-bold decoration-blue-500">자동화 워크스페이스</span>를 향해 나아갑니다.
          </p>
        </div>

        {/* ── 본문: 4행 세로 카드 + 우측 그래프 ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* 좌측: 4행 세로 카드 리스트 (550px) */}
          <div className="w-full lg:w-[550px] shrink-0 flex flex-col gap-4">
            {CARDS.map((card) => (
              <CardItem key={card.id} card={card} isActive={activeCard === card.id} />
            ))}
          </div>

          {/* 우측: 그래프 애니메이션 */}
          <div className="flex-1 w-full aspect-[4/3] relative flex items-center justify-center">
            {/* Panel Background (Dark Neon) */}
            <div className="absolute inset-0 bg-[#0A1128]/80 border border-white/5 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050B1A_100%)] opacity-40" />
               <GraphScene activeCard={activeCard} />
               
               {/* Minimal Logo */}
               <div className="absolute bottom-6 right-8 opacity-40">
                 <span className="text-[10px] font-black tracking-widest text-slate-500"></span>
               </div>
            </div>
            
            {/* Outer glow */}
            <div className="absolute -inset-10 bg-blue-500/5 rounded-[4rem] blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Roadmap;
