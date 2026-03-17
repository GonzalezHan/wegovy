import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, ChevronRight, House, UserRound } from 'lucide-react';

const StartIntro = ({ onStart }) => {
  const [isStarting, setIsStarting] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (!isStarting) {
      return undefined;
    }

    const installTimer = window.setTimeout(() => {
      setIsInstalled(true);
    }, 1500);

    const transitionTimer = window.setTimeout(() => {
      onStart?.();
    }, 3000);

    return () => {
      window.clearTimeout(installTimer);
      window.clearTimeout(transitionTimer);
    };
  }, [isStarting, onStart]);

  const handleStart = () => {
    if (isStarting) {
      return;
    }
    setIsInstalled(false);
    setIsStarting(true);
  };

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#04070f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.18),_transparent_30%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <motion.div
        animate={
          isStarting
            ? {
                opacity: [1, 1, 0],
                scale: [1, 1, 0.95],
                y: [0, 0, -20],
              }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 6.5, times: [0, 0.95, 1], ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-slate-400">
          재무업무생산성 TF
        </div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          반복 업무를
          <br />
          자동화의 흐름으로 바꿉니다
        </h1>
        <div className="relative mt-14 flex w-full max-w-5xl items-start justify-center gap-10 px-4 md:gap-20">
          <div id="start-intro-source" className="flex w-[180px] flex-col items-center">
            <div className="flex h-[156px] w-[156px] items-center justify-center rounded-[40px] border border-white/40 bg-white text-[#f43f5e] shadow-[0_16px_40px_rgba(255,255,255,0.2)]">
              <BriefcaseBusiness size={58} strokeWidth={1.8} />
            </div>
            <div className="mt-6 text-3xl font-bold text-white"></div>
          </div>

          <div className="hidden pt-14 md:block">
            <ChevronRight size={72} strokeWidth={2.2} className="text-white/85" />
          </div>

          <div id="start-intro-destination" className="flex w-[180px] flex-col items-center">
            <motion.div
              animate={
                isInstalled
                  ? {
                      scale: [1, 1.22, 0.9, 1.08, 1],
                      y: [0, -18, 2, -6, 0],
                    }
                  : { scale: 1, y: 0 }
              }
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-[156px] w-[156px] items-center justify-center rounded-[40px] border border-white/40 bg-white text-sky-500 shadow-[0_16px_40px_rgba(255,255,255,0.2)]"
            >
              <House size={58} strokeWidth={1.8} />
            </motion.div>
            <div className="mt-6 min-h-[2.25rem] text-3xl font-bold text-white">{isInstalled ? '칼퇴' : ''}</div>
          </div>

          <motion.div
            id="start-intro-folder"
            initial={false}
            animate={
              isStarting
                ? {
                    x: [0, 320, 320, 320],
                    y: [0, 0, -16, 0],
                    scale: [1, 1, 1.12, 0.94],
                    opacity: [1, 1, 0.8, 0],
                  }
                : { x: 0, y: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 2, times: [0, 0.84, 0.92, 1], ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-[26%] top-[34px] hidden h-[82px] w-[82px] items-center justify-center rounded-[26px] border border-amber-200/40 bg-amber-300 text-slate-950 shadow-[0_18px_50px_rgba(251,191,36,0.28)] md:flex"
          >
            <UserRound size={40} strokeWidth={1.9} />
          </motion.div>
        </div>

        <motion.button
          id="start-intro-button"
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className={`mt-10 rounded-full border border-white/15 px-10 py-4 text-sm font-bold uppercase tracking-[0.35em] text-slate-950 transition-all duration-500 ${
            isInstalled 
              ? 'bg-amber-400 shadow-[0_18px_50px_rgba(251,191,36,0.4)]'
              : 'bg-white shadow-[0_18px_50px_rgba(255,255,255,0.18)]'
          }`}
        >
          {isInstalled ? 'Done' : isStarting ? 'Installing...' : 'Start'}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default StartIntro;
