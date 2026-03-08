import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileSpreadsheet, FileText, Presentation, Cloud, Blocks, Bot, Laptop, Code, Sparkles } from 'lucide-react';

const GasIntro = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const codeY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const snippets = [
    `// 주간 보고서 자동 취합
const sheet = SpreadsheetApp.getActive();
const data = sheet.getDataRange().getValues();
data.forEach(row => processFinance(row));`,
    
    `// 월간 보고서 자동 발송
GmailApp.sendEmail(
  "team@finance.com",
  "Weekly Automation Report",
  "Here are the latest metrics..."
);`,

    `// SAP DB 연동
const response = UrlFetchApp.fetch(API_URL);
const metrics = JSON.parse(response.getContentText());
updateDashboard(metrics);`
  ];

  return (
    <section ref={containerRef} className="relative min-h-[120vh] py-32 flex flex-col justify-center overflow-hidden border-b border-black/5">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-yellow-400/10 flex items-center justify-center rounded-full blur-[100px] -translate-y-1/2" />
         <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-500/10 flex items-center justify-center rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 text-sm font-medium tracking-wide border border-blue-200 text-blue-600"
          >
            <Sparkles size={16} /> CORE METHODOLOGY
          </motion.div>
          
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900"
          >
             <span className="text-gradient-gas">구글 앱 스크립트</span><br/>
             <span className="text-gray-800">(Google Apps Script)</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            별도의 서버나 복잡한 설치 없이, 우리가 매일 사용하는 구글 워크스페이스(시트, 메일, 드라이브)를 프로그래밍하여 하나로 연결하는 강력한 클라우드 언어입니다.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 gap-4 pt-4"
          >
             <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm">
                <Cloud className="text-green-500" size={24}/>
                <h4 className="font-semibold text-gray-800">구글 스프레드시트 엑셀 매크로의 클라우드 진화형</h4>
             </div>
             <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm">
                <Blocks className="text-blue-500" size={24}/>
                <h4 className="font-semibold text-gray-800">G-mail, Forms, Calendar 등 구글 생태계 완벽 연동</h4>
             </div>
             <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm">
                <Bot className="text-purple-500" size={24}/>
                <h4 className="font-semibold text-gray-800">트리거 기능을 통한 특정 시간/이벤트 기반 100% 무인 자동화</h4>
             </div>
             <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm">
                <Laptop className="text-orange-500" size={24}/>
                <h4 className="font-semibold text-gray-800">클라우드 기반으로 별도의 프로그램 설치 불필요</h4>
             </div>
          </motion.div>
        </div>

        {/* Right: Visual / Code Simulation */}
        <div className="relative h-[600px] w-full perspective-1000">
          <motion.div 
            style={{ y: codeY }}
            className="absolute inset-0 flex flex-col items-center justify-center space-y-6"
          >
             {/* Floating App Icons connecting */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="p-4 rounded-full bg-[#34A853]/10 border border-[#34A853]/30 text-[#34A853] animate-bounce" style={{animationDelay: '0s'}}>
                <FileSpreadsheet size={32} />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-[#34A853] to-[#4285F4] opacity-50"></div>
              <div className="p-4 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] animate-bounce" style={{animationDelay: '0.2s'}}>
                <FileText size={32} />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-[#4285F4] to-[#FBBC04] opacity-50"></div>
              <div className="p-4 rounded-full bg-[#FBBC04]/10 border border-[#FBBC04]/30 text-[#FBBC04] animate-bounce" style={{animationDelay: '0.4s'}}>
                <Presentation size={32} />
              </div>
            </div>

            {/* Code snippets stack */}
            {snippets.map((code, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2, 
                  type: "spring", 
                  stiffness: 100 
                }}
                className={`w-full max-w-md p-6 rounded-xl bg-gray-900/95 shadow-xl font-mono text-sm leading-relaxed overflow-hidden border ${
                  index === 1 ? 'border-blue-500/40 ml-12' : 'border-gray-800'
                }`}
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 text-xs text-gray-400 flex items-center gap-1"><Code size={12}/> script.gs</span>
                </div>
                <pre className="text-gray-300 whitespace-pre-wrap">
                  <code>
                      {code.split('\n').map((line, i) => {
                          if (line.startsWith('//')) {
                              return <div key={i} className="text-gray-500 italic">{line}</div>;
                          }
                          return <div key={i}>{
                              line.split(/(\b(?:const|let|var|function|=>|SpreadsheetApp|GmailApp|UrlFetchApp|JSON)\b)/g).map((part, j) => {
                                  if (['const', 'let', 'var', 'function', '=>'].includes(part)) {
                                      return <span key={j} className="text-purple-400">{part}</span>;
                                  }
                                  if (['SpreadsheetApp', 'GmailApp', 'UrlFetchApp', 'JSON'].includes(part)) {
                                      return <span key={j} className="text-blue-400">{part}</span>;
                                  }
                                  // Simple string highlighting for this specific demo
                                  if (part.includes('"') && part.length > 2) {
                                      return <span key={j} className="text-green-400">{part}</span>;
                                  }
                                  return <span key={j}>{part}</span>;
                              })
                          }</div>;
                      })}
                  </code>
                </pre>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default GasIntro;
