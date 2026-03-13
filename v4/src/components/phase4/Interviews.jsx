import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';

const leader = {
  id: 5,
  name: "terius.anim (안성환)",
  role: "성과리더 / 경영기획",
  quote: "데이터 기반의 신속하고 정확한 의사결정이 가능해졌습니다. 조직 전체의 디지털 전환(DX)을 앞당기는 핵심 성공 사례가 될 것입니다.",
  avatar: "/terius.png",
  color: "from-yellow-400 to-amber-500",
  textColor: "text-amber-600"
};

const members = [
  {
    id: 1,
    name: "gerrard.kim",
    role: "팀원 / 통합경영기획",
    quote: "과거엔 며칠씩 밤새우던 대사 작업이 이제는 클릭 한 번에 5분 만에 끝납니다. 남은 시간에는 데이터 검증과 리포팅에 더 집중할 수 있게 되었어요.",
    avatar: "/gerrard.png",
    color: "from-yellow-400 to-amber-500",
    textColor: "text-amber-600"
  },
  {
    id: 2,
    name: "mark.sim",
    role: "팀원 / 통합경영기획",
    quote: "정산 내역 누락 때문에 매번 부서 코드를 뒤지던 끔찍한 기억이 사라졌습니다. 자동화 봇이 알아서 체크해주니 너무 든든합니다.",
    avatar: "/mark.png",
    color: "from-yellow-400 to-amber-500",
    textColor: "text-amber-600"
  },
  {
    id: 3,
    name: "gonzalez.han",
    role: "팀원 / 소싱관리",
    quote: "처음엔 '코딩은 개발자나 하는 거 아니야?' 했지만, 막상 GAS로 자동화를 도입해보니 제가 직접 업무를 통제한다는 느낌이 들어 성취감이 엄청납니다.",
    avatar: "/gonzalez.png",
    color: "from-yellow-400 to-amber-500",
    textColor: "text-amber-600"
  },
  {
    id: 4,
    name: "woody.yoo",
    role: "팀원 / 전사경영기획",
    quote: "단순 반복 업무가 줄어드니 실질적인 가치 창출에 더 많은 시간을 할애할 수 있게 되었습니다. 팀 전체의 생산성이 눈에 띄게 향상되었죠.",
    avatar: "/woody.png",
    color: "from-yellow-400 to-amber-500",
    textColor: "text-amber-600"
  }
];

const AvatarCard = ({ member, idx, activeId, setActiveId, size = 'md', isLeader = false }) => {
  const sizeClass = size === 'lg'
    ? 'w-36 h-36 md:w-44 md:h-44'
    : 'w-28 h-28 md:w-36 md:h-36';

  return (
    <motion.div
      key={member.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.15 }}
      className="relative group cursor-pointer flex flex-col items-center"
      onMouseEnter={() => setActiveId(member.id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={() => setActiveId(activeId === member.id ? null : member.id)}
    >
      {/* Glow */}
      <div className={`absolute -inset-2 bg-gradient-to-tr ${member.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>

      {/* Avatar Ring */}
      <div className={`relative ${sizeClass} rounded-full p-[3px] bg-gradient-to-tr ${member.color} transform transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
        <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden bg-white relative">
          <img
            src={member.avatar}
            alt={member.name}
            className="absolute w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300"
            style={{ objectPosition: '50% 15%' }}
          />
        </div>
      </div>

      {/* Name & Role */}
      <div className={`mt-3 text-center ${member.textColor}`}>
        <p className="text-sm font-bold whitespace-nowrap">{member.name}</p>
        <p className="text-[11px] opacity-75 whitespace-nowrap">{member.role}</p>
      </div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {activeId === member.id && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: isLeader ? -10 : 0, y: isLeader ? 0 : 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`absolute z-50 pointer-events-none w-[280px] md:w-[320px] ${
              isLeader
                ? 'top-1/2 -translate-y-1/2 left-full ml-6'
                : 'bottom-full mb-4 left-1/2 -translate-x-1/2'
            }`}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-slate-200 shadow-xl text-center">
              <p className="text-sm leading-relaxed text-slate-700 font-medium">
                "{member.quote}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Interviews = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="w-full pb-24 relative flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">

        {/* Section Header */}
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

        {/* Leader Row */}
        <div className="flex justify-center mb-10">
          <AvatarCard
            isLeader
            member={leader}
            idx={0}
            activeId={activeId}
            setActiveId={setActiveId}
            size="lg"
          />
        </div>

        {/* Team Members Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {members.map((member, idx) => (
            <AvatarCard
              key={member.id}
              member={member}
              idx={idx + 1}
              activeId={activeId}
              setActiveId={setActiveId}
              size="md"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Interviews;
