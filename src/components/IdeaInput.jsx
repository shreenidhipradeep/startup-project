import { useState } from 'react'
import { Sparkles, Code, DollarSign, Users, TrendingUp, AlertTriangle, ShieldCheck, CheckSquare, Square } from 'lucide-react'

const TEMPLATES = [
  {
    name: 'Foodtech',
    label: 'Home Cooks for Offices',
    text: 'A subscription-based lunch delivery service for corporate workers in Chennai, connecting them with verified home cooks in their local neighborhood. High quality, home-style food, delivered hot at lunchtime.'
  },
  {
    name: 'Fintech',
    label: 'Micro-Gold Savings',
    text: 'A micro-savings app for Indian college students that integrates UPI transactions, rounds up each payment to the nearest 10 rupees, and automatically invests the spare change into 24K digital gold.'
  },
  {
    name: 'Edtech',
    label: 'Vernacular Coding for Kids',
    text: 'A gamified online coding academy teaching web development and game design to kids (ages 8-15) in Tier 2 and Tier 3 Indian cities, using vernacular languages (Hindi, Tamil, Telugu) and interactive block coding.'
  }
]

const SECTIONS = [
  { id: 'idea', label: 'Idea Intelligence', desc: 'Score, readiness, & problem-solution fit', icon: Sparkles, color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5' },
  { id: 'customer', label: 'Customer Intelligence', desc: 'Personas, early adopters, & pain score', icon: Users, color: 'text-sky-400 border-sky-500/20 bg-sky-500/5' },
  { id: 'market', label: 'Market & Competition', desc: 'SWOT, competitors, & Blue Ocean angles', icon: TrendingUp, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
  { id: 'business', label: 'Business Model', desc: 'Pricing, break-even, & unit economics', icon: DollarSign, color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
  { id: 'build', label: 'Building the Startup', desc: 'MVP roadmap, tech stack, & launch list', icon: Code, color: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
  { id: 'risk', label: 'Risk & Validation', desc: 'Risks radar, compliance, & graveyard lessons', icon: AlertTriangle, color: 'text-rose-400 border-rose-500/20 bg-rose-500/5' },
  { id: 'validation', label: 'Validation Engine', desc: 'Landing page copy, waitlists, & survey questions', icon: ShieldCheck, color: 'text-teal-400 border-teal-500/20 bg-teal-500/5' },
  { id: 'traction', label: 'Traction Dashboard', desc: 'Growth roadmap, Product Hunt, & partners', icon: Sparkles, color: 'text-pink-400 border-pink-500/20 bg-pink-500/5' }
]

export default function IdeaInput({ onGenerate }) {
  const [idea, setIdea] = useState('')
  const [selectedSections, setSelectedSections] = useState(new Set(SECTIONS.map(s => s.id)))
  const [validationError, setValidationError] = useState('')

  const handleTemplateClick = (text) => {
    setIdea(text)
    setValidationError('')
  }

  const toggleSection = (id) => {
    const updated = new Set(selectedSections)
    if (updated.has(id)) {
      if (updated.size > 1) {
        updated.delete(id)
      } else {
        setValidationError('You must select at least one section to analyze.')
        return
      }
    } else {
      updated.add(id)
      setValidationError('')
    }
    setSelectedSections(updated)
  }

  const handleGenerate = () => {
    if (!idea.trim()) {
      setValidationError('Please explain your startup idea first.')
      return
    }
    if (selectedSections.size === 0) {
      setValidationError('Please select at least one section.')
      return
    }
    onGenerate(idea, Array.from(selectedSections))
  }

  return (
    <div className="w-full space-y-8 max-w-4xl animate-fade-in">
      {/* Textarea container */}
      <div className="glass-card rounded-2xl p-6 md:p-8 shadow-xl border-white/5 glow-indigo relative overflow-hidden">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="idea-text" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              1. Describe Your Startup Idea
            </label>
            <span className="text-[10px] text-slate-500 font-medium">Be as detailed as possible</span>
          </div>

          <textarea
            id="idea-text"
            className="w-full h-36 px-4 py-3 rounded-xl border border-white/10 bg-brand-950/40 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-sm resize-none transition-all leading-relaxed"
            placeholder="Describe what you want to build, who it is for, and how you plan to charge..."
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value)
              if (e.target.value.trim()) setValidationError('')
            }}
          />

          {/* Quick templates */}
          <div className="space-y-2">
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Or pick an example template to test:
            </span>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.name}
                  type="button"
                  onClick={() => handleTemplateClick(tpl.text)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
                >
                  🚀 {tpl.label} ({tpl.name})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            2. Choose Your Co-Founder Intelligence Modules
          </label>
          <button
            type="button"
            onClick={() => {
              setSelectedSections(new Set(SECTIONS.map(s => s.id)))
              setValidationError('')
            }}
            className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider transition-colors"
          >
            Select All Modules
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {SECTIONS.map((sec) => {
            const isSelected = selectedSections.has(sec.id)
            const Icon = sec.icon
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => toggleSection(sec.id)}
                className={`flex items-start text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-md shadow-indigo-500/5'
                    : 'border-white/5 bg-brand-950/40 opacity-70 hover:opacity-90 hover:border-white/10'
                }`}
              >
                <div className={`p-2 rounded-lg mr-3 ${sec.color} border shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 pr-2">
                  <h4 className="text-xs font-bold text-slate-200">{sec.label}</h4>
                  <p className="text-[10px] text-slate-400 leading-snug">{sec.desc}</p>
                </div>
                <div className="ml-auto shrink-0 self-center text-slate-500">
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Generate Action */}
      <div className="flex flex-col items-center gap-3 pt-4">
        {validationError && (
          <p className="text-xs text-rose-400 font-medium bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg animate-pulse">
            ⚠️ {validationError}
          </p>
        )}
        <button
          type="button"
          onClick={handleGenerate}
          className="relative group overflow-hidden px-8 py-3.5 rounded-xl font-bold text-base bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 text-white shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 animate-bounce-subtle"
        >
          <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          Assemble AI Co-Founder Report
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
