import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Problem from './components/phase1/Problem';
import Agitation from './components/phase1/Agitation';
import Solution from './components/phase1/Solution';

// Dummy imports for testing later phases
const Input = () => <div className="h-screen w-full flex items-center justify-center text-4xl font-bold">Input Placeholder</div>;
const Magic = () => <div className="h-screen w-full flex items-center justify-center text-4xl font-bold">Magic Placeholder</div>;
const Output = () => <div className="h-screen w-full flex items-center justify-center text-4xl font-bold">Output Placeholder</div>;
const CallToAction = () => <div className="h-screen w-full flex items-center justify-center text-4xl font-bold">CTA Placeholder</div>;

function App() {
  const { scrollYProgress } = useScroll();

  // Background and text color transitions
  // We transition slightly before exactly 2/7 (0.28) and finish at 3/7 (0.42)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.27, 0.35],
    ['#0a0a0a', '#ffffff'] // Dark to Light
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0.27, 0.35],
    ['#cecece', '#0a0a0a']
  );

  return (
    <motion.div 
      style={{ backgroundColor, color: textColor }} 
      className="font-sans min-h-screen"
    >
      <Problem />
      <Agitation />
      <Solution />
      <Input />
      <Magic />
      <Output />
      <CallToAction />
    </motion.div>
  );
}

export default App;
