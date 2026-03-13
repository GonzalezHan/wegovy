
import { motion, useTransform } from 'framer-motion';
import { Coffee } from 'lucide-react';

const CallToAction = ({ progress }) => {
  // Line chart drawing animation
  // It should animate as progress goes from 0.38 to 0.58
  const pathLength = useTransform(progress, [0.38, 0.58], [0, 1]);

  return (
    <section className="h-full w-full flex flex-col items-center justify-center relative bg-transparent pointer-events-auto">
      
      <div className="z-10 text-center px-6 max-w-4xl">
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 bg-white/5 rounded-full shadow-lg border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-400">
            <Coffee size={40} strokeWidth={1.5} />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
          이제 엑셀 대신,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            재무의 본질
          </span>에 집중할 시간입니다.
        </h2>
        
        <p className="text-xl opacity-70 font-medium mb-16 max-w-2xl mx-auto">
          데이터 분석과 전략적 의사결정에 시간과 가치를 투자하세요.
        </p>

        {/* Abstract Ascending Chart ending */}
        <div className="w-full max-w-2xl mx-auto h-40 relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
              </linearGradient>
            </defs>
            <motion.path 
              d="M 0 100 C 100 100, 150 50, 200 60 C 250 70, 300 10, 400 0" 
              fill="none" 
              stroke="url(#lineGrad)" 
              strokeWidth="6" 
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <motion.circle 
               cx="400" cy="0" r="8" 
               fill="#10b981"
               style={{ opacity: useTransform(pathLength, [0.95, 1], [0, 1]) }}
            />
          </svg>
        </div>

      </div>
    </section>
  );
};

export default CallToAction;
