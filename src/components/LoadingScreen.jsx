import { useState, useEffect } from 'react'
import { Sparkles, Brain, Cpu, BarChart3, ShieldCheck, Heart } from 'lucide-react'

const LOADING_STEPS = [
  { icon: Brain, text: "Analyzing startup viability & market fit..." },
  { icon: Sparkles, text: "Scanning competitor strengths & weaknesses..." },
  { icon: Cpu, text: "Synthesizing early adopter personas & behaviors..." },
  { icon: BarChart3, text: "Calculating TAM, SAM, SOM & unit economics..." },
  { icon: ShieldCheck, text: "Structuring regulatory checks & risk matrix..." },
  { icon: Heart, text: "Generating taglines, names & cold email templates..." }
]

export default function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length)
    }, 2200) // Cycle every 2.2 seconds

    return () => clearInterval(interval)
  }, [])

  const CurrentIcon = LOADING_STEPS[stepIndex].icon

  return (
    <div className="w-full max-w-md mx-auto p-8 glass-card rounded-2xl border-white/5 shadow-2xl relative overflow-hidden animate-fade-in glow-indigo text-center">
      {/* Background glow lines */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
      
      {/* Animated glowing spinner */}
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-purple-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border border-dashed border-white/10 animate-spin-reverse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <CurrentIcon className="w-7 h-7 text-indigo-400 animate-pulse transition-all duration-300" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-md font-bold tracking-wider text-slate-200 uppercase">
            StartupGPT Intelligence
          </h3>
          <p className="text-[10px] font-semibold text-indigo-400 mt-0.5 tracking-widest uppercase">
            Formulating Business Plan
          </p>
        </div>

        {/* Dynamic message */}
        <div className="h-10 flex items-center justify-center">
          <p className="text-xs text-slate-300 font-medium transition-all duration-300 animate-fade-in">
            {LOADING_STEPS[stepIndex].text}
          </p>
        </div>

        {/* Progress simulation dots */}
        <div className="flex justify-center gap-1.5 pt-2">
          {LOADING_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-350 ${
                idx === stepIndex ? 'w-6 bg-indigo-500' : 'w-1.5 bg-slate-800'
              }`}
            />
          ))}
        </div>

        <div className="border-t border-white/5 pt-4 mt-2">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Running 8 Claude API operations in parallel.<br />
            Estimated wait time: 4 - 8 seconds.
          </p>
        </div>
      </div>
    </div>
  )
}
