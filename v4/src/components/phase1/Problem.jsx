import { motion, useTransform } from 'framer-motion';
import { FileSpreadsheet, FileText, Presentation } from 'lucide-react';

const SHEET_TITLES = [
  '계정과목_분류.xlsx', '2023_PL_최종.xlsx', 'CF_시뮬레이션.xlsx', 'FCF_추정.xlsx', 
  '월별_매출원가.xlsx', '판관비_내역.xlsx', '영업이익_분석.xlsx', '재무지표_요약.xlsx', 
  '예산_실적_대비.xlsx', '부서별_비용합산_v2.xlsx', '마감_데이터_취합.xlsx',
  '손익계산서_Draft.xlsx', '재무상태표_업데이트.xlsx', '현금흐름표_월별.xlsx'
];

const DOC_TITLES = [
  '제2데이터센터 구축_주간 보고.docx',
  '제주 부지 개발_월간 보고.docx',
  '시너지지원_Weekly Report.docx',
  '공동체CFO_회의록_12주차.docx'
];

const PPT_TITLES = [
  '위고비 플랫폼 아키텍처.pptx', 
  '2024 경영전략 보고.pptx', 
  '신규 서비스 기획안.pptx', 
  '하반기 마케팅 플랜.pptx', 
  '고객사 대상 제안서_v3.pptx', 
  '투자유치 IR 자료.pptx', 
  '서비스 개선 성과보고.pptx', 
  '전사 타운홀 미팅 자료.pptx'
];

const ELEMENT_CONFIGS = [];

// Seeded random for stable rendering across re-renders
let seed = 42;
function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate positions on a grid to ensure even distribution
const positions = [];
const cols = 8;
const rows = 5;
const cellWidth = 110 / cols; // Spread from -5% to 105%
const cellHeight = 130 / rows; // Spread from -10% to 120%

for (let i = 0; i < 40; i++) {
  const col = i % cols;
  const row = Math.floor(i / cols);
  
  // Add some random jitter inside the cell
  const jitterX = (random() - 0.5) * (cellWidth * 0.8);
  const jitterY = (random() - 0.5) * (cellHeight * 0.8);
  
  const left = -5 + (col * cellWidth) + (cellWidth / 2) + jitterX;
  const top = -10 + (row * cellHeight) + (cellHeight / 2) + jitterY;
  
  positions.push({ left, top });
}

// Shuffle positions
for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
}

// 4 Doc Windows
for (let i = 0; i < 4; i++) {
  const pos = positions[i];
  ELEMENT_CONFIGS.push({
    id: `doc-${i}`,
    type: 'doc',
    title: DOC_TITLES[i],
    top: pos.top,
    left: pos.left,
    rot: (random() - 0.5) * 60,
    delay: random() * 4,
    scale: 0.7 + random() * 0.5,
    speed: 0.8 + random() * 1.5,
    baseOpacity: 0.7 + random() * 0.3,
    zIndex: Math.floor(random() * 5),
  });
}

// 20 Sheet Windows
for (let i = 4; i < 24; i++) {
  const pos = positions[i];
  ELEMENT_CONFIGS.push({
    id: `sheet-${i}`,
    type: 'sheet',
    title: SHEET_TITLES[Math.floor(random() * SHEET_TITLES.length)],
    top: pos.top,
    left: pos.left,
    rot: (random() - 0.5) * 60,
    delay: random() * 4,
    scale: 0.6 + random() * 0.6,
    speed: 0.8 + random() * 1.5,
    baseOpacity: 0.7 + random() * 0.3,
    zIndex: Math.floor(random() * 5),
  });
}

// 8 PPT Windows
for (let i = 24; i < 32; i++) {
  const pos = positions[i];
  ELEMENT_CONFIGS.push({
    id: `ppt-${i}`,
    type: 'ppt',
    title: PPT_TITLES[Math.floor(random() * PPT_TITLES.length)],
    top: pos.top,
    left: pos.left,
    rot: (random() - 0.5) * 60,
    delay: random() * 4,
    scale: 0.6 + random() * 0.5,
    speed: 0.8 + random() * 1.5,
    baseOpacity: 0.7 + random() * 0.3,
    zIndex: Math.floor(random() * 5),
  });
}

