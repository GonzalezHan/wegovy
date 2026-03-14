import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Blocks,
  Bot,
  Code2,
  FileSpreadsheet,
  FileText,
  Presentation,
  Sparkles,
  Workflow,
} from 'lucide-react';

const TERMINAL_ROWS = [
  'const forms = FormApp.openById(FORM_ID).getResponses();',
  'const rows = normalizeResponses(forms).map(cleanOwner);',
  'const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();',
  'sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);',
  'SlidesApp.openById(REPORT_ID).replaceAllText("{{week}}", currentWeek);',
  'GmailApp.sendEmail(lead, subject, renderSummary(rows));',
];

const EXECUTION_LOG_ROWS = [
  '[09:00:01] Trigger detected: weekly_issue_report',
  '[09:00:03] Gemini connected for source-doc summarization',
  '[09:00:05] Gemini generated Key Issue Summary for 10 docs',
  '[09:00:07] Gemini drafted Executive Summary by company',
  '[09:00:09] GAS updated master doc and shared report',
];

const FEATURE_ITEMS = [
  {
    icon: Workflow,
    color: 'text-emerald-500',
    copy: '클라우드 기반으로 별도 설치 없이 빠르게 구축·확장 가능한 실행 환경',
  },
  {
    icon: Blocks,
    color: 'text-blue-500',
    copy: '트리거 기반 자동 실행으로 정시 보고와 반복 업무를 자동화',
  },
  {
    icon: Bot,
    color: 'text-violet-500',
    copy: 'Gemini를 스크립트에서 직접 호출해 AI 자동화를 구현',
  },
  {
    icon: Sparkles,
    color: 'text-amber-500',
    copy: 'Gemini가 문서 요약, 초안 작성, 데이터 분석을 하나의 흐름 안에서 지원',
  },
];

const FeatureCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white/72 px-4 py-3 shadow-sm backdrop-blur-sm">
      <Icon className={item.color} size={20} />
      <h4 className="text-[15px] font-semibold leading-snug text-gray-800">{item.copy}</h4>
    </div>
  );
};

