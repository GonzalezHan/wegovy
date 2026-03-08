import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';

const members = [
  {
    id: 1,
    name: "김재무 책임",
    role: "결산 파트장",
    quote: "과거엔 며칠씩 밤새우던 대사 작업이 이제는 클릭 한 번에 5분 만에 끝납니다. 남은 시간에는 데이터 검증과 리포팅에 더 집중할 수 있게 되었어요.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    color: "from-blue-500 to-cyan-400",
    textColor: "text-blue-600"
  },
  {
    id: 2,
    name: "이자동 선임",
    role: "비용 정산 담당",
    quote: "정산 내역 누락 때문에 매번 부서 코드를 뒤지던 끔찍한 기억이 사라졌습니다. 알림 봇이 알아서 체크해주니 너무 든든합니다.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-600"
  },
  {
    id: 3,
    name: "박스크립트 매니저",
    role: "자금 운영",
    quote: "처음엔 '코딩은 개발자나 하는 거 아니야?' 했지만, 막상 GAS로 자동화를 도입해보니 제가 직접 업무를 통제한다는 느낌이 들어 성취감이 엄청납니다.",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    color: "from-green-400 to-emerald-500",
    textColor: "text-green-600"
  }
];

const Interviews = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="w-full pb-20 relative flex flex-col items-center justify-center">

      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        
        <div className="text-center mb-16 space-y-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center justify-center p-3 bg-purple-50 rounded-full mb-4 text-purple-600 border border-purple-100"
           >
             <MessageSquareQuote size={32} />
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-5xl font-bold text-slate-900"
           >
             숫자를 너머 <span className="text-gradient">사람</span>을 이야기하다
           </motion.h2>
           <p className="text-slate-600 text-lg">TF 구성원들이 직접 경험한 긍정적 임팩트</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative h-[500px] md:h-auto md:flex-row flex-col items-center">
          
          {/* Avatars */}
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group cursor-pointer flex flex-col items-center"
              onMouseEnter={() => setActiveId(member.id)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() => setActiveId(member.id)}
            >
              <div className={`absolute -inset-2 bg-gradient-to-tr ${member.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
              <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr ${member.color} transform transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-full h-full rounded-full border-4 border-white object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 text-center w-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ${member.textColor}`}>
                 <p className="text-sm font-bold whitespace-nowrap">{member.name}</p>
                 <p className="text-[10px] md:text-xs opacity-80 whitespace-nowrap">{member.role}</p>
              </div>

              {/* Speech Bubble Positioned Below */}
              <AnimatePresence>
                {activeId === member.id && (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: 10 }}
                     transition={{ type: "spring", stiffness: 200, damping: 20 }}
                     className="absolute top-full mt-14 md:mt-16 left-1/2 -translate-x-1/2 w-[260px] md:w-[320px] z-50 pointer-events-none"
                  >
                     <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-slate-200 shadow-xl text-center">
                        <p className="text-sm md:text-base leading-relaxed text-slate-700 font-medium">
                          "{member.quote}"
                        </p>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Interviews;
