import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useTransform } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  LayoutDashboard,
  Play,
  TrendingUp,
  X,
} from 'lucide-react';

const cases = [
  {
    id: 'people-ops',
    category: 'Issue Analysis',
    title: '시너지지원 Weekly Issue',
    description: '약 10개의 구글독스 Weekly Issue를 자동 취합하고, 제미나이 요약을 더해 마스터 독스에 최종 분석 보고서를 생성합니다.',
    highlight: '문서 취합과 요약 분석 자동화',
    accent: 'from-amber-400 to-orange-500',
    tags: ['Google Docs', 'Gemini', 'Master Docs'],
    metrics: [
      { label: '원본 문서 수', value: '약 10개', icon: TrendingUp, color: 'text-blue-600' },
      { label: '최종 보고서', value: '1개', icon: CheckCircle2, color: 'text-green-600' },
    ],
    demoTitle: '시연 화면 04. Weekly Issue 취합 분석',
    demoSubtitle: '각사 Weekly Issue 문서를 모아 Key Issue Summary, Executive Summary, Weekly Issue 구조의 최종 분석 보고서를 생성하는 흐름',
    demo: {
      type: 'people',
      chips: ['Google Docs 수집', 'Gemini 요약', '마스터 독스 생성', '최종 보고서 공유'],
    },
  },
  {
    id: 'finance-ops',
    category: 'Finance Ops',
    title: '월 결산 자동 취합 시스템',
    description: '각 파트에서 개별적으로 작성하던 엑셀 데이터를 GAS를 통해 하나의 시트로 자동 병합 및 검증합니다.',
    highlight: '보고 전 취합 공수 대폭 절감',
    accent: 'from-sky-500 to-blue-600',
    tags: ['Sheets', 'Docs', 'Validation'],
    metrics: [
      { label: '단축 시간', value: '월 40시간', icon: Clock, color: 'text-blue-600' },
      { label: '오류율 감소', value: '95%', icon: TrendingUp, color: 'text-green-600' },
    ],
    demoTitle: '시연 화면 01. 결산 데이터 자동 취합',
    demoSubtitle: '부서별 원본 시트가 실시간으로 하나의 마스터 결산 보드로 병합되는 흐름',
    demo: {
      type: 'finance',
      chips: ['파트별 시트 감지', '중복 행 제거', '오류값 검증', '마스터 반영'],
    },
  },
  {
    id: 'workflow',
    category: 'Workflow',
    title: '비용 정산 알림 봇',
    description: '구글 폼으로 접수된 비용 정산 내역을 파악하여, 이메일과 구글 챗으로 자동 승인/반려 알림을 전송합니다.',
    highlight: '승인 리드타임 단축',
    accent: 'from-emerald-400 to-teal-500',
    tags: ['Forms', 'Mail', 'Chat'],
    metrics: [
      { label: '처리 대기 시간', value: '-3일', icon: Clock, color: 'text-blue-600' },
      { label: '누락 방지', value: '100%', icon: CheckCircle2, color: 'text-green-600' },
    ],
    demoTitle: '시연 화면 02. 비용 정산 알림 워크플로우',
    demoSubtitle: '폼 제출부터 승인 상태 알림까지 자동으로 이어지는 운영 흐름',
    demo: {
      type: 'workflow',
      chips: ['폼 제출', '승인자 탐색', '메일 발송', '챗 알림'],
    },
  },
  {
    id: 'external-data',
    category: 'External Data',
    title: '환율 데이터 자동 스크래핑',
    description: '매일 고시되는 환율 정보를 자동으로 읽어와 내부 데이터베이스 시트에 기록하고 변동 추이를 리포팅합니다.',
    highlight: '실시간 지표 업데이트',
    accent: 'from-violet-500 to-fuchsia-500',
    tags: ['API', 'Database', 'Reporting'],
    metrics: [
      { label: '휴먼 에러', value: '0', icon: AlertTriangle, color: 'text-amber-500' },
      { label: '데이터 최신성', value: '실시간', icon: Activity, color: 'text-purple-600' },
    ],
    demoTitle: '시연 화면 03. 환율 데이터 자동 수집',
    demoSubtitle: '외부 소스에서 읽은 환율 데이터가 내부 표준 포맷으로 정리되는 흐름',
    demo: {
      type: 'external',
      chips: ['외부 API 호출', '데이터 정규화', '변동률 계산', '리포트 반영'],
    },
  },
];

