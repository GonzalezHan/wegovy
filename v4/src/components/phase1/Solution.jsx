
import { motion, useTransform } from 'framer-motion';

const Solution = ({ progress }) => {
  const sectionOpacity = useTransform(progress, [0.6, 0.66, 1], [0, 1, 1]);
  const pointerEvents = useTransform(progress, (v) => v < 0.6 ? "none" : "auto");

  const opacity = useTransform(progress, [0.66, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.66, 0.75, 0.9, 1], [50, 0, 0, -50]);
  const scale = useTransform(progress, [0.66, 0.75], [0.9, 1]);
  const rotateX = useTransform(progress, [0.66, 0.75], [90, 0]);

  return (
    <motion.section 
      style={{ opacity: sectionOpacity, pointerEvents }}
      className="absolute inset-0 w-full flex items-center justify-center overflow-hidden"
    >

      <motion.div 
        style={{ opacity, y, scale }}
        className="z-10 text-center px-6 max-w-5xl"
      >
        <motion.div 
          className="mb-8"
          style={{ rotateX }}
        >
          <div className="inline-block px-6 py-2 rounded-full border-2 border-slate-900 font-bold text-sm tracking-widest text-slate-800 uppercase mb-6 shadow-sm">
            재무 업무효율화 TF
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-slate-900 mb-6 drop-shadow-sm break-keep">
            <span className="inline-block">데이터 취합부터</span>{' '}
            <span className="inline-block">최종 보고서까지,</span><br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 inline-block">
              단 한 번의 클릭으로.
            </span>
          </h2>
        </motion.div>
        
        <p className="text-xl md:text-2xl text-slate-600 font-medium tracking-tight">
          AI 에이전트와 구글 앱 스크립트로 완성하는 자동화 워크스페이스
        </p>
      </motion.div>
    </motion.section>
  );
};

export default Solution;
