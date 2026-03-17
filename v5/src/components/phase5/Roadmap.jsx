import { useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import {
  Zap, ShieldCheck, Rocket, Bot,
  FileText, FileSpreadsheet,
  Server, Cloud, Settings, Activity, Database,
  Cpu, PieChart, GitMerge, BarChart3, Sparkles,
  CheckCircle2, Network, Workflow
} from 'lucide-react';

/* =============================================
   DATA
   ============================================= */
const CARDS = [
  {
    id: 0,
    phase: "Roadmap 01",
    icon: Zap,
    color: "blue",
    title: "Data Pipeline",
    desc: "흩어진 문서, 시트, 폼 데이터를 표준화된 파이프라인으로 연결해 취합부터 검증까지 자동화합니다.",
  },
  {
    id: 1,
    phase: "Roadmap 02",
    icon: ShieldCheck,
    color: "purple",
    title: "AI Agent",
    desc: "정형 보고를 넘어 요약, 검토, 이상 징후 탐지까지 돕는 AI 기반 업무 에이전트를 단계적으로 도입합니다.",
  },
  {
    id: 2,
    phase: "Roadmap 03",
    icon: Rocket,
    color: "green",
    title: "Integration",
    desc: "ERP, 외부 금융 API, 사내 협업 도구를 하나의 흐름으로 묶어 데이터 정합성과 실시간성을 높입니다.",
  },
  {
    id: 3,
    phase: "Roadmap 04",
    icon: Bot,
    color: "orange",
    title: "Auto-reporting",
    desc: "데이터 취합 이후의 보고서 생성과 배포까지 이어지는 완전 자동 리포팅 체계를 구축합니다.",
  },
];

const COLOR_MAP = {
  blue:   { badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",   active: "border-blue-500/60 bg-blue-900/20",   glow: "#3b82f6" },
  purple: { badge: "bg-purple-500/20 text-purple-300 border-purple-500/30", active: "border-purple-500/60 bg-purple-900/20", glow: "#a855f7" },
  green:  { badge: "bg-green-500/20 text-green-300 border-green-500/30",   active: "border-green-500/60 bg-green-900/20",   glow: "#22c55e" },
  orange: { badge: "bg-orange-500/20 text-orange-300 border-orange-500/30", active: "border-orange-500/60 bg-orange-900/20", glow: "#f97316" },
};

/* =============================================
   CARD ITEM
   ============================================= */
const CardItem = ({ card, isActive }) => {
  const cm = COLOR_MAP[card.color];
  const Icon = card.icon;
  return (
    <motion.div
      className={`border rounded-2xl p-5 md:p-6 shadow-xl transition-all duration-500 ease-in-out relative overflow-hidden cursor-default ${
        isActive
          ? `${cm.active} scale-[1.02] border-opacity-60`
          : "bg-white/5 border-white/10 hover:bg-white/8"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="roadmapCardHighlight"
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${cm.glow}18 0%, transparent 70%)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
      <div className="relative z-10 flex items-center gap-3 mb-3">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${cm.badge}`}>
          <Icon size={12} />
          <span>{card.phase}</span>
        </div>
      </div>
      <h3 className="relative z-10 text-lg md:text-xl font-bold text-white mb-2">{card.title}</h3>
      <p className="relative z-10 text-sm leading-relaxed text-white/70 break-keep">{card.desc}</p>
    </motion.div>
  );
};

/* =============================================
   SCENES (우측 애니메이션)
   ============================================= */

// Scene 1: Data Pipeline — 3개 소스가 하나의 파이프로 모이는 플로우
const Scene1 = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
  >
    {/* Ambient */}
    <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="pipe-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="pipe-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="pipe-grad-3" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="pipe-out" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Base lines */}
      <line x1="100" y1="80" x2="200" y2="200" stroke="#60a5fa" strokeWidth="3" strokeOpacity="0.2" />
      <line x1="200" y1="80" x2="200" y2="200" stroke="#34d399" strokeWidth="3" strokeOpacity="0.2" />
      <line x1="300" y1="80" x2="200" y2="200" stroke="#a78bfa" strokeWidth="3" strokeOpacity="0.2" />
      <line x1="200" y1="200" x2="200" y2="330" stroke="#22d3ee" strokeWidth="8" strokeOpacity="0.15" strokeLinecap="round" />
      {/* Animated flows */}
      {[
        { x1: 100, y1: 80, x2: 200, y2: 200, color: "#60a5fa", dur: 1.0 },
        { x1: 200, y1: 80, x2: 200, y2: 200, color: "#34d399", dur: 1.3 },
        { x1: 300, y1: 80, x2: 200, y2: 200, color: "#a78bfa", dur: 0.9 },
      ].map((l, i) => (
        <motion.line key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={l.color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray="8 20"
          animate={{ strokeDashoffset: -28 }}
          transition={{ duration: l.dur, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <motion.line x1="200" y1="200" x2="200" y2="330"
        stroke="#22d3ee" strokeWidth="6" strokeLinecap="round"
        strokeDasharray="14 28"
        animate={{ strokeDashoffset: -42 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </svg>

    {/* Source nodes */}
    {[
      { label: "Sheets", Icon: FileSpreadsheet, color: "text-green-400", bg: "bg-green-500/10 border-green-500/30", left: "25%", top: "20%" },
      { label: "Forms",  Icon: GitMerge,        color: "text-blue-400",  bg: "bg-blue-500/10 border-blue-500/30",  left: "50%", top: "20%" },
      { label: "Docs",   Icon: FileText,         color: "text-purple-400",bg: "bg-purple-500/10 border-purple-500/30",left:"75%",top:"20%"},
    ].map((n, i) => (
      <motion.div key={i}
        className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5`}
        style={{ left: n.left, top: n.top }}
        animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
        transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`w-12 h-12 ${n.bg} border rounded-xl flex items-center justify-center backdrop-blur-md`}>
          <n.Icon className={n.color} size={22} />
        </div>
        <span className="text-[10px] font-bold text-white/50">{n.label}</span>
      </motion.div>
    ))}

    {/* Central hub */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 -m-5 rounded-xl border border-dashed border-blue-500/30"
      />
      <div className="w-16 h-16 bg-slate-900 border-2 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.3)] rounded-2xl flex items-center justify-center">
        <motion.div animate={{ rotate: 180 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
          <Settings className="text-blue-400" size={28} strokeWidth={1.5} />
        </motion.div>
      </div>
    </div>

    {/* Output dashboard */}
    <div className="absolute left-1/2 top-[78%] -translate-x-1/2 -translate-y-1/2">
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="w-44 bg-[#1a1f35] border border-blue-500/20 rounded-xl p-2.5 shadow-2xl flex flex-col gap-2"
      >
        <div className="flex justify-between items-center border-b border-indigo-500/20 pb-1.5">
          <div className="flex gap-1">
            {["bg-red-400/70","bg-yellow-400/70","bg-green-400/70"].map((c,i)=><div key={i} className={`w-1.5 h-1.5 rounded-full ${c}`}/>)}
          </div>
          <Cpu className="text-blue-400/50" size={12} />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-slate-800/50 rounded p-1.5 border border-slate-700/50 flex flex-col items-center">
            <Activity className="text-emerald-400 mb-0.5" size={13} />
            <motion.div className="text-[9px] font-black text-emerald-300"
              animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>+46%</motion.div>
          </div>
          <div className="bg-slate-800/50 rounded p-1.5 border border-slate-700/50 flex flex-col items-center">
            <PieChart className="text-purple-400 mb-0.5" size={13} />
            <div className="text-[9px] font-black text-purple-300">377</div>
          </div>
        </div>
        <div className="w-full h-8 bg-blue-900/10 border border-blue-500/20 rounded overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M0 30 L0 20 L15 15 L30 22 L45 8 L60 14 L75 4 L90 10 L100 6 L100 30 Z" fill="#3b82f610" />
            <path d="M0 20 L15 15 L30 22 L45 8 L60 14 L75 4 L90 10 L100 6" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
          </svg>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Scene 2: AI Agent — 데이터 흐름 + AI 분석 신호
const Scene2 = () => {
  const signals = Array.from({ length: 12 }).map((_, i) => ({
    id: i, angle: (i / 12) * Math.PI * 2,
    r: 70 + Math.random() * 30, delay: Math.random() * 2
  }));
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
      <div className="relative w-60 h-60 flex items-center justify-center">
        {/* Rotating rings */}
        {[80, 100, 120].map((r, i) => (
          <motion.div key={i}
            className="absolute rounded-full border border-purple-500/20"
            style={{ width: r * 2, height: r * 2 }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 10 + i * 4, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {/* Signal dots orbiting */}
        {signals.map((s) => {
          const cx = Math.cos(s.angle) * s.r;
          const cy = Math.sin(s.angle) * s.r;
          return (
            <motion.div key={s.id}
              className="absolute w-1.5 h-1.5 rounded-full bg-purple-400"
              style={{ left: `calc(50% + ${cx}px)`, top: `calc(50% + ${cy}px)` }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: s.delay }}
            />
          );
        })}
        {/* Central AI brain */}
        <div className="w-24 h-24 bg-slate-900 border-2 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.4)] rounded-3xl flex flex-col items-center justify-center gap-1 z-10">
          <Sparkles className="text-purple-400" size={28} />
          <span className="text-[9px] font-black text-purple-300 tracking-widest">AI AGENT</span>
        </div>
        {/* Output badges */}
        {[
          { label: "요약", top: "8%", left: "60%", color: "text-purple-300 border-purple-500/30" },
          { label: "검토", top: "75%", left: "60%", color: "text-violet-300 border-violet-500/30" },
          { label: "탐지", top: "45%", left: "5%",  color: "text-fuchsia-300 border-fuchsia-500/30" },
        ].map((b, i) => (
          <motion.div key={i}
            className={`absolute px-2.5 py-1 text-[10px] font-bold border rounded-full bg-slate-900/80 backdrop-blur-sm ${b.color}`}
            style={{ top: b.top, left: b.left }}
            animate={{ opacity: [0.5, 1, 0.5], y: [2, -2, 2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
          >
            {b.label}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Scene 3: Integration — ERP / API / 협업도구 연결망
const Scene3 = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
  >
    <div className="absolute w-72 h-72 bg-emerald-500/8 rounded-full blur-[100px]" />
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
      {/* Network mesh lines */}
      {[
        [100, 120, 200, 200], [300, 100, 200, 200], [100, 300, 200, 200],
        [300, 300, 200, 200], [200, 80,  200, 200], [200, 320, 200, 200],
      ].map(([x1,y1,x2,y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.15" />
          <motion.circle r="3" fill="#22c55e" fillOpacity="0.8"
            animate={{
              cx: [x1, x2], cy: [y1, y2],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
          />
        </g>
      ))}
    </svg>

    {/* Nodes */}
    {[
      { label: "ERP",      Icon: Server,   color: "text-green-400",  bg: "bg-green-500/10 border-green-500/30",   left: "25%", top: "30%"  },
      { label: "Finance API", Icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", left: "75%", top: "25%" },
      { label: "Slack",    Icon: Network,  color: "text-teal-400",   bg: "bg-teal-500/10 border-teal-500/30",     left: "25%", top: "75%"  },
      { label: "Drive",    Icon: Cloud,    color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/30",     left: "75%", top: "75%"  },
    ].map((n, i) => (
      <motion.div key={i}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
        style={{ left: n.left, top: n.top }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`w-11 h-11 ${n.bg} border rounded-xl flex items-center justify-center backdrop-blur-md`}>
          <n.Icon className={n.color} size={20} />
        </div>
        <span className="text-[9px] font-bold text-white/40">{n.label}</span>
      </motion.div>
    ))}

    {/* Center hub */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-4 rounded-full border border-dashed border-green-500/25"
      />
      <div className="w-16 h-16 bg-slate-900 border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)] rounded-2xl flex items-center justify-center">
        <Workflow className="text-green-400" size={26} />
      </div>
    </div>

    {/* Connected badge */}
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-green-900/40 border border-green-500/30 rounded-full"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <CheckCircle2 className="text-green-400" size={14} />
      <span className="text-[11px] font-bold text-green-300">All Systems Connected</span>
    </motion.div>
  </motion.div>
);

// Scene 4: Auto-reporting — 자동 리포트 생성 흐름
const Scene4 = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="absolute inset-0 w-full h-full pointer-events-none flex flex-col items-center justify-center gap-6 overflow-hidden px-8"
  >
    <div className="absolute w-72 h-72 bg-orange-500/8 rounded-full blur-[100px]" />
    {/* Report generation flow */}
    <div className="relative z-10 w-full max-w-xs flex flex-col gap-3">
      {[
        { label: "데이터 취합", icon: Database, color: "text-blue-400 border-blue-500/30 bg-blue-500/10", done: true  },
        { label: "보고서 생성", icon: FileText,  color: "text-orange-400 border-orange-500/30 bg-orange-500/10", done: true  },
        { label: "검증 & 포맷", icon: CheckCircle2, color: "text-green-400 border-green-500/30 bg-green-500/10", done: true  },
        { label: "자동 배포",   icon: Rocket,   color: "text-purple-400 border-purple-500/30 bg-purple-500/10", done: false },
      ].map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div key={i}
            className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${step.color}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <Icon size={18} />
            <span className="text-sm font-bold text-white/80">{step.label}</span>
            {step.done ? (
              <motion.div className="ml-auto" animate={{ scale: [0.9, 1.1, 1] }} transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}>
                <CheckCircle2 className="text-green-400" size={16} />
              </motion.div>
            ) : (
              <motion.div className="ml-auto w-3 h-3 rounded-full bg-orange-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.div>
        );
      })}
    </div>

    {/* Completion badge */}
    <motion.div
      className="relative z-10 flex items-center gap-2.5 px-5 py-2.5 bg-orange-900/30 border border-orange-500/30 rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Bot className="text-orange-400" size={16} />
      <span className="text-[12px] font-bold text-orange-300">Weekly Report 자동 전송 완료</span>
    </motion.div>
  </motion.div>
);

/* =============================================
   MAIN: Roadmap
   ============================================= */
const SCENES = [Scene1, Scene2, Scene3, Scene4];
const THRESHOLDS = [0.0625, 0.125, 0.1875]; // 0~0.25 구간을 4등분

const Roadmap = ({ progress }) => {
  const [activeCard, setActiveCard] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    // Phase5 progress 0~0.25 구간이 Roadmap 표시 구간
    // 그 안에서 4등분해 activeCard 결정
    if (v < THRESHOLDS[0]) setActiveCard(0);
    else if (v < THRESHOLDS[1]) setActiveCard(1);
    else if (v < THRESHOLDS[2]) setActiveCard(2);
    else setActiveCard(3);
  });

  const ActiveScene = SCENES[activeCard];

  return (
    <section className="h-full w-full flex flex-col justify-center relative overflow-hidden bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col h-full justify-center">

        {/* ── 상단 카피 ── */}
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3">
            우리가 그리는 <span className="text-white/80">내일</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 font-medium">
            재무 업무효율화 TF는 지속 가능한 자동화 체계를 만들어갑니다.
          </p>
        </div>

        {/* ── 본문: 좌측 카드 + 우측 애니메이션 ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

          {/* 좌측: 카드 목록 */}
          <div className="flex-1 flex flex-col gap-4 w-full max-w-lg">
            {CARDS.map((card) => (
              <CardItem key={card.id} card={card} isActive={activeCard === card.id} />
            ))}
          </div>

          {/* 우측: 동적 애니메이션 */}
          <div className="flex-1 w-full max-w-xl aspect-[4/3] relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-transparent to-slate-900/40 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <ActiveScene key={activeCard} />
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Roadmap;