const PEOPLE_TUTORIALS = [
  {
    id: 'code',
    label: 'GAS 코드 화면',
    helper: '10여 개의 Weekly Issue 구글독스를 읽고, 제미나이 요약을 호출한 뒤 마스터 독스를 작성하는 앱스 스크립트 코드입니다.',
    callout: '먼저 GAS 코드 링크를 눌러 어떤 문서를 읽고 어떤 순서로 요약과 병합이 진행되는지 확인해 주세요.',
    chips: ['DriveApp', 'DocumentApp', 'Gemini API'],
    stats: [
      ['원본 문서', '10개'],
      ['마스터 문서', '1개'],
      ['요약 섹션', '2개'],
    ],
  },
  {
    id: 'run',
    label: '코드 실행 과정',
    helper: '원본 구글독스를 읽고, 제미나이로 요약한 뒤, 최종 마스터 독스에 섹션별로 삽입하는 실행 과정입니다.',
    callout: '실행 과정 링크를 누르면 원본 문서 수집부터 제미나이 요약, 마스터 독스 반영까지 단계별 로그를 볼 수 있습니다.',
    chips: ['Load Source Docs', 'Generate Summary', 'Write Master Docs'],
    stats: [
      ['실행 시간', '38초'],
      ['처리 문단', '124개'],
      ['실패 건수', '0건'],
    ],
  },
  {
    id: 'output',
    label: '생성된 산출물',
    helper: 'Key Issue Summary, Executive Summary, Weekly Issue 구조로 완성된 최종 분석 보고서 산출물입니다.',
    callout: '산출물 링크를 누르면 실행 완료 후 마스터 독스에 정리된 최종 Weekly Issue 분석 보고서를 확인할 수 있습니다.',
    chips: ['Key Issue Summary', 'Executive Summary', 'Weekly Issue'],
    stats: [
      ['업데이트 시각', '08:01'],
      ['요약 이슈', '5개'],
      ['회사별 섹션', '10개'],
    ],
  },
];

const PEOPLE_CODE_LINES = [
  'function buildWeeklyIssueReport() {',
  '  const docs = collectWeeklyDocs(sourceFolders);',
  '  const merged = mergeCompanyIssues(docs);',
  '  const keySummary = summarizeTopIssuesWithGemini(merged, 5);',
  '  const executive = summarizeByCompanyWithGemini(merged);',
  '  writeMasterDoc({ keySummary, executive, merged });',
  '}',
];

const PEOPLE_LOG_LINES = [
  '[08:00:01] trigger started: buildWeeklyIssueReport',
  '[08:00:08] source docs loaded: 10',
  '[08:00:17] Gemini summary created: Key Issue Summary',
  '[08:00:26] Gemini summary created: Executive Summary',
  '[08:00:38] master docs updated and shared',
];

const PEOPLE_STATUS_STEPS = [
  '원본 구글독스 수집',
  '회사별 이슈 병합',
  '제미나이 요약 생성',
  '마스터 독스 작성',
];

const PEOPLE_OUTPUT_SECTIONS = [
  ['[Key Issue Summary]', '주요 이슈 5개', 'Gemini 요약'],
  ['[Executive Summary]', '각사 1~2개 이슈', 'Gemini 요약'],
  ['[Weekly Issue]', '각사 원문 취합', '단순 병합'],
];

const PEOPLE_OUTPUT_ITEMS = [
  'Key Issue Summary 5개 자동 생성',
  '각사 Executive Summary 자동 생성',
  'Weekly Issue 원문 취합 및 정렬',
  '마스터 독스 최종 보고서 공유',
];

