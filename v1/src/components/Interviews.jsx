import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, X } from 'lucide-react';

const members = [
  {
    id: 1,
    name: "김재무 책임",
    role: "결산 파트장",
    quote: "과거엔 며칠씩 밤새우던 대사 작업이 이제는 클릭 한 번에 5분 만에 끝납니다. 남은 시간에는 데이터 검증과 리포팅에 더 집중할 수 있게 되었어요.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    name: "이자동 선임",
    role: "비용 정산 담당",
    quote: "정산 내역 누락 때문에 매번 부서 코드를 뒤지던 끔찍한 기억이 사라졌습니다. 알림 봇이 알아서 체크해주니 너무 든든합니다.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "박스크립트 매니저",
    role: "자금 운영",
    quote: "처음엔 '코딩은 개발자나 하는 거 아니야?' 했지만, 막상 GAS로 자동화를 도입해보니 제가 직접 업무를 통제한다는 느낌이 들어 성취감이 엄청납니다.",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    color: "from-green-400 to-emerald-500"
  }
];

const Interviews = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="min-h-screen py-32 bg-background relative flex items-center border-b border-white/5 overflow-hidden">
      
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        
        <div className="text-center mb-24 space-y-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center justify-center p-3 glass-panel rounded-full mb-4 text-brand-purple"
           >
             <MessageSquareQuote size={32} />
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-5xl font-bold"
           >
             숫자를 너머 <span className="text-gradient">사람</span>을 이야기하다
           </motion.h2>
           <p className="text-muted-foreground text-lg">TF 구성원들이 직접 경험한 긍정적 임팩트</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative h-[500px] md:h-auto md:flex-row flex-col items-center">
          
          <AnimatePresence>
            {activeId && (
              <motion.div
                 initial={{ opacity: 0, scale: 0.8, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.8, y: 20 }}
                 transition={{ type: "spring", stiffness: 200, damping: 20 }}
                 className="fixed md:absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-auto md:bottom-full md:mb-12 md:left-1/2 md:-translate-x-1/2 w-[90%] md:w-[450px]"
              >
                 <div className="relative glass-panel rounded-2xl p-8 border border-white/20 shadow-2xl bg-card/80 backdrop-blur-2xl">
                    <button 
                      onClick={() => setActiveId(null)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr ${members.find(m => m.id === activeId).color}`}>
                        <img 
                          src={members.find(m => m.id === activeId).avatar} 
                          alt="avatar" 
                          className="w-full h-full rounded-full border-2 border-background object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{members.find(m => m.id === activeId).name}</h4>
                        <p className="text-sm text-brand-purple">{members.find(m => m.id === activeId).role}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg leading-relaxed text-gray-200">
                      "{members.find(m => m.id === activeId).quote}"
                    </p>

                    {/* Chat Bubble Tail (Desktop only) */}
                    <div className="hidden md:block absolute -bottom-4 left-1/2 w-8 h-8 glass-panel bg-card/80 backdrop-blur-2xl border-r border-b border-white/20 transform -translate-x-1/2 rotate-45"></div>
                 </div>
                 
                 {/* Mobile Overlay */}
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm md:hidden"
                   onClick={() => setActiveId(null)}
                 />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatars */}
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setActiveId(member.id)}
              onClick={() => setActiveId(member.id)}
            >
              <div className={`absolute -inset-2 bg-gradient-to-tr ${member.color} rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`}></div>
              <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr ${member.color} transform transition-transform duration-300 group-hover:scale-110`}>
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-full h-full rounded-full border-4 border-background object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                 <p className="text-sm font-bold whitespace-nowrap">{member.name}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Interviews;
