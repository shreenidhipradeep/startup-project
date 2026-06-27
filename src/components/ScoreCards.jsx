import { useEffect, useState } from 'react'
import { Award, Zap, HelpCircle } from 'lucide-react'

function ScoreRing({ score, max = 100, label, desc, colorClass, trailColorClass, textColorClass, icon: Icon }) {
  const [offset, setOffset] = useState(251.2) // Start at empty
  const percentage = (score / max) * 100
  const radius = 40
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    // Small delay to trigger initial page-load transition animation
    const timer = setTimeout(() => {
      const progressOffset = circumference - (percentage / 100) * circumference
      setOffset(progressOffset)
    }, 300)
    return () => clearTimeout(timer)
  }, [percentage, circumference])

  return (
    <div className="glass-card rounded-2xl p-5 border-white/5 flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-white/10 transition-all duration-300">
      <div className="space-y-1.5 pr-2">
        <div className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
          {label}
        </div>
        <h4 className="text-md font-bold text-slate-100">{desc}</h4>
        <p className="text-[10px] text-slate-400 leading-snug">
          {score} / {max} {score >= (max * 0.8) ? '• Exceptional' : score >= (max * 0.5) ? '• Viable' : '• High Risk'}
        </p>
      </div>

      <div className="relative w-20 h-20 shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          {/* Track circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            className={`stroke-current ${trailColorClass}`}
            strokeWidth="6"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            className={`stroke-current ${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-base font-extrabold ${textColorClass}`}>
            {score}
          </span>
          <span className="text-[8px] text-slate-500 font-semibold uppercase -mt-0.5">
            {max === 10 ? 'pts' : '%'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ScoreCards({ scores }) {
  const ideaScore = scores?.ideaScore || 0
  const painScore = scores?.painScore || 0
  const timingScore = scores?.timingScore || 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full animate-fade-in">
      <ScoreRing
        score={ideaScore}
        max={100}
        label="Idea Viability"
        desc="Startup Idea Score"
        colorClass="text-indigo-400"
        trailColorClass="text-slate-800/40"
        textColorClass="text-indigo-300"
        icon={Award}
      />
      <ScoreRing
        score={painScore}
        max={10}
        label="Customer Pain"
        desc="Urgency & Severity"
        colorClass="text-sky-400"
        trailColorClass="text-slate-800/40"
        textColorClass="text-sky-300"
        icon={Zap}
      />
      <ScoreRing
        score={timingScore}
        max={10}
        label="Market Timing"
        desc="India Readiness"
        colorClass="text-emerald-400"
        trailColorClass="text-slate-800/40"
        textColorClass="text-emerald-300"
        icon={HelpCircle}
      />
    </div>
  )
}
