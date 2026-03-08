import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Roadmap from './Roadmap';
import CallToAction from './CallToAction';
import ContactUs from './ContactUs';

const Phase5 = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Roadmap (Scroll 10): Visible from 0.0 to 0.33, fades out 0.25 to 0.33
  const roadmapOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const roadmapY = useTransform(scrollYProgress, [0.25, 0.33], [0, -50]);

  // CallToAction (Scroll 11): fades in 0.33 to 0.43, visible 0.43 to 0.66, fades out 0.58 to 0.66
  const ctaOpacity = useTransform(scrollYProgress, [0.28, 0.38, 0.58, 0.68], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.28, 0.38, 0.58, 0.68], [50, 0, 0, -50]);
  
  // ContactUs (Scroll 12): fades in 0.68 to 0.78, visible 0.78 to 1.0
  const contactOpacity = useTransform(scrollYProgress, [0.62, 0.72, 1], [0, 1, 1]);
  const contactY = useTransform(scrollYProgress, [0.62, 0.72], [50, 0]);

  return (
    <div ref={containerRef} className="h-[300vh] relative bg-transparent">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Scroll 10: Roadmap */}
        <motion.div style={{ opacity: roadmapOpacity, y: roadmapY }} className="absolute inset-0 z-10 w-full h-full flex flex-col justify-center">
          <Roadmap />
        </motion.div>

        {/* Scroll 11: CallToAction */}
        <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="absolute inset-0 z-20 w-full h-full pointer-events-none flex flex-col justify-center">
          <CallToAction progress={scrollYProgress} />
        </motion.div>

        {/* Scroll 12: ContactUs */}
        <motion.div style={{ opacity: contactOpacity, y: contactY }} className="absolute inset-0 z-30 w-full h-full pointer-events-none flex flex-col justify-center">
          <ContactUs />
        </motion.div>

      </div>
    </div>
  );
};

export default Phase5;
