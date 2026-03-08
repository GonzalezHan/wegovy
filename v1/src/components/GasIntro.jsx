import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, FileText, Calendar, Code, Activity, Database, Sparkles } from 'lucide-react';

const GasIntro = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const codeY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const snippets = [
    `// Automate data entry
const sheet = SpreadsheetApp.getActive();
const data = sheet.getDataRange().getValues();
data.forEach(row => processFinance(row));`,
    
    `// Send automated reports
GmailApp.sendEmail(
  "team@finance.com",
  "Weekly Automation Report",
  "Here are the latest metrics..."
);`,

    `// Connect APIs seamlessly
const response = UrlFetchApp.fetch(API_URL);
const metrics = JSON.parse(response.getContentText());
updateDashboard(metrics);`
  ];

  return (
    <section ref={containerRef} className="relative min-h-[120vh] py-32 bg-background flex flex-col justify-center overflow-hidden border-b border-white/5">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-gas-color/5 flex items-center justify-center rounded-full blur-[100px] -translate-y-1/2" />
         <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-brand-indigo/5 flex items-center justify-center rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium tracking-wide border-brand-purple/30 text-brand-purple"
          >
            <Sparkles size={16} /> CORE METHODOLOGY
          </motion.div>
          
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-4xl md:text-6xl font-bold tracking-tight"
          >
             <span className="text-gradient-gas">구글 앱 스크립트</span><br/>
             (Google Apps Script)
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            기존의 구글 워크스페이스(Docs, Sheets, Gmail 등)를 하나의 유기적인 생태계로 묶어주는 강력한 연결 고리입니다. 
            단 몇 줄의 코드로 반복적인 파일 조작, 이메일 발송, 외부 데이터 연동을 완벽히 자동화합니다.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 gap-6 pt-4"
          >
             <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <Activity className="text-green-400 mb-2" size={24}/>
                <h4 className="font-semibold text-lg">실시간 데이터 연동</h4>
                <p className="text-sm text-muted-foreground mt-1">분산된 데이터를 즉시 취합</p>
             </div>
             <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <Database className="text-blue-400 mb-2" size={24}/>
                <h4 className="font-semibold text-lg">워크플로우 통합</h4>
                <p className="text-sm text-muted-foreground mt-1">승인, 발송, 기록을 한 번에</p>
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
              <div className="p-4 rounded-full bg-[#EA4335]/10 border border-[#EA4335]/30 text-[#EA4335] animate-bounce" style={{animationDelay: '0s'}}>
                <Mail size={32} />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-[#EA4335] to-[#34A853] opacity-50"></div>
              <div className="p-4 rounded-full bg-[#34A853]/10 border border-[#34A853]/30 text-[#34A853] animate-bounce" style={{animationDelay: '0.2s'}}>
                <FileText size={32} />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-[#34A853] to-[#4285F4] opacity-50"></div>
              <div className="p-4 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] animate-bounce" style={{animationDelay: '0.4s'}}>
                <Calendar size={32} />
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
                className={`w-full max-w-md p-6 rounded-xl glass-panel font-mono text-sm leading-relaxed overflow-hidden border ${
                  index === 1 ? 'border-brand-indigo/40 ml-12' : 'border-white/10'
                }`}
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <span className="ml-2 text-xs text-muted-foreground flex items-center gap-1"><Code size={12}/> script.gs</span>
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
                                      return <span key={j} className="text-brand-purple">{part}</span>;
                                  }
                                  if (['SpreadsheetApp', 'GmailApp', 'UrlFetchApp', 'JSON'].includes(part)) {
                                      return <span key={j} className="text-brand-blue">{part}</span>;
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
