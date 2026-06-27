import { useState } from 'react'
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'

// Helper to parse double asterisk bold tags
function parseBoldText(text) {
  if (!text) return ''
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-bold text-slate-100 text-glow">
          {part}
        </strong>
      )
    }
    return part
  })
}

// Custom Markdown renderer for section reports
function parseMarkdownToJSX(text) {
  if (!text) return null
  const lines = text.split('\n')
  
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        const trimmed = line.trim()

        if (trimmed === '') {
          return <div key={idx} className="h-1" />
        }

        // Headers
        if (trimmed.startsWith('### ')) {
          return (
            <h5 key={idx} className="text-xs font-bold text-slate-300 uppercase tracking-wide mt-4 mb-2 border-l-2 border-indigo-500/50 pl-2">
              {parseBoldText(trimmed.substring(4))}
            </h5>
          )
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h4 key={idx} className="text-sm font-extrabold text-indigo-400 mt-4 mb-2">
              {parseBoldText(trimmed.substring(3))}
            </h4>
          )
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h3 key={idx} className="text-base font-extrabold text-white mt-5 mb-2.5">
              {parseBoldText(trimmed.substring(2))}
            </h3>
          )
        }

        // Bullet lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 pl-2 py-0.5">
              <span className="text-indigo-400 select-none mt-1 shrink-0">•</span>
              <span className="leading-relaxed">{parseBoldText(trimmed.substring(2))}</span>
            </div>
          )
        }

        // Numbered lists (e.g. "1. **IDEA SCORE**")
        const numMatch = trimmed.match(/^(\d+)\.\s(.*)/)
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-3 mt-4 mb-3 text-xs bg-slate-900/35 border border-white/5 p-3 rounded-xl">
              <span className="bg-indigo-500/25 text-indigo-300 text-[10px] font-extrabold w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 select-none">
                {numMatch[1]}
              </span>
              <div className="text-slate-300 leading-relaxed w-full">
                {parseBoldText(numMatch[2])}
              </div>
            </div>
          )
        }

        // Default Paragraph
        return (
          <p key={idx} className="text-xs text-slate-300 leading-relaxed py-0.5">
            {parseBoldText(trimmed)}
          </p>
        )
      })}
    </div>
  )
}

export default function ReportSection({ id, title, icon: Icon, content, colorClass }) {
  const [isOpen, setIsOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.stopPropagation() // Don't collapse card when copying
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      id={`section-${id}`}
      className="glass-card rounded-2xl border-white/5 overflow-hidden shadow-lg transition-all duration-300 scroll-mt-24"
    >
      {/* Header bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-4 flex items-center justify-between cursor-pointer bg-slate-900/20 hover:bg-slate-900/40 select-none border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg border ${colorClass}`}>
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white transition-colors"
            title="Copy section content"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <div className="text-slate-400 hover:text-white">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Content panel */}
      {isOpen && (
        <div className="p-6 md:p-8 bg-brand-950/20 transition-all duration-350">
          {parseMarkdownToJSX(content)}
        </div>
      )}
    </div>
  )
}
export { parseMarkdownToJSX } // Re-export helper for other pages
