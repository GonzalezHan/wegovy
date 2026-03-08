import React from 'react'
import Hero from './components/Hero'
import Introduction from './components/Introduction'
import GasIntro from './components/GasIntro'
import Cases from './components/Cases'
import Interviews from './components/Interviews'
import Roadmap from './components/Roadmap'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-brand-purple/30 selection:text-white">
      <Hero />
      <Introduction />
      <GasIntro />
      <Cases />
      <Interviews />
      <Roadmap />
      
      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5 pb-24 md:pb-8">
        <p>© 2026 재무부서 업무자동화 TF (Business Automation TF). Google Apps Script is a trademark of Google LLC.</p>
      </footer>
    </div>
  )
}

export default App
