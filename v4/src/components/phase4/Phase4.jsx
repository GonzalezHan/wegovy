import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Cases from './Cases';
import Interviews from './Interviews';

const Phase4 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Cases section visibility
  const casesOpacity = useTransform(scrollYProgress, [0, 0.08, 0.5, 0.58], [0, 1, 1, 0]);
  const casesY = useTransform(scrollYProgress, [0, 0.08, 0.5, 0.58], [50, 0, 0, -36]);
  const casesPointer = useTransform(scrollYProgress, (v) => v < 0.54 ? "auto" : "none");

  // Interviews section visibility
  const interviewsOpacity = useTransform(scrollYProgress, [0.52, 0.62, 0.84, 0.92], [0, 1, 1, 0]);
  const interviewsY = useTransform(scrollYProgress, [0.52, 0.62, 0.84, 0.92], [50, 0, 0, -50]);
  const interviewsPointer = useTransform(scrollYProgress, (v) => v >= 0.58 ? "auto" : "none");

  return (
    <section ref={ref} className="h-[300vh] relative w-full bg-slate-50">
      <div className="sticky top-0 h-screen w-full overflow-hidden text-slate-900">
        
        <motion.div 
          style={{ opacity: casesOpacity, y: casesY, pointerEvents: casesPointer }} 
          className="absolute inset-0 flex flex-col justify-center"
        >
          <Cases progress={scrollYProgress} />
        </motion.div>

        <motion.div 
          style={{ opacity: interviewsOpacity, y: interviewsY, pointerEvents: interviewsPointer }} 
          className="absolute inset-0 flex flex-col justify-center"
        >
          <Interviews />
        </motion.div>

      </div>
    </section>
  );
};

export default Phase4;
