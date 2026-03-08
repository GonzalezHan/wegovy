import { motion, useTransform } from 'framer-motion';
import { FileSpreadsheet, FileText, Database, Table, AppWindow } from 'lucide-react';

const ELEMENT_CONFIGS = [
  { type: 'excel', label: '데이터_취합_최종.xlsx', top: 15, left: 10, rot: -12, delay: 0 },
  { type: 'sap', label: 'SAP GUI - [PRD] Transaction ZFI_01', top: 25, left: 70, rot: 8, delay: 0.2 },
  { type: 'excel', label: 'Q3_실적_진짜최종.xlsx', top: 60, left: 15, rot: -5, delay: 0.1 },
  { type: 'web', label: '인트라넷 - 그룹웨어', top: 75, left: 80, rot: 15, delay: 0.3 },
  { type: 'gsheet', label: 'TF_업무현황_공유_v3 - Google Sheets', top: 45, left: 85, rot: -8, delay: 0.4 },
  { type: 'excel', label: '마감데이터_v2.xlsx', top: 35, left: 5, rot: 12, delay: 0.15 },
  { type: 'web', label: '법인카드 승인내역 조회', top: 85, left: 30, rot: -15, delay: 0.05 },
  { type: 'doc', label: '품의서_양식.docx', top: 10, left: 50, rot: 5, delay: 0.25 },
  { type: 'sap', label: 'SAP Logon 760', top: 80, left: 55, rot: -10, delay: 0.35 },
  { type: 'web', label: '국세청 홈택스', top: 50, left: 20, rot: 18, delay: 0.2 },
  { type: 'gsheet', label: '임직원_명부_동기화 - Google Sheets', top: 20, left: 40, rot: -7, delay: 0.1 },
  { type: 'web', label: '은행 기업뱅킹', top: 65, left: 10, rot: -3, delay: 0.45 },
  { type: 'web', label: '사내 업무포털 로그인', top: 90, left: 75, rot: 5, delay: 0.5 },
  { type: 'excel', label: 'raw_data_export.csv', top: 30, left: 90, rot: -18, delay: 0.25 },
];

const getTypeStyles = (type) => {
  switch (type) {
    case 'excel': return { color: 'text-green-500 bg-green-500/10 border-green-500/30', icon: FileSpreadsheet, iconColor: 'text-green-400' };
    case 'doc': return { color: 'text-blue-500 bg-blue-500/10 border-blue-500/30', icon: FileText, iconColor: 'text-blue-400' };
    case 'sap': return { color: 'text-purple-500 bg-purple-500/10 border-purple-500/30', icon: Database, iconColor: 'text-purple-400' };
    case 'gsheet': return { color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30', icon: Table, iconColor: 'text-emerald-400' };
    case 'web': return { color: 'text-orange-500 bg-orange-500/10 border-orange-500/30', icon: AppWindow, iconColor: 'text-orange-400' };
    default: return { color: 'text-gray-500 bg-gray-500/10 border-gray-500/30', icon: FileText, iconColor: 'text-gray-400' };
  }
};

const FloatingElement = ({ config, progress }) => {
  // Parallax effect based on scroll
  const speedMultiplier = config.type === 'excel' ? 1.5 : 0.8;
  const yDirection = config.left % 2 === 0 ? -150 : -200;
  
  const y = useTransform(progress, [0, 0.33], [0, yDirection * speedMultiplier]);
  const opacity = useTransform(progress, [0, 0.15, 0.33], [0.8, 1, 0]);
  
  const { color, icon: Icon, iconColor } = getTypeStyles(config.type);

  // Add random continuous floating animation
  const animateConfig = {
    y: ["-10px", "10px"],
    rotate: [config.rot - 3, config.rot + 3],
  };

  const transitionConfig = {
    duration: 3 + (config.delay * 10), // Randomize duration
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay: config.delay * 5, // Randomize delay
  };

  return (
    <motion.div
      className={`absolute flex items-center gap-2 p-3 rounded-xl border backdrop-blur-md shadow-2xl ${color}`}
      style={{
        top: `${config.top}%`,
        left: `${config.left}%`,
        y,
        opacity,
        rotate: config.rot,
      }}
      animate={animateConfig}
      transition={transitionConfig}
    >
      <Icon size={24} className={iconColor} />
      <span className="text-sm font-bold text-white/90 whitespace-nowrap shadow-sm">{config.label}</span>
    </motion.div>
  );
};

const Problem = ({ progress }) => {
  const sectionOpacity = useTransform(progress, [0, 0.3, 0.33], [1, 1, 0]);
  const pointerEvents = useTransform(progress, (v) => v > 0.33 ? "none" : "auto");

  const titleOpacity = useTransform(progress, [0, 0.15, 0.25, 0.33], [0, 1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.15, 0.33], [50, 0, -50]);

  return (
    <motion.section 
      style={{ opacity: sectionOpacity, pointerEvents }}
      className="absolute inset-0 w-full flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Floating Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {ELEMENT_CONFIGS.map((config, index) => (
          <FloatingElement key={index} config={config} progress={progress} />
        ))}
      </div>

      <motion.div 
        style={{ opacity: titleOpacity, y: titleY }}
        className="z-10 text-center px-6 max-w-4xl backdrop-blur-sm bg-black/40 p-10 rounded-3xl border border-white/10 drop-shadow-2xl"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white/90 break-keep">
          수십 개의 엑셀 파일, 끝나지 않는 복붙,<br/>
          데이터는 넘쳐나지만 <br/>
          <span className="text-red-500/90 italic drop-shadow-lg drop-shadow-red-500/20">정작 분석할 시간이 없는 우리.</span>
        </h1>
      </motion.div>
    </motion.section>
  );
};

export default Problem;
