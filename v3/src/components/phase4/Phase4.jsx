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
  const casesOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.5], [0, 1, 1, 0]);
  const casesY = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.5], [50, 0, 0, -50]);
  const casesPointer = useTransform(scrollYProgress, (v) => v < 0.45 ? "auto" : "none");

  // Interviews section visibility
  const interviewsOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.9], [0, 1, 1, 0]);
  const interviewsY = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.9], [50, 0, 0, -50]);
  const interviewsPointer = useTransform(scrollYProgress, (v) => v >= 0.45 ? "auto" : "none");

  return (
    <section ref={ref} className="h-[300vh] relative w-full bg-slate-50">
      <div className="sticky top-0 h-screen w-full overflow-hidden text-slate-900">
        
        <motion.div 
          style={{ opacity: casesOpacity, y: casesY, pointerEvents: casesPointer }} 
          className="absolute inset-0 flex flex-col justify-center"
        >
          <Cases />
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
