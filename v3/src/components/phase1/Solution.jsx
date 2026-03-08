
import { motion, useTransform } from 'framer-motion';

const Solution = ({ progress }) => {
  const sectionOpacity = useTransform(progress, [0.6, 0.66, 1], [0, 1, 1]);
  const pointerEvents = useTransform(progress, (v) => v < 0.6 ? "none" : "auto");

  const opacity = useTransform(progress, [0.66, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.66, 0.75, 0.9, 1], [50, 0, 0, -50]);
  const scale = useTransform(progress, [0.66, 0.75], [0.9, 1]);
  const rotateX = useTransform(progress, [0.66, 0.75], [90, 0]);

  // Light burst
  const burstOpacity = useTransform(progress, [0.66, 0.75], [0, 0.5]);
  const burstScale = useTransform(progress, [0.66, 0.85], [0.5, 1.5]);

  return (
    <motion.section 
      style={{ opacity: sectionOpacity, pointerEvents }}
      className="absolute inset-0 w-full flex items-center justify-center overflow-hidden"
    >
      
      {/* Light Burst Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
          opacity: burstOpacity,
          scale: burstScale
        }}
      />

      <motion.div 
        style={{ opacity, y, scale }}
        className="z-10 text-center px-6 max-w-5xl"
      >
        <motion.div 
          className="mb-8"
          style={{ rotateX }}
        >
          <div className="inline-block px-6 py-2 rounded-full border-2 border-slate-900 font-bold text-sm tracking-widest text-slate-800 uppercase mb-6 shadow-sm">
            Business Automation TF
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight text-slate-900 mb-6 drop-shadow-sm">
            데이터 취합부터 최종 보고서까지,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
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
