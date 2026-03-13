import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, CheckCircle2, FileSpreadsheet, FileText, MessageSquare, MousePointer2, Presentation, Zap } from 'lucide-react';

/* ====================================
   1. Input Step Components
   ==================================== */
const TypingDoc = ({ title, caption, color, idx, posClass, zIndex, scrollYProgress, icon: Icon }) => {
  // Input animation bounds: 0.15 to 0.35 range
  const start = 0.12 + idx * 0.03;
  const end = 0.28 + idx * 0.03;

  const yPos = useTransform(scrollYProgress, [start - 0.05, start], [50, 0]);
  const docOpacity = useTransform(scrollYProgress, [start - 0.05, start], [0, 1]);

  const titleWidth = useTransform(scrollYProgress, [start, end - 0.05], ["0%", "60%"]);
  const line1Width = useTransform(scrollYProgress, [start + 0.03, end], ["0%", "95%"]);
  const line2Width = useTransform(scrollYProgress, [start + 0.06, end + 0.03], ["0%", "85%"]);
  const line3Width = useTransform(scrollYProgress, [start + 0.09, end + 0.06], ["0%", "65%"]);

  return (
    <motion.div 
      style={{ opacity: docOpacity, y: yPos }}
      className={`absolute ${posClass} w-64 bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden ${zIndex}`}
    >
      <div className={`${color} px-3 py-2 text-white text-xs font-bold flex items-center gap-2 shadow-sm`}>
        <Icon size={14} />
        {title}
      </div>
      <div className="p-4 space-y-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{caption}</div>
        <div className="flex gap-2 items-center">
          <motion.div style={{ width: titleWidth }} className="h-3 bg-slate-700 rounded" />
        </div>
        <div className="space-y-2 mt-3">
          <motion.div style={{ width: line1Width }} className="h-2 bg-slate-400 rounded" />
          <motion.div style={{ width: line2Width }} className="h-2 bg-slate-400 rounded" />
          <div className="flex items-center h-2">
            <motion.div style={{ width: line3Width }} className="h-2 bg-slate-400 rounded-s" />
            <motion.div 
              className="h-3 w-[2px] bg-blue-500 ml-[2px]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ====================================
   2. Magic Step Components
   ==================================== */
const FlyingDoc = ({ doc, scrollYProgress, mergeStart, mergeEnd }) => {
  // Flying animation bounds
  const x = useTransform(scrollYProgress, [mergeStart, mergeEnd - 0.02], [doc.startX, 0]);
  const y = useTransform(scrollYProgress, [mergeStart, mergeEnd - 0.02], [doc.startY, 0]);
  const scale = useTransform(scrollYProgress, [mergeStart, mergeEnd - 0.04, mergeEnd], [1, 0.5, 0]);
  const opacity = useTransform(scrollYProgress, [mergeStart, mergeEnd - 0.04, mergeEnd - 0.01], [1, 1, 0]);

  return (
    <motion.div
      className={`absolute flex items-center justify-center w-12 h-16 ${doc.bg} ${doc.border} border rounded shadow-md z-20`}
      style={{ x, y, scale, opacity }}
    >
      <FileText className={doc.color} size={20} />
    </motion.div>
  );
};

/* ====================================
   3. Output Step Components
   ==================================== */


/* ====================================
   MAIN COMPONENT: Phase3
   ==================================== */
const Phase3 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // ========== OVERALL FADE ==========
  const sectionOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.9, 0.95], [0, 1, 1, 0]);


  // ========== STEP 1: INPUT ==========
  // Visible: 0.1 to 0.32, fade out 0.32 to 0.38
  const inputOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.32, 0.38], [0, 1, 1, 0]);
  const inputY = useTransform(scrollYProgress, [0.1, 0.15], [50, 0]);

  const inputDocs = [
    { title: "현장 운영 폼 응답", caption: "Google Forms", icon: MessageSquare, color: "bg-emerald-500", idx: 0, posClass: "top-0 left-0", zIndex: "z-10" },
    { title: "매출 집계 시트", caption: "Google Sheets", icon: FileSpreadsheet, color: "bg-green-600", idx: 1, posClass: "top-12 left-8", zIndex: "z-20" },
    { title: "비용 정산 시트", caption: "Google Sheets", icon: FileSpreadsheet, color: "bg-blue-600", idx: 2, posClass: "top-24 left-16", zIndex: "z-30" },
    { title: "주간 보고 슬라이드 초안", caption: "Google Slides", icon: Presentation, color: "bg-amber-500", idx: 3, posClass: "top-36 left-24", zIndex: "z-40" },
  ];


  // ========== STEP 2: MAGIC ==========
  // Visible: 0.32 to 0.62, fade in 0.32-0.38, fade out 0.62-0.68
  const magicOpacity = useTransform(scrollYProgress, [0.32, 0.38, 0.62, 0.68], [0, 1, 1, 0]);
  
  const sourceDocs = [
    { color: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-200", startX: -250, startY: -100 },
    { color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-200", startX: 250, startY: -50 },
    { color: "text-violet-600", bg: "bg-violet-100", border: "border-violet-200", startX: -200, startY: 150 },
    { color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200", startX: 200, startY: 100 },
  ];

  // Mouse Transform (0.38 -> 0.44 mouse moves to button)
  const mouseX = useTransform(scrollYProgress, [0.38, 0.44], [100, 135]);
  const mouseY = useTransform(scrollYProgress, [0.38, 0.44], [180, -95]);
  const mouseScale = useTransform(scrollYProgress, [0.44, 0.45, 0.46], [1, 0.8, 1]);
  
  // Button Scale and Color 
  const btnScale = useTransform(scrollYProgress, [0.44, 0.45, 0.46], [1, 0.95, 1]);
  const btnColor = useTransform(scrollYProgress, [0.55, 0.56], ["#8b5cf6", "#10b981"]);

  // Loading Ring & Icons opacity
  const ringOpacity = useTransform(scrollYProgress, [0.45, 0.46, 0.54, 0.55], [0, 1, 1, 0]);
  const zapOpacity = useTransform(scrollYProgress, [0.45, 0.46], [1, 0]);
  const checkOpacity = useTransform(scrollYProgress, [0.55, 0.56], [0, 1]);

  // Data gathering progress line bars fade in
  const dataGatheringProgress = useTransform(scrollYProgress, [0.57, 0.61], [0, 1]);


  // ========== STEP 3: OUTPUT ==========
  // Visible: 0.62 to 0.9, fade in 0.62-0.68
  const outputOpacity = useTransform(scrollYProgress, [0.62, 0.68, 0.9], [0, 1, 1]);
  const outputScale = useTransform(scrollYProgress, [0.62, 0.68], [0.95, 1]);

  // Dashboard charts grow
  const chartProgress = useTransform(scrollYProgress, [0.68, 0.80], [0, 1]);

  // Slack Notification popup timing (0.80 to 0.85)
  const popupY = useTransform(scrollYProgress, [0.80, 0.85], [30, 0]);
  const popupOpacity = useTransform(scrollYProgress, [0.80, 0.85], [0, 1]);


  return (
    // Extremely tall section to allow 3 phases to scroll smoothly
    <section ref={ref} className="h-[600vh] bg-white relative w-full">
      <motion.div 
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        
        {/* ==================== LAYER 1 (INPUT) ==================== */}
        <motion.div 
          style={{ opacity: inputOpacity, y: inputY, pointerEvents: "none" }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-10 px-6 max-w-7xl mx-auto"
        >
          {/* Left Copy Area */}
          <div className="z-10 text-left max-w-xl md:w-1/2">
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase block mb-4">Step 1. Data Input</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
              더 이상 이메일로<br/>
              주고받을 필요가 없습니다.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              각 부서가 쓰는 구글 폼, 시트, 문서 조각은 그대로 둔 채 필요한 데이터만 자동으로 모읍니다.
              사람은 입력에만 집중하고, 취합 경로는 더 이상 기억할 필요가 없습니다.
            </p>
          </div>

          {/* Right Animation Area */}
          <div className="relative w-full md:w-1/2 h-96 flex items-center justify-center perspective-[1000px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-44 w-44 rounded-full bg-gradient-to-br from-blue-500/10 to-emerald-400/10 blur-3xl" />
            </div>
            <div className="relative w-full max-w-sm h-[320px]">
              {inputDocs.map((doc, idx) => (
                <TypingDoc key={idx} {...doc} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
        </motion.div>


        {/* ==================== LAYER 2 (MAGIC) ==================== */}
        <motion.div 
          style={{ opacity: magicOpacity, pointerEvents: "none" }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-10 px-6 max-w-7xl mx-auto"
        >
          <div className="z-10 text-left max-w-xl md:w-1/2">
            <span className="text-purple-600 font-bold tracking-wider text-sm uppercase block mb-4">Step 2. Automation Magic</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6 break-keep">
              흩어진 데이터 조각이<br/>
              하나의 <span className="text-purple-600">마스터 뷰</span>로 모입니다.
            </h2>
            <p className="text-lg text-slate-600">
              앱스크립트가 파일 위치를 추적하고, 양식을 맞추고, 검증 규칙을 통과시켜 하나의 파일로 통합합니다.
            </p>
          </div>

          <div className="relative w-full md:w-1/2 h-96 flex items-center justify-center pointer-events-none">
            {/* Master Sheet UI */}
            <div className="absolute w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-10">
              <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                <div className="font-bold text-slate-700 text-sm">경영기획 주간보고서_마스터</div>
                <motion.div 
                  style={{
                    scale: btnScale,
                    backgroundColor: btnColor
                  }}
                  className="px-3 py-1.5 rounded-md text-white text-xs font-bold flex items-center shadow-sm"
                >
                  <div className="relative w-4 h-4 mr-1 flex items-center justify-center">
                    <motion.div style={{ opacity: zapOpacity }} className="absolute">
                      <Zap size={14} />
                    </motion.div>
                    <motion.div style={{ opacity: ringOpacity }} className="absolute">
                      <div className="w-[14px] h-[14px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </motion.div>
                    <motion.div style={{ opacity: checkOpacity }} className="absolute">
                      <Check size={14} />
                    </motion.div>
                  </div>
                  <span>자동 취합 실행</span>
                </motion.div>
              </div>
              <div className="p-4 h-48 relative flex flex-col justify-center items-center overflow-hidden">
                <motion.div style={{ opacity: dataGatheringProgress }} className="w-full space-y-3">
                  <div className="w-full h-6 bg-blue-50 rounded border border-blue-100 flex items-center px-2"><div className="w-3/4 h-2 bg-blue-200 rounded" /></div>
                  <div className="w-full h-6 bg-blue-50 rounded border border-blue-100 flex items-center px-2"><div className="w-5/6 h-2 bg-blue-200 rounded" /></div>
                  <div className="w-full h-6 bg-blue-50 rounded border border-blue-100 flex items-center px-2"><div className="w-4/5 h-2 bg-blue-200 rounded" /></div>
                  <div className="w-full h-6 bg-blue-50 rounded border border-blue-100 flex items-center px-2"><div className="w-full h-2 bg-blue-200 rounded" /></div>
                </motion.div>
              </div>
            </div>

            {sourceDocs.map((doc, idx) => (
              <FlyingDoc key={idx} doc={doc} scrollYProgress={scrollYProgress} mergeStart={0.46} mergeEnd={0.56} />
            ))}

            <motion.div
              className="absolute z-30 text-slate-800 drop-shadow-lg"
              style={{ x: mouseX, y: mouseY, scale: mouseScale }}
            >
              <MousePointer2 size={36} fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>


        {/* ==================== LAYER 3 (OUTPUT) ==================== */}
        <motion.div 
          style={{ opacity: outputOpacity, scale: outputScale, pointerEvents: "none" }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          <div className="z-10 text-center max-w-4xl mb-16 px-4">
            <span className="text-green-600 font-bold tracking-wider text-sm uppercase block mb-4">Step 3. Result & Distribution</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              데이터 취합부터 대시보드 완성까지,<br/>
              이 모든 과정에 걸린 시간 <span className="text-green-600">단 3초</span>.
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              산재한 숫자가 자동으로 정돈된 리포트와 시각화로 바뀌고, 필요한 사람에게 즉시 공유됩니다.
            </p>
          </div>

          <div className="w-full max-w-4xl bg-white border border-slate-200 shadow-xl rounded-xl p-6 relative pointer-events-auto mx-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-slate-800">재무 본부 주간 결산 대시보드</h3>
                <span className="text-sm text-slate-500">자동 생성됨 • 1분 전</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                <div className="text-sm text-slate-500 mb-1">총 매출</div>
                <div className="text-2xl font-bold text-slate-800">₩ 12.4억</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                <div className="text-sm text-slate-500 mb-1">비용</div>
                <div className="text-2xl font-bold text-slate-800">₩ 3.2억</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                <div className="text-sm text-slate-500 mb-1">영업이익률</div>
                <div className="text-2xl font-bold text-green-600">74%</div>
              </div>
            </div>

            <div className="w-full bg-white border border-slate-100 rounded-lg flex flex-col md:flex-row p-4 gap-6 shadow-sm">
              {/* Chart 1: 매출 및 매출원가 비중 */}
              <div className="flex-1 flex flex-col">
                <div className="text-xs font-bold text-slate-700 mb-4">매출 및 매출원가 비중</div>
                <div className="h-36 relative flex items-end justify-between px-2 pt-6 border-b border-slate-200">
                  <div className="absolute inset-x-0 bottom-1/4 border-b border-slate-100"></div>
                  <div className="absolute inset-x-0 bottom-2/4 border-b border-slate-100"></div>
                  <div className="absolute inset-x-0 bottom-3/4 border-b border-slate-100"></div>
                  <div className="absolute inset-x-0 bottom-full border-b border-slate-100"></div>
                  
                  <motion.div className="z-10 w-8 flex flex-col justify-end" style={{ scaleY: chartProgress, originY: 1, height: '100%' }}>
                    <div className="w-full bg-rose-400 rounded-t-sm" style={{ height: '50%' }}></div>
                    <div className="w-full bg-amber-400" style={{ height: '30%' }}></div>
                  </motion.div>
                  <motion.div className="z-10 w-8 flex flex-col justify-end" style={{ scaleY: chartProgress, originY: 1, height: '100%' }}>
                    <div className="w-full bg-rose-400 rounded-t-sm" style={{ height: '45%' }}></div>
                    <div className="w-full bg-amber-400" style={{ height: '35%' }}></div>
                  </motion.div>
                  <motion.div className="z-10 w-8 flex flex-col justify-end" style={{ scaleY: chartProgress, originY: 1, height: '100%' }}>
                    <div className="w-full bg-rose-400 rounded-t-sm" style={{ height: '35%' }}></div>
                    <div className="w-full bg-amber-400" style={{ height: '55%' }}></div>
                  </motion.div>
                  <motion.div className="z-10 w-8 flex flex-col justify-end" style={{ scaleY: chartProgress, originY: 1, height: '100%' }}>
                    <div className="w-full bg-rose-400 rounded-t-sm" style={{ height: '40%' }}></div>
                    <div className="w-full bg-amber-400" style={{ height: '70%' }}></div>
                  </motion.div>
                </div>
                <div className="flex justify-between px-2 mt-2 text-[10px] text-slate-500 font-medium">
                  <span>2023</span><span>2024</span><span>2025</span><span>2026</span>
                </div>
                <div className="flex justify-center gap-3 mt-3 text-[10px] text-slate-600 font-medium whitespace-nowrap">
                  <span className="flex items-center gap-1"><div className="h-2.5 w-2.5 bg-rose-400 rounded-sm"></div> 매출액</span>
                  <span className="flex items-center gap-1"><div className="h-2.5 w-2.5 bg-amber-400 rounded-sm"></div> 매출원가</span>
                </div>
              </div>

              {/* Chart 2: 영업이익 및 영업외수익 추이 */}
              <div className="flex-1 flex flex-col">
                <div className="text-xs font-bold text-slate-700 mb-4">영업이익 및 영업외수익 추이</div>
                <div className="h-36 relative flex items-end justify-between border-b border-slate-200">
                  <div className="absolute inset-x-0 bottom-1/4 border-b border-slate-100"></div>
                  <div className="absolute inset-x-0 bottom-2/4 border-b border-slate-100"></div>
                  <div className="absolute inset-x-0 bottom-3/4 border-b border-slate-100"></div>
                  <div className="absolute inset-x-0 bottom-full border-b border-slate-100"></div>
                  
                  <motion.div className="absolute inset-0 z-10 overflow-hidden" style={{ scaleY: chartProgress, originY: 1 }}>
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 12 56 C 25 62, 30 62, 38 62 C 45 62, 53 12, 63 12 C 73 12, 80 56, 88 56 L 88 100 L 12 100 Z" fill="#f43f5e" fillOpacity="0.1" />
                      <path d="M 12 50 C 20 60, 25 68, 38 68 C 47 68, 55 75, 63 75 C 74 75, 80 68, 88 68 L 88 100 L 12 100 Z" fill="#06b6d4" fillOpacity="0.1" />
                      <path d="M 12 56 C 25 62, 30 62, 38 62 C 45 62, 53 12, 63 12 C 73 12, 80 56, 88 56" fill="none" stroke="#f43f5e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                      <path d="M 12 50 C 20 60, 25 68, 38 68 C 47 68, 55 75, 63 75 C 74 75, 80 68, 88 68" fill="none" stroke="#06b6d4" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </motion.div>
                </div>
                <div className="flex justify-between px-2 mt-2 text-[10px] text-slate-500 font-medium">
                  <span>2023</span><span>2024</span><span>2025</span><span>2026</span>
                </div>
                <div className="flex justify-center gap-3 mt-3 text-[10px] text-slate-600 font-medium whitespace-nowrap">
                  <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-cyan-400 rounded-sm"></div> 영업이익</span>
                  <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-rose-400 rounded-sm"></div> 영업외 수익</span>
                </div>
              </div>

              {/* Chart 3: 연도별 당기순이익 현황 */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-end mb-4">
                  <div className="text-xs font-bold text-slate-700">연도별 당기순이익 현황</div>
                  <div className="text-[9px] text-slate-400">(단위: 천원)</div>
                </div>
                <div className="h-36 relative flex items-end justify-between px-3 pt-6 border-b border-slate-200">
                  <div className="absolute inset-x-0 bottom-1/4 border-b border-slate-100"></div>
                  <div className="absolute inset-x-0 bottom-2/4 border-b border-slate-100"></div>
                  <div className="absolute inset-x-0 bottom-3/4 border-b border-slate-100"></div>
                  <div className="absolute inset-x-0 bottom-full border-b border-slate-100"></div>
                  
                  <motion.div className="z-10 w-8 bg-cyan-400 rounded-t-sm" style={{ scaleY: chartProgress, originY: 1, height: '45%' }}></motion.div>
                  <motion.div className="z-10 w-8 bg-cyan-400 rounded-t-sm" style={{ scaleY: chartProgress, originY: 1, height: '30%' }}></motion.div>
                  <motion.div className="z-10 w-8 bg-cyan-400 rounded-t-sm" style={{ scaleY: chartProgress, originY: 1, height: '85%' }}></motion.div>
                  <motion.div className="z-10 w-8 bg-cyan-400 rounded-t-sm" style={{ scaleY: chartProgress, originY: 1, height: '25%' }}></motion.div>
                </div>
                <div className="flex justify-between px-3 mt-2 text-[10px] text-slate-500 font-medium">
                  <span>2023</span><span>2024</span><span>2025</span><span>2026</span>
                </div>
                <div className="flex justify-center gap-3 mt-3 text-[10px] text-slate-600 font-medium whitespace-nowrap">
                  <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-cyan-400 rounded-sm"></div> 당기순이익</span>
                </div>
              </div>
            </div>

            {/* Slack-style Notification Popup */}
            <motion.div 
              style={{ y: popupY, opacity: popupOpacity }}
              className="absolute -right-4 -bottom-10 md:-right-10 md:-bottom-10 bg-white shadow-2xl border border-slate-100 rounded-lg p-4 flex gap-4 items-start w-80 z-50 pointer-events-none"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-sm">
                <img src="/wegobe-bot.svg" alt="위고비 봇" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm text-slate-900">위고비(Bot)</span>
                  <span className="text-xs text-slate-400">방금</span>
                </div>
                <p className="text-sm text-slate-600">
                  테리우스, 주간 결산 대시보드와 보고용 슬라이드 초안 공유드립니다. <CheckCircle2 size={14} className="inline text-green-500"/>
                </p>
              </div>
            </motion.div>
          </div>

        </motion.div>

      </motion.div>
    </section>
  );
};

export default Phase3;