const GasIntro = () => {
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const terminalInView = useInView(terminalRef, { once: true, amount: 0.45 });
  const [typedUnits, setTypedUnits] = useState(0);
  const [visibleLogCount, setVisibleLogCount] = useState(0);

  const terminalOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.9], [0.45, 1, 1]);

  const appNodes = [
    {
      name: 'Google Sheets',
      icon: FileSpreadsheet,
      color: '#34A853',
      tint: 'bg-[#34A853]/15 border-[#34A853]/30 text-[#34A853]',
    },
    {
      name: 'Google Docs',
      icon: FileText,
      color: '#4285F4',
      tint: 'bg-[#4285F4]/15 border-[#4285F4]/30 text-[#4285F4]',
    },
    {
      name: 'Google Slides',
      icon: Presentation,
      color: '#F9AB00',
      tint: 'bg-[#F9AB00]/15 border-[#F9AB00]/30 text-[#F9AB00]',
    },
    {
      name: 'Gemini',
      icon: Sparkles,
      color: '#8B5CF6',
      tint: 'bg-[#8B5CF6]/15 border-[#8B5CF6]/30 text-[#8B5CF6]',
    },
  ];
  const workspaceNodes = appNodes.slice(0, 3);
  const geminiNode = appNodes[3];

  useEffect(() => {
    if (!terminalInView) {
      return undefined;
    }

    const totalUnits = TERMINAL_ROWS.reduce((sum, line) => sum + line.length + 6, 0);
    const thirdLineStartUnits = TERMINAL_ROWS
      .slice(0, 2)
      .reduce((sum, line) => sum + line.length + 6, 0);
    let intervalId;
    const logTimeouts = [];
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setTypedUnits((prev) => {
          if (prev >= totalUnits) {
            window.clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, 24);

      EXECUTION_LOG_ROWS.forEach((_, index) => {
        const logTimeoutId = window.setTimeout(() => {
          setVisibleLogCount(index + 1);
        }, thirdLineStartUnits * 24 + 120 + index * 320);
        logTimeouts.push(logTimeoutId);
      });
    }, 280);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
      logTimeouts.forEach((logTimeoutId) => window.clearTimeout(logTimeoutId));
    };
  }, [terminalInView]);

  return (
    <section ref={containerRef} className="relative overflow-hidden border-b border-black/5 py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[6%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[120px]" />
          <div className="absolute right-[8%] top-[24%] h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[120px]" />
          <motion.div
            style={{ opacity: terminalOpacity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.06),_transparent_35%),linear-gradient(to_bottom,_rgba(255,255,255,0.65),_rgba(255,255,255,0.88))]"
          />
        </div>

        <div className="relative z-10 mx-auto hidden min-h-screen w-full max-w-7xl items-center px-4 lg:flex">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
            <div className="max-w-[540px] py-10">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-4 py-2 text-sm font-medium tracking-wide text-blue-600">
                  <Sparkles size={16} />
                  GAS Intro
                </div>

                <div className="mt-8 text-[54px] font-bold leading-[1.02] tracking-tight text-gray-900">
                  <span className="text-gradient-gas">Gemini +</span>
                  <br />
                  <span className="text-gray-800">Google Apps Script</span>
                </div>

                <p className="mt-7 max-w-[520px] text-[17px] leading-[1.65] text-gray-600">
                  별도의 서버나 복잡한 설치 없이, 우리가 매일 사용하는 구글 워크스페이스(시트, 메일, 드라이브)를 프로그래밍하고
                  AI 에이전트까지 통합해 하나의 흐름으로 연결하는 강력한 클라우드 환경입니다.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-3">
                  {FEATURE_ITEMS.map((item) => (
                    <FeatureCard
                      key={item.copy}
                      item={item}
                    />
                  ))}
                </div>
            </div>

            <div className="py-6">
              <div className="relative w-full overflow-hidden rounded-[32px] border border-slate-200/80 bg-[#f8fbff] shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-10 top-16 h-44 w-44 rounded-full bg-emerald-300/10 blur-[90px]" />
                  <div className="absolute right-10 top-24 h-52 w-52 rounded-full bg-sky-300/10 blur-[110px]" />
                  <div className="absolute bottom-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-300/10 blur-[110px]" />
                </div>

                <div className="relative flex min-h-[900px] flex-col items-center px-8 py-10">
                  <div className="grid w-full max-w-[780px] grid-cols-3 gap-5">
                    {workspaceNodes.map((node) => {
                      const Icon = node.icon;
                      return (
                        <div
                          key={node.name}
                          className={`rounded-2xl border px-4 py-4 shadow-lg backdrop-blur-sm ${node.tint}`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={22} />
                            <div>
                              <div className="text-sm font-bold text-slate-800">{node.name}</div>
                              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Connected</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 w-full max-w-[780px]">
                    <svg className="h-24 w-full" viewBox="0 0 780 96" preserveAspectRatio="none">
                      <motion.path
                        d="M130 8 C130 28, 200 50, 344 50 L390 50"
                        fill="none"
                        stroke="#b7c0cf"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="10 13"
                        animate={{ strokeDashoffset: [0, -24] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        opacity="0.9"
                      />
                      <motion.path
                        d="M390 8 L390 50"
                        fill="none"
                        stroke="#b7c0cf"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="10 13"
                        animate={{ strokeDashoffset: [0, -24] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                        opacity="0.9"
                      />
                      <motion.path
                        d="M650 8 C650 28, 580 50, 436 50 L390 50"
                        fill="none"
                        stroke="#b7c0cf"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="10 13"
                        animate={{ strokeDashoffset: [0, -24] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                        opacity="0.9"
                      />
                      <circle cx="130" cy="8" r="7" fill="#34A853" />
                      <circle cx="390" cy="8" r="7" fill="#4285F4" />
                      <circle cx="650" cy="8" r="7" fill="#F9AB00" />
                    </svg>
                  </div>

                  <div className="relative mt-0 flex h-32 w-32 items-center justify-center rounded-[30px] border border-slate-800/90 bg-slate-950 text-white shadow-[0_0_50px_rgba(14,165,233,0.22)]">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-[-12px] rounded-[34px] border border-dashed border-sky-400/25"
                    />
                    <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle,_rgba(56,189,248,0.22),_transparent_60%)]" />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <Code2 size={26} className="text-sky-300" />
                      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">GAS Runtime</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col items-center">
                    <svg className="h-14 w-10" viewBox="0 0 40 56" preserveAspectRatio="none">
                      <motion.path
                        d="M20 0 L20 40"
                        fill="none"
                        stroke="#b7c0cf"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="10 13"
                        animate={{ strokeDashoffset: [0, -20] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        opacity="0.9"
                      />
                      <circle cx="20" cy="40" r="6" fill="#8B5CF6" />
                    </svg>

                    <div className={`w-[240px] rounded-2xl border px-4 py-4 shadow-lg backdrop-blur-sm ${geminiNode.tint}`}>
                      <div className="flex items-center gap-3">
                        <Sparkles size={22} />
                        <div>
                          <div className="text-sm font-bold text-slate-800">{geminiNode.name}</div>
                          <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">AI Connected</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    ref={terminalRef}
                    style={{ opacity: terminalOpacity }}
                    className="mt-6 grid w-full max-w-[780px] gap-4"
                  >
                    <div className="rounded-[28px] border border-slate-800 bg-slate-950/95 p-5 shadow-2xl">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                          <Code2 size={16} className="text-sky-400" />
                          data-cleaning.gs
                        </div>
                        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                          Live typing
                        </div>
                      </div>
                      <div className="space-y-2 font-mono text-[11px] text-slate-300 md:text-xs">
                      {TERMINAL_ROWS.slice(0, 3).map((line, idx) => (
                          <div
                            key={line}
                            className="min-h-[1.6em] overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            <span className="mr-3 text-slate-500">{String(idx + 1).padStart(2, '0')}</span>
                            <span>
                              {(() => {
                                const prefixUnits = TERMINAL_ROWS
                                  .slice(0, idx)
                                  .reduce((sum, currentLine) => sum + currentLine.length + 6, 0);
                                const localUnits = Math.max(typedUnits - prefixUnits, 0);
                                const visibleChars = Math.min(localUnits, line.length);
                                const showCursor = localUnits >= 0 && localUnits < line.length + 6;

                                return (
                                  <>
                                    {line.slice(0, visibleChars)}
                                    {showCursor ? (
                                      <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="ml-[1px] inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-cyan-300 align-middle"
                                      />
                                    ) : null}
                                  </>
                                );
                              })()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-800 bg-slate-950/95 p-4 shadow-2xl">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                          <Bot size={16} className="text-violet-300" />
                          Gemini logging
                        </div>
                        <div className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-300">
                          AI automation
                        </div>
                      </div>
                      <div className="space-y-2 font-mono text-[11px] text-slate-300 md:text-xs">
                        {EXECUTION_LOG_ROWS.slice(0, Math.min(visibleLogCount, 3)).map((line, idx) => (
                          <motion.div
                            key={line}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-white/5 bg-white/5 px-3 py-2"
                          >
                            <span className="mr-3 text-slate-500">{String(idx + 1).padStart(2, '0')}</span>
                            <span>{line}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 lg:hidden">
          <div className="grid w-full gap-10">
            <div className="space-y-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-4 py-2 text-sm font-medium tracking-wide text-blue-600">
                <Sparkles size={16} />
                GAS Intro
              </div>
              <div className="text-4xl font-bold tracking-tight text-gray-900">
                <span className="text-gradient-gas">Gemini +</span>
                <br />
                <span className="text-gray-800">Google Apps Script</span>
              </div>
              <p className="text-base leading-relaxed text-gray-600">
                별도의 서버나 복잡한 설치 없이, 우리가 매일 사용하는 구글 워크스페이스(시트, 메일, 드라이브)를 프로그래밍하고 AI 에이전트까지 통합해 하나의 흐름으로 연결하는 강력한 클라우드 환경입니다.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {FEATURE_ITEMS.map((item) => (
                  <FeatureCard
                    key={item.copy}
                    item={item}
                  />
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-[#f8fbff] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="grid grid-cols-1 gap-4">
                {workspaceNodes.map((node) => {
                  const Icon = node.icon;
                  return (
                    <div key={node.name} className={`rounded-2xl border px-4 py-3 ${node.tint}`}>
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        <div>
                          <div className="text-sm font-bold text-slate-800">{node.name}</div>
                          <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Connected</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-center">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-[28px] border border-slate-800/90 bg-slate-950 text-white">
                    <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,_rgba(56,189,248,0.22),_transparent_60%)]" />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <Code2 size={24} className="text-sky-300" />
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">GAS Runtime</div>
                    </div>
                  </div>
                </div>
                <div className={`mx-auto w-full max-w-[240px] rounded-2xl border px-4 py-3 ${geminiNode.tint}`}>
                  <div className="flex items-center gap-3">
                    <Sparkles size={20} />
                    <div>
                      <div className="text-sm font-bold text-slate-800">{geminiNode.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">AI Connected</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-[24px] border border-slate-800 bg-slate-950/95 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <Code2 size={16} className="text-sky-400" />
                      data-cleaning.gs
                    </div>
                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                      Live typing
                    </div>
                  </div>
                  <div className="space-y-2 font-mono text-[11px] text-slate-300">
                    {TERMINAL_ROWS.slice(0, 3).map((line, idx) => (
                      <div key={line} className="min-h-[1.5em] whitespace-nowrap overflow-hidden text-ellipsis">
                        <span className="mr-3 text-slate-500">{String(idx + 1).padStart(2, '0')}</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[24px] border border-slate-800 bg-slate-950/95 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <Bot size={16} className="text-violet-300" />
                      Gemini logging
                    </div>
                    <div className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-300">
                      AI automation
                    </div>
                  </div>
                  <div className="space-y-2 font-mono text-[11px] text-slate-300">
                    {EXECUTION_LOG_ROWS.slice(0, 3).map((line, idx) => (
                      <div key={line} className="rounded-xl border border-white/5 bg-white/5 px-3 py-2">
                        <span className="mr-3 text-slate-500">{String(idx + 1).padStart(2, '0')}</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default GasIntro;
