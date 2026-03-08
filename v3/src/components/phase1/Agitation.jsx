import { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

const PAIN_POINTS = ["휴먼에러", "업무병목", "데이터분산", "비표준화", "단순반복"];

const CHAT_MESSAGES = [
  { id: 1, emoji: "😠", text: "보내주신 엑셀 파일이 열리지가 않는데 다시 한번 확인 부탁드립니다.", align: "left" },
  { id: 2, emoji: "😥", text: "제가 요청드린 양식과 맞지 않네요. 수정 후 재공유 부탁드립니다.", align: "right" },
  { id: 3, emoji: "😧", text: "다음 주 제이든 월간 보고가 있으니 공동체 손익자료 취합 후 구글드라이브로 공유해 주세요.", align: "left" },
  { id: 4, emoji: "😢", text: "글꼴과 서식이 모두 깨져 있어 내용 확인이 어렵습니다.", align: "right" },
];

const ChatBubble = ({ msg, progress, index }) => {
  const start = 0.35 + index * 0.05;
  const end = 0.4 + index * 0.05;
  const opacity = useTransform(progress, [start, end, 0.6, 0.66], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [30, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`flex w-full ${msg.align === 'right' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-end gap-3 max-w-[85%] ${msg.align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="text-3xl md:text-4xl filter drop-shadow-md mb-1">{msg.emoji}</div>
        <div className={`px-5 py-4 text-[15px] md:text-[16px] font-medium leading-relaxed
          ${msg.align === 'left' 
            ? 'bg-[#1a1a1a] text-gray-200 rounded-3xl rounded-bl-sm border border-white/5' 
            : 'bg-[#2a2a2a] text-gray-100 rounded-3xl rounded-br-sm border border-white/10'
          } shadow-xl`}
        >
          {msg.text}
        </div>
      </div>
    </motion.div>
  );
};

const Agitation = ({ progress }) => {
  const sectionOpacity = useTransform(progress, [0.25, 0.33, 0.6, 0.66], [0, 1, 1, 0]);
  const pointerEvents = useTransform(progress, (v) => (v < 0.25 || v > 0.66) ? "none" : "auto");

  const textOpacity = useTransform(progress, [0.33, 0.4, 0.6, 0.66], [0, 1, 1, 0]);
  const yPos = useTransform(progress, [0.33, 0.66], [100, -100]);

  const [currentPain, setCurrentPain] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPain((prev) => (prev + 1) % PAIN_POINTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      style={{ opacity: sectionOpacity, pointerEvents }}
      className="absolute inset-0 w-full flex items-center justify-center overflow-hidden py-20 px-6"
    >
      
      {/* Background Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-900/10 rounded-full blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        style={{ opacity: textOpacity, y: yPos }}
        className="z-10 flex flex-col lg:flex-row items-center justify-between max-w-6xl w-full gap-16 lg:gap-8"
      >
        
        {/* Left: Pain Points Loop */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full h-[400px]">
          {/* Circular looping animations */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-72 h-72 border-4 border-yellow-500/30 rounded-full border-dashed"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute w-96 h-96 border-4 border-yellow-500/20 rounded-full hidden md:block"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-56 h-56 flex items-center justify-center"
          >
            <RefreshCcw className="text-yellow-500/30 w-full h-full p-10" strokeWidth={1} />
          </motion.div>

          <div className="h-32 flex flex-col items-center justify-center z-10 w-full">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentPain}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 whitespace-pre-line text-center drop-shadow-2xl"
              >
                {PAIN_POINTS[currentPain]}
              </motion.h2>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-10 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-semibold tracking-widest text-xs uppercase z-10 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            Endless Loop
          </div>
        </div>

        {/* Right: Chat Bubbles */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-xl relative">
          <div className="flex flex-col gap-6 w-full">
            {CHAT_MESSAGES.map((msg, index) => (
              <ChatBubble key={msg.id} msg={msg} progress={progress} index={index} />
            ))}
          </div>
        </div>

      </motion.div>
    </motion.section>
  );
};

export default Agitation;
