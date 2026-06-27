import { Sparkles, Users, TrendingUp, DollarSign, Code, AlertTriangle, ShieldCheck, ListCollapse } from 'lucide-react'

const SECTION_METADATA = {
  idea: { label: 'Idea', icon: Sparkles, color: 'text-indigo-400' },
  customer: { label: 'Customer', icon: Users, color: 'text-sky-400' },
  market: { label: 'Market', icon: TrendingUp, color: 'text-emerald-400' },
  business: { label: 'Business', icon: DollarSign, color: 'text-amber-400' },
  build: { label: 'Build', icon: Code, color: 'text-purple-400' },
  risk: { label: 'Risk', icon: AlertTriangle, color: 'text-rose-400' },
  validation: { label: 'Validation', icon: ShieldCheck, color: 'text-teal-400' },
  traction: { label: 'Traction', icon: Sparkles, color: 'text-pink-400' }
}

export default function SectionNav({ activeSections, onReset }) {
  const scrollTo = (id) => {
    const el = document.getElementById(`section-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="sticky top-[73px] z-40 w-full bg-brand-950/80 backdrop-blur-md border-b border-white/5 py-3 shadow-md shadow-brand-950/40">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase shrink-0 mr-2 flex items-center gap-1.5">
          <ListCollapse className="w-3.5 h-3.5" />
          Jump To:
        </span>
        
        {activeSections.map((secId) => {
          const meta = SECTION_METADATA[secId]
          if (!meta) return null
          const Icon = meta.icon
          return (
            <button
              key={secId}
              type="button"
              onClick={() => scrollTo(secId)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900/40 hover:bg-slate-900/80 text-[10px] font-bold text-slate-300 hover:text-white uppercase tracking-wider shrink-0 transition-all hover:scale-[1.02]"
            >
              <Icon className={`w-3 h-3 ${meta.color}`} />
              {meta.label}
            </button>
          )
        })}

        <div className="ml-auto pl-4 shrink-0">
          <button
            onClick={onReset}
            className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors shrink-0"
          >
            Reset Idea
          </button>
        </div>
      </div>
    </div>
  )
}