const TypingLine = ({ width, delay = 0, color = 'bg-slate-400/80' }) => (
  <div className="flex items-center gap-1.5">
    <motion.div
      className={`h-4 rounded-full ${color}`}
      initial={{ width: 0, opacity: 0.4 }}
      animate={{ width, opacity: 1 }}
      transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 2.4, repeatType: 'mirror' }}
    />
  </div>
);

const CounterChip = ({ label, value, delay, tint = 'text-sky-600' }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</div>
    <div className={`mt-1 text-lg font-black ${tint}`}>
      <motion.span
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.65, 1, 0.75] }}
        transition={{ duration: 1.8, delay, repeat: Infinity, repeatType: 'reverse' }}
      >
        {value}
      </motion.span>
    </div>
  </div>
);

const DocumentWindow = ({ title, delay }) => (
  <div className="w-64 h-[22rem] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200/50">
    <div className="bg-[#2B579A] py-2 px-3 flex items-center gap-2">
      <FileText size={16} className="text-white" />
      <span className="text-white text-sm font-semibold truncate drop-shadow-sm">{title}</span>
    </div>
    <div className="p-5 flex-1 flex flex-col gap-4 bg-white">
      <motion.div
        className="h-6 bg-slate-700 rounded-md mb-2"
        initial={{ width: 0 }}
        animate={{ width: '82%' }}
        transition={{ duration: 1, delay, repeat: Infinity, repeatDelay: 2.4, repeatType: 'mirror' }}
      />
      <TypingLine width="100%" delay={delay + 0.15} />
      <TypingLine width="92%" delay={delay + 0.3} />
      <TypingLine width="76%" delay={delay + 0.45} />
      <div className="flex items-center gap-1.5">
        <TypingLine width="36%" delay={delay + 0.6} color="bg-slate-300" />
        <motion.div
          className="h-4 w-[2px] bg-[#2B579A]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: delay + 0.8 }}
        />
      </div>

      <div className="w-full h-px bg-slate-200 my-2"></div>

      <div className="grid grid-cols-2 gap-2">
        <CounterChip label="수정 행" value="128" delay={delay + 0.15} />
        <CounterChip label="오류값" value="07" delay={delay + 0.3} tint="text-rose-500" />
      </div>

      <motion.div
        className="w-full h-16 rounded-xl bg-gradient-to-r from-blue-50 to-slate-100 p-3 flex items-end gap-2"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay, repeat: Infinity, repeatType: 'mirror' }}
      >
        {[40, 75, 56, 88].map((height, idx) => (
          <motion.div
            key={idx}
            className="flex-1 rounded-t-md bg-[#2B579A]/75"
            style={{ originY: 1 }}
            animate={{ scaleY: [0.35, height / 100, 0.45] }}
            transition={{ duration: 1.8 + idx * 0.15, delay: delay + idx * 0.08, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}
      </motion.div>
    </div>
  </div>
);

const SpreadsheetWindow = ({ title, delay }) => (
  <div className="w-80 h-56 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200/50">
    <div className="bg-[#107C41] py-2 px-3 flex items-center gap-2">
      <FileSpreadsheet size={16} className="text-white" />
      <span className="text-white text-sm font-semibold truncate drop-shadow-sm">{title}</span>
    </div>
    <div className="p-2 flex-1 flex flex-col gap-2 bg-slate-50">
       <div className="flex gap-2 mb-1 px-1">
         <div className="w-5 h-5 rounded bg-slate-200"></div>
         <div className="w-5 h-5 rounded bg-slate-200"></div>
         <div className="w-16 h-5 rounded bg-slate-200"></div>
         <div className="w-24 h-5 rounded bg-slate-200 ml-auto"></div>
       </div>
       <div className="relative grid grid-cols-6 gap-[1px] bg-slate-300 border border-slate-300 flex-1 rounded-sm overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="relative bg-white min-h-[14px] flex items-center justify-center p-[2px] overflow-hidden">
               {(i % 7 === 0 || i % 5 === 0) && (
                <motion.div
                  className="h-1/2 bg-slate-200 rounded-[1px]"
                  initial={{ width: 0 }}
                  animate={{ width: ['0%', '76%', '40%'] }}
                  transition={{ duration: 1.4, delay: delay + (i % 6) * 0.06, repeat: Infinity, repeatDelay: 1.8 }}
                />
               )}
               {i % 4 === 0 && (
                <motion.div
                  className="absolute inset-y-[2px] left-[2px] rounded-[1px] bg-green-100"
                  initial={{ width: 0 }}
                  animate={{ width: ['0%', '48%', '28%'] }}
                  transition={{ duration: 1.2, delay: delay + (i % 5) * 0.05, repeat: Infinity, repeatDelay: 2.2 }}
                />
               )}
            </div>
          ))}
          <motion.div
            className="pointer-events-none absolute z-10 rounded-[2px] border-2 border-[#107C41] bg-[#107C41]/10"
            style={{ width: 'calc(16.666% - 1px)', height: 'calc(20% - 1px)' }}
            animate={{
              x: ['0%', '100%', '200%', '200%', '100%', '0%'],
              y: ['0%', '0%', '0%', '100%', '100%', '200%'],
            }}
            transition={{
              duration: 5.4,
              delay: delay + 0.3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
       </div>
       <div className="grid grid-cols-4 gap-2 pt-1">
        {[68, 44, 83, 58].map((height, idx) => (
          <div key={idx} className="h-9 rounded-md bg-white border border-slate-200 p-1.5 flex items-end">
            <motion.div
              className="w-full rounded-sm bg-[#107C41]/80"
              style={{ originY: 1 }}
              animate={{ scaleY: [0.25, height / 100, 0.35] }}
              transition={{ duration: 1.5 + idx * 0.15, delay: delay + 0.25 + idx * 0.1, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>
        ))}
       </div>
    </div>
  </div>
);

const PresentationWindow = ({ title, delay }) => (
  <div className="w-80 h-48 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200/50">
    <div className="bg-[#F4B400] py-2 px-3 flex items-center gap-2">
      <Presentation size={16} className="text-white" />
      <span className="text-white text-sm font-semibold truncate drop-shadow-sm">{title}</span>
    </div>
    <div className="p-2 flex-1 flex gap-2 bg-slate-100">
       <div className="w-16 flex flex-col gap-2 border-r border-slate-200 pr-2">
          <div className="w-full h-8 bg-slate-300 rounded-sm"></div>
          <div className="w-full h-8 bg-white border border-slate-300 rounded-sm ring-2 ring-[#F4B400]"></div>
          <div className="w-full h-8 bg-slate-300 rounded-sm"></div>
       </div>
       <div className="flex-1 bg-white border border-slate-200 shadow-sm rounded-sm flex flex-col p-4">
          <motion.div
            className="h-3 bg-slate-700 rounded-sm mb-4"
            initial={{ width: 0 }}
            animate={{ width: ['0%', '74%', '74%'] }}
            transition={{ duration: 0.9, delay, repeat: Infinity, repeatDelay: 2.1 }}
          />
          <div className="flex-1 grid grid-cols-[1fr_1.1fr] gap-3">
            <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 p-3">
              <div className="relative h-16 w-16">
                <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="#E2E8F0" strokeWidth="5" />
                  <motion.circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="none"
                    stroke="#F4B400"
                    strokeWidth="5"
                    strokeDasharray="100"
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: [72, 34, 58] }}
                    transition={{ duration: 3.2, delay: delay + 0.2, repeat: Infinity, repeatType: 'reverse' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-slate-700">62%</div>
              </div>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Completion</div>
            </div>
            <div className="flex flex-col">
              <div className="flex-1 rounded-xl bg-slate-50 p-3">
                <svg viewBox="0 0 120 56" className="h-full w-full">
                  <motion.path
                    d="M6 42 C20 30, 30 36, 42 28 C56 18, 66 24, 78 14 C90 4, 102 16, 114 10"
                    fill="none"
                    stroke="#F4B400"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0.2, 1, 0.7] }}
                    transition={{ duration: 2.8, delay: delay + 0.2, repeat: Infinity, repeatType: 'reverse' }}
                  />
                  {[42, 28, 14, 10].map((y, idx) => (
                    <motion.circle
                      key={idx}
                      cx={[6, 42, 78, 114][idx]}
                      cy={y}
                      r="3.5"
                      fill="#F4B400"
                      animate={{ scale: [0.8, 1.15, 0.8] }}
                      transition={{ duration: 1.4, delay: delay + idx * 0.18, repeat: Infinity }}
                    />
                  ))}
                </svg>
              </div>
              <motion.div
                className="mt-3 h-2 rounded-full bg-slate-300"
                initial={{ width: '18%' }}
                animate={{ width: ['18%', '82%', '35%'] }}
                transition={{ duration: 2, delay: delay + 0.35, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
          </div>
       </div>
    </div>
  </div>
);

const FloatingWindow = ({ config, progress }) => {
  const yDirection = -250;
  
  const y = useTransform(progress, [0, 0.33], [0, yDirection * config.speed]);
  const opacity = useTransform(progress, [0, 0.15, 0.33], [config.baseOpacity, config.baseOpacity, 0]);
  
  const animateConfig = {
    y: ["-10px", "10px"],
    rotate: [config.rot - 2, config.rot + 2],
  };

  const transitionConfig = {
    duration: 4 + config.delay, 
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay: config.delay, 
  };

  return (
    <motion.div
      className="absolute"
      style={{
        top: `${config.top}%`,
        left: `${config.left}%`,
        y,
        opacity,
        rotate: config.rot,
        scale: config.scale,
        zIndex: config.zIndex,
      }}
      animate={animateConfig}
      transition={transitionConfig}
    >
      {config.type === 'doc' && <DocumentWindow title={config.title} delay={config.delay} />}
      {config.type === 'sheet' && <SpreadsheetWindow title={config.title} delay={config.delay} />}
      {config.type === 'ppt' && <PresentationWindow title={config.title} delay={config.delay} />}
    </motion.div>
  );
};

const Problem = ({ progress }) => {
  const sectionOpacity = useTransform(progress, [0, 0.3, 0.33], [1, 1, 0]);
  const pointerEvents = useTransform(progress, (v) => v > 0.33 ? "none" : "auto");

  const titleOpacity = useTransform(progress, [0, 0.15, 0.25, 0.33], [0, 1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.15, 0.33], [50, 0, -50]);

  return (
    <motion.section 
      style={{ opacity: sectionOpacity, pointerEvents }}
      className="absolute inset-0 w-full flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Floating Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {ELEMENT_CONFIGS.map((config) => (
          <FloatingWindow key={config.id} config={config} progress={progress} />
        ))}
      </div>

      <motion.div 
        style={{ opacity: titleOpacity, y: titleY }}
        className="z-10 text-center px-6 max-w-4xl backdrop-blur-md bg-black/60 p-12 rounded-3xl border border-white/10 drop-shadow-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight text-white/90 break-keep">
          수십 개의 작업 파일,<br/>
          끝나지 않는 복붙,<br/>
          데이터는 넘쳐나지만<br/>
          <span className="text-red-500/90 italic drop-shadow-lg drop-shadow-red-500/20">정작 분석할 시간이 없는 우리.</span>
        </h1>
      </motion.div>
    </motion.section>
  );
};

export default Problem;