function DemoPanel({ item }) {
  if (item.demo.type === 'finance') {
    return (
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Master Sheet</div>
              <div className="mt-1 text-xl font-bold text-slate-900">월 결산 통합 보드</div>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">Auto Sync</div>
          </div>
          <div className="space-y-3">
            {[
              ['소싱관리', '48건', '정상'],
              ['구매관리', '36건', '정상'],
              ['전사경영기획', '22건', '검증완료'],
              ['통합경영기획', '18건', '정상'],
            ].map(([team, count, status]) => (
              <div key={team} className="grid grid-cols-[1.2fr_0.7fr_0.7fr] items-center rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <div className="font-semibold text-slate-800">{team}</div>
                <div className="text-slate-500">{count}</div>
                <div className="font-semibold text-emerald-600">{status}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">Pipeline</div>
          <div className="mt-3 space-y-4">
            {item.demo.chips.map((chip, idx) => (
              <div key={chip} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-sky-300">{idx + 1}</div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">{chip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (item.demo.type === 'workflow') {
    return (
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Workflow Timeline</div>
        <div className="grid gap-4 lg:grid-cols-4">
          {item.demo.chips.map((chip, idx) => (
            <div key={chip} className="relative rounded-[22px] border border-slate-200 bg-slate-50 p-4">
              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-bold text-white">
                {idx + 1}
              </div>
              <div className="text-base font-bold text-slate-900">{chip}</div>
              <div className="mt-2 text-sm text-slate-500">
                {idx === 0 && '사용자가 비용 정산 폼을 제출합니다.'}
                {idx === 1 && '부서와 승인 권한 기준으로 담당자를 찾습니다.'}
                {idx === 2 && '정산 내역이 승인자 메일로 전달됩니다.'}
                {idx === 3 && '진행 상태를 구글 챗으로 자동 공유합니다.'}
              </div>
              {idx < item.demo.chips.length - 1 && (
                <div className="absolute right-[-14px] top-12 hidden h-[2px] w-7 bg-emerald-300 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (item.demo.type === 'external') {
    return (
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/40">API Response</div>
          <div className="space-y-3 font-mono text-sm">
            <div className="rounded-2xl bg-white/5 p-4 text-cyan-200">{'{ "usd": 1452.31, "jpy": 9.73, "eur": 1581.02 }'}</div>
            <div className="rounded-2xl bg-white/5 p-4 text-fuchsia-200">{'{ "change": "+0.42%", "timestamp": "09:00" }'}</div>
          </div>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Normalized Report</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ['USD', '1,452.31', '+0.42%'],
              ['JPY', '9.73', '-0.08%'],
              ['EUR', '1,581.02', '+0.15%'],
            ].map(([unit, value, change]) => (
              <div key={unit} className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-500">{unit}</div>
                <div className="mt-2 text-xl font-bold text-slate-900">{value}</div>
                <div className="mt-1 text-sm text-violet-600">{change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Vacation Board</div>
        <div className="space-y-3">
          {[
            ['경영기획', '3명', '정상'],
            ['재무팀', '2명', '주의'],
            ['소싱관리', '1명', '정상'],
            ['구매관리', '4명', '혼잡'],
          ].map(([team, onLeave, status]) => (
            <div key={team} className="grid grid-cols-[1.2fr_0.7fr_0.7fr] items-center rounded-2xl bg-slate-50 px-4 py-3 text-sm">
              <div className="font-semibold text-slate-800">{team}</div>
              <div className="text-slate-500">{onLeave}</div>
              <div className={`font-semibold ${status === '정상' ? 'text-emerald-600' : 'text-amber-500'}`}>{status}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/40">Automation Scope</div>
        <div className="grid gap-3">
          {item.demo.chips.map((chip) => (
            <div key={chip} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              {chip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseModal({ item, onClose }) {
  const [activeTutorialId, setActiveTutorialId] = useState(PEOPLE_TUTORIALS[0].id);
  const [typedCodeUnits, setTypedCodeUnits] = useState(0);
  const [visibleLogCount, setVisibleLogCount] = useState(0);
  const [completedStatusCount, setCompletedStatusCount] = useState(0);
  const [outputRevealCount, setOutputRevealCount] = useState(0);

  useEffect(() => {
    if (item?.demo?.type === 'people') {
      setActiveTutorialId(PEOPLE_TUTORIALS[0].id);
    }
  }, [item]);

  useEffect(() => {
    if (item?.demo?.type !== 'people') {
      return undefined;
    }

    setTypedCodeUnits(0);
    setVisibleLogCount(0);
    setCompletedStatusCount(0);
    setOutputRevealCount(0);

    const cleanups = [];

    if (activeTutorialId === 'code') {
      const totalUnits = PEOPLE_CODE_LINES.reduce((sum, line) => sum + line.length + 6, 0);
      const intervalId = window.setInterval(() => {
        setTypedCodeUnits((prev) => {
          if (prev >= totalUnits) {
            window.clearInterval(intervalId);
            return prev;
          }
          return prev + 2;
        });
      }, 22);
      cleanups.push(() => window.clearInterval(intervalId));
    }

    if (activeTutorialId === 'run') {
      PEOPLE_LOG_LINES.forEach((_, index) => {
        const timeoutId = window.setTimeout(() => {
          setVisibleLogCount(index + 1);
        }, 350 + index * 420);
        cleanups.push(() => window.clearTimeout(timeoutId));
      });

      PEOPLE_STATUS_STEPS.forEach((_, index) => {
        const timeoutId = window.setTimeout(() => {
          setCompletedStatusCount(index + 1);
        }, 1400 + index * 360);
        cleanups.push(() => window.clearTimeout(timeoutId));
      });
    }

    if (activeTutorialId === 'output') {
      [...PEOPLE_OUTPUT_SECTIONS, ...PEOPLE_OUTPUT_ITEMS].forEach((_, index) => {
        const timeoutId = window.setTimeout(() => {
          setOutputRevealCount(index + 1);
        }, 260 + index * 170);
        cleanups.push(() => window.clearTimeout(timeoutId));
      });
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [activeTutorialId, item]);

  const activeTutorial =
    PEOPLE_TUTORIALS.find((tutorial) => tutorial.id === activeTutorialId) ?? PEOPLE_TUTORIALS[0];

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`w-full rounded-[32px] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_30px_100px_rgba(15,23,42,0.3)] ${item.demo.type === 'people' ? 'max-w-6xl' : 'max-w-5xl'}`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
          >
            {item.demo.type === 'people' ? (
              <>
                <div className="mb-6 flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className={`mx-auto inline-flex rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
                      {item.category}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-900"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mb-6 flex flex-wrap justify-center gap-3">
                  {PEOPLE_TUTORIALS.map((tutorial, index) => (
                    <button
                      key={tutorial.id}
                      type="button"
                      onClick={() => setActiveTutorialId(tutorial.id)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                        activeTutorialId === tutorial.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                      }`}
                    >
                      {index + 1}. {tutorial.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between rounded-[22px] bg-slate-100 px-5 py-4">
                    <div>
                      <div className="mt-1 text-lg font-bold text-slate-900">{activeTutorial.label}</div>
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-slate-200 bg-[#f7f8fb]">
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-slate-300" />
                          <span className="h-3 w-3 rounded-full bg-slate-300" />
                          <span className="h-3 w-3 rounded-full bg-slate-300" />
                        </div>
                        <div className="rounded-full bg-slate-100 px-6 py-2 text-sm font-semibold text-slate-500">
                          {activeTutorial.label}
                        </div>
                        <div className="text-sm font-semibold text-slate-400">확장</div>
                      </div>

                      <div className="h-full pt-[72px]">
                        {activeTutorial.id === 'code' ? (
                          <div className="grid h-full grid-cols-[220px_minmax(0,1fr)]">
                            <div className="border-r border-slate-200 bg-slate-950 p-5 text-white">
                              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-sky-300">
                                <Code2 size={16} />
                                weekly-issue-report.gs
                              </div>
                              <div className="space-y-2 text-xs text-white/55">
                                {['collectWeeklyDocs()', 'summarizeWithGemini()', 'writeMasterReport()'].map((label) => (
                                  <div key={label} className="rounded-xl bg-white/5 px-3 py-2">
                                    {label}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="relative p-6">
                              <div className="mb-4 flex flex-wrap gap-3">
                                {activeTutorial.chips.map((chip) => (
                                  <div key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600">
                                    {chip}
                                  </div>
                                ))}
                              </div>

                              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 p-5 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                  <div className="text-sm font-semibold text-white/80">Weekly Issue 분석 스크립트</div>
                                  <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">EDIT MODE</div>
                                </div>
                                <div className="space-y-2 font-mono text-[13px] leading-7 text-slate-200">
                                  {PEOPLE_CODE_LINES.map((line, idx) => (
                                    <div key={line} className="flex gap-4">
                                      <span className="w-6 text-right text-slate-500">{idx + 1}</span>
                                      <span>
                                        {(() => {
                                          const prefixUnits = PEOPLE_CODE_LINES
                                            .slice(0, idx)
                                            .reduce((sum, currentLine) => sum + currentLine.length + 6, 0);
                                          const localUnits = Math.max(typedCodeUnits - prefixUnits, 0);
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

                            </div>
                          </div>
                        ) : activeTutorial.id === 'run' ? (
                          <div className="relative p-6">
                              <div className="mb-4 flex flex-wrap gap-3">
                                {activeTutorial.chips.map((chip) => (
                                  <div key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600">
                                  {chip}
                                </div>
                              ))}
                            </div>

                            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                              <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-sm font-semibold text-sky-300">
                                    <Play size={16} />
                                    Execution Log
                                  </div>
                                  <div className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">RUNNING</div>
                                </div>
                                <div className="space-y-3 font-mono text-[13px] text-slate-200">
                                  {PEOPLE_LOG_LINES.slice(0, visibleLogCount).map((line, idx) => (
                                    <motion.div
                                      key={line}
                                      initial={{ opacity: 0, y: 8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3"
                                    >
                                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-emerald-300">
                                        {idx + 1}
                                      </div>
                                      <span>{line}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
                                  <Database size={16} />
                                  Processing Status
                                </div>
                                <div className="space-y-4">
                                  {PEOPLE_STATUS_STEPS.map((step, idx) => {
                                    const isComplete = completedStatusCount > idx;
                                    const isRunning = completedStatusCount === idx;

                                    return (
                                    <div key={step} className="rounded-2xl bg-slate-50 px-4 py-4">
                                      <div className="flex items-center justify-between">
                                        <div className="font-semibold text-slate-900">{step}</div>
                                        <div className={`text-sm font-bold ${isComplete ? 'text-emerald-600' : isRunning ? 'text-amber-500' : 'text-slate-400'}`}>
                                          {isComplete ? '완료' : isRunning ? '실행중' : '대기'}
                                        </div>
                                      </div>
                                      <div className="mt-3 h-2 rounded-full bg-slate-200">
                                        <motion.div
                                          className={`h-2 rounded-full ${isComplete ? 'bg-emerald-500' : isRunning ? 'bg-amber-400' : 'bg-slate-300'}`}
                                          animate={{ width: isComplete ? '100%' : isRunning ? ['28%', '72%', '54%'] : '18%' }}
                                          transition={isRunning ? { duration: 1.2, repeat: Infinity } : { duration: 0.35 }}
                                        />
                                      </div>
                                    </div>
                                  );
                                  })}
                                </div>
                              </div>
                            </div>

                          </div>
                        ) : (
                          <div className="relative p-6">
                            <div className="mb-4 flex flex-wrap gap-3">
                              {activeTutorial.chips.map((chip) => (
                                <div key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600">
                                  {chip}
                                </div>
                              ))}
                            </div>

                            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
                                  <LayoutDashboard size={16} />
                                  Weekly Issue Master Docs
                                </div>
                                <div className="grid gap-3 md:grid-cols-3">
                                  {activeTutorial.stats.map(([label, value]) => (
                                    <motion.div
                                      key={label}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: outputRevealCount > 0 ? 1 : 0.35, y: outputRevealCount > 0 ? 0 : 10 }}
                                      className="rounded-2xl bg-slate-50 p-4"
                                    >
                                      <div className="text-sm text-slate-500">{label}</div>
                                      <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
                                    </motion.div>
                                  ))}
                                </div>

                                <div className="mt-5 space-y-3">
                                  {PEOPLE_OUTPUT_SECTIONS.map(([section, value, type], idx) => (
                                    <motion.div
                                      key={section}
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: outputRevealCount > idx ? 1 : 0, y: outputRevealCount > idx ? 0 : 12 }}
                                      className="grid grid-cols-[1.05fr_0.85fr_0.8fr] items-center rounded-2xl bg-slate-50 px-4 py-3 text-sm"
                                    >
                                      <div className="font-semibold text-slate-800">{section}</div>
                                      <div className="text-slate-500">{value}</div>
                                      <div className="font-semibold text-amber-600">{type}</div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
                                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">Generated Outputs</div>
                                <div className="mt-4 space-y-3">
                                  {PEOPLE_OUTPUT_ITEMS.map((output, idx) => (
                                    <motion.div
                                      key={output}
                                      initial={{ opacity: 0, x: 14 }}
                                      animate={{
                                        opacity: outputRevealCount > PEOPLE_OUTPUT_SECTIONS.length + idx ? 1 : 0,
                                        x: outputRevealCount > PEOPLE_OUTPUT_SECTIONS.length + idx ? 0 : 14,
                                      }}
                                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                                    >
                                      {output}
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 flex items-start justify-between gap-6">
                  <div>
                    <div className={`inline-flex rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
                      {item.category}
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{item.demoTitle}</h3>
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{item.demoSubtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-900"
                  >
                    <X size={18} />
                  </button>
                </div>

                <DemoPanel item={item} />
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const Cases = ({ progress }) => {
  const [activeCaseId, setActiveCaseId] = useState(null);
  const trackX = useTransform(progress, [0.42, 0.54], ['0%', '-22%']);
  const sectionOpacity = useTransform(progress, [0.06, 0.12, 0.46, 0.56], [0, 1, 1, 0]);
  const sectionY = useTransform(progress, [0.46, 0.56], [0, -24]);
  const sectionScale = useTransform(progress, [0.46, 0.56], [1, 0.985]);
  const railOpacity = useTransform(progress, [0.08, 0.12, 0.46, 0.54], [0, 1, 1, 0]);

  const activeCase = cases.find((item) => item.id === activeCaseId) ?? null;

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveCaseId(null);
      }
    };

    if (activeCase) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [activeCase]);

  return (
    <>
      <motion.section
        style={{ opacity: sectionOpacity, y: sectionY, scale: sectionScale }}
        className="h-full w-full overflow-hidden py-16 text-slate-900"
      >
        <div className="mx-auto mb-12 max-w-5xl px-4 text-center md:px-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
              우리가 만들어낸 <span className="text-gradient">변화들</span>
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed text-slate-600">
              부서 곳곳의 페인포인트는 작은 자동화 조각으로 풀렸고, 그 조각들이 모여 하나의 운영 체계를 바꾸고 있습니다.
            </p>
          </div>
        </div>

        <motion.div style={{ opacity: railOpacity }} className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent md:w-32" />
          <motion.div
            style={{ x: trackX }}
            className="mx-auto flex w-max gap-6 px-4 pb-6 pt-2 md:gap-8 md:px-8"
          >
            {cases.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={`group relative text-left ${item.id === 'people-ops' ? 'cursor-pointer' : ''}`}
                onClick={item.id === 'people-ops' ? () => setActiveCaseId(item.id) : undefined}
              >
                <div className={`absolute -inset-0.5 rounded-[28px] bg-gradient-to-r ${item.accent} opacity-0 blur transition duration-500 group-hover:opacity-25`} />

                <div className="relative flex h-[420px] w-[300px] flex-col rounded-[28px] border border-slate-200 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:w-[360px]">
                  <div className="mb-5 flex items-center justify-between">
                    <div className={`rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
                      {item.category}
                    </div>
                    <ArrowRight size={18} className="text-slate-300 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>

                  <div className={`mb-6 rounded-2xl bg-gradient-to-br ${item.accent} p-[1px]`}>
                    <div className="rounded-2xl bg-slate-950/95 px-5 py-4 text-white">
                      <div className="text-xs uppercase tracking-[0.24em] text-white/50">Impact</div>
                      <div className="mt-2 text-lg font-bold leading-snug">{item.highlight}</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto space-y-4 border-t border-slate-100 pt-5">
                    {item.metrics.map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <div key={metric.label} className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-slate-500">
                            <Icon size={16} className={metric.color} />
                            {metric.label}
                          </span>
                          <span className="text-lg font-bold text-slate-800">{metric.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {item.id === 'people-ops' ? (
                    <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Click to view demo
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <CaseModal item={activeCase} onClose={() => setActiveCaseId(null)} />
    </>
  );
};

export default Cases;
