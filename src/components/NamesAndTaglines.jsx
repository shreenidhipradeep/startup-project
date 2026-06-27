import { useState } from 'react'
import { Tag, Sparkles, Copy, Check, Globe } from 'lucide-react'

function NameCard({ item }) {
  const [copied, setCopied] = useState(false)
  
  // Parse the structured text of one name item:
  // e.g. "1. **Zingo**: A quick saving system. Domains: zingo.com, zingo.in"
  const lines = item.split('\n')
  const titleLine = lines[0] || ''
  
  // Extract Name (either surrounded by ** or after number)
  let name = ''
  const boldMatch = titleLine.match(/\*\*(.*?)\*\*/)
  if (boldMatch) {
    name = boldMatch[1]
  } else {
    // Fallback: strip number and take first word
    name = titleLine.replace(/^\d+\.\s*/, '').split(':')[0].trim()
  }

  // Remove bold tags and numbers from explanations
  const displayTitle = titleLine.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '')
  const explanation = lines.slice(1).join('\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="glass-card rounded-2xl p-5 border-white/5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-xs font-extrabold text-indigo-400 font-sans tracking-wide">
            Startup Identity
          </span>
          <button
            onClick={handleCopy}
            className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy Name
              </>
            )}
          </button>
        </div>
        
        <div>
          <h4 className="text-base font-extrabold text-white tracking-tight">{name}</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed mt-1 font-medium italic">
            {displayTitle.includes(':') ? displayTitle.split(':')[1]?.trim() : displayTitle}
          </p>
        </div>

        {explanation && (
          <div className="text-[10px] text-slate-400 leading-relaxed border-t border-white/5 pt-2 mt-1 space-y-1">
            {explanation.split('\n').map((line, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                {line.toLowerCase().includes('domain') ? (
                  <Globe className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" />
                )}
                <span>{line.replace(/^-\s*/, '')}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TaglineRow({ text }) {
  const [copied, setCopied] = useState(false)
  const cleanText = text.replace(/^\d+\.\s*["']?|["']?$/g, '').trim()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-brand-950/20 hover:bg-slate-900/30 transition-all duration-200">
      <p className="text-xs text-slate-200 font-semibold italic">"{cleanText}"</p>
      <button
        onClick={handleCopy}
        className="p-1 rounded text-slate-400 hover:text-white transition-colors"
        title="Copy tagline"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  )
}

export default function NamesAndTaglines({ namesText, taglinesText }) {
  // Parse Names: Split by numbered list indicators e.g. "1. " or "2. "
  const rawNames = namesText ? namesText.split(/(?=\d+\.\s)/) : []
  const parsedNames = rawNames.map((item) => item.trim()).filter((item) => item.length > 0 && !item.toLowerCase().includes('here are'))

  // Parse Taglines: Split by line breaks
  const rawTaglines = taglinesText ? taglinesText.split('\n') : []
  const parsedTaglines = rawTaglines.map((item) => item.trim()).filter((item) => item.length > 0 && !item.toLowerCase().includes('here are'))

  return (
    <div className="space-y-8 w-full animate-fade-in">
      {/* Names Grid */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 px-1">
          <Tag className="w-4 h-4 text-indigo-400" />
          Startup Brand Name Ideas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parsedNames.map((item, idx) => (
            <NameCard key={idx} item={item} />
          ))}
        </div>
      </div>

      {/* Taglines List */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 px-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          High-Impact Marketing Taglines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {parsedTaglines.map((item, idx) => (
            <TaglineRow key={idx} text={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
