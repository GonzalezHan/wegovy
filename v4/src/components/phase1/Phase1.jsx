import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Problem from './Problem';
import Agitation from './Agitation';
import Solution from './Solution';

const Phase1 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Problem progress={scrollYProgress} />
        <Agitation progress={scrollYProgress} />
        <Solution progress={scrollYProgress} />
      </div>
    </div>
  );
};

export default Phase1;
