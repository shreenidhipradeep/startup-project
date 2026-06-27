import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, Bot, User, Sparkles, Activity } from 'lucide-react'

const QUICK_CHIPS = [
  { label: 'B2B Pivot', text: 'What if I pivot my model from direct-to-consumer (B2C) to corporate B2B SaaS? How would my product value, channels, and pricing structure change?' },
  { label: 'Investor Email', text: 'Draft a short, highly professional cold email template I can send to early-stage angel investors in India for my startup.' },
  { label: 'This Week\'s Tasks', text: 'Based on my startup concept, give me 3 specific, actionable tasks I should do this week to validate demand.' },
  { label: 'Revenue Critique', text: 'Brutally critique my monetization strategy. List the top 2 leaks and suggest how to optimize my unit economics.' }
]

export default function MentorChat({ idea, reportSummary, messages, setMessages }) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || input
    if (!text.trim() || loading) return

    setInput('')
    const updatedMessages = [...messages, { role: 'user', content: text }]
    setMessages(updatedMessages)
    localStorage.setItem('sg_chat_history', JSON.stringify(updatedMessages))
    setLoading(true)

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
      if (!apiKey || apiKey === 'your_key_here') {
        throw new Error("Missing Anthropic API Key. Please configure your key in the local .env file.")
      }

      // Format messages into Claude specification
      const apiMessages = updatedMessages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }))

      // Call Anthropic API
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 800,
          system: `You are StartupGPT, a sharp-minded co-founder and mentor. Keep answers extremely focused on this startup. Refuse to discuss unrelated topics. Here is the startup context:
          Idea: "${idea}"
          Summary of generated business intelligence: ${reportSummary ? reportSummary.slice(0, 3000) : 'Generating details...'}
          Be honest, encouraging, and write in short, punchy paragraphs with bold items.`,
          messages: apiMessages.slice(-8) // Send only the last 8 messages to conserve tokens
        })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `HTTP ${res.status}`)
      }

      const data = await res.json()
      const reply = data.content.map(c => c.text || '').join('')
      
      const finalMessages = [...updatedMessages, { role: 'assistant', content: reply }]
      setMessages(finalMessages)
      localStorage.setItem('sg_chat_history', JSON.stringify(finalMessages))
    } catch (err) {
      console.error(err)
      const errorMessages = [
        ...updatedMessages,
        { role: 'assistant', content: `⚠️ **System Error**: I could not retrieve a response. Details: ${err.message}` }
      ]
      setMessages(errorMessages)
      localStorage.setItem('sg_chat_history', JSON.stringify(errorMessages))
    } finally {
      setLoading(false)
    }
  }

  const formatMessageText = (text) => {
    if (!text) return ''
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-indigo-300">{part}</strong>
      }
      return part
    })
  }

  return (
    <div className="glass-card rounded-2xl border-white/5 overflow-hidden shadow-xl flex flex-col h-[500px] w-full animate-fade-in glow-indigo">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-900/40 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Co-Founder Mentorship Room
            </h3>
            <p className="text-[9px] text-slate-400 font-medium">Equipped with full project context</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-400 bg-brand-900/50 px-2 py-1 rounded-md border border-white/5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Active Context
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-grow p-6 overflow-y-auto space-y-4 no-scrollbar bg-brand-950/20">
        {messages && messages.map((msg, index) => {
          const isAssistant = msg.role === 'assistant'
          return (
            <div
              key={index}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 border ${
                  isAssistant
                    ? 'bg-slate-900/40 border-white/5 text-indigo-400'
                    : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
                }`}
              >
                {isAssistant ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  isAssistant
                    ? 'bg-slate-900/20 border border-white/5 text-slate-300 rounded-tl-none'
                    : 'bg-indigo-500/10 border border-indigo-500/20 text-slate-200 rounded-tr-none'
                }`}
              >
                {formatMessageText(msg.content)}
              </div>
            </div>
          )
        })}

        {loading && (
          <div className="flex items-start gap-2.5 max-w-[85%] mr-auto animate-pulse">
            <div className="p-1.5 rounded-lg shrink-0 border bg-slate-900/40 border-white/5 text-indigo-400">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3.5 rounded-2xl text-xs bg-slate-900/20 border border-white/5 text-slate-400 rounded-tl-none flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              Thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="px-6 py-2 bg-slate-900/20 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 select-none">
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
          Suggestions:
        </span>
        {QUICK_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(chip.text)}
            className="px-2.5 py-1 rounded-full border border-white/5 bg-slate-900/50 hover:bg-slate-900 text-[9px] font-medium text-slate-300 hover:text-white transition-colors shrink-0"
          >
            💡 {chip.label}
          </button>
        ))}
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage()
        }}
        className="p-4 bg-slate-900/40 border-t border-white/5 flex items-center gap-3 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or request a 'What If' simulation..."
          className="flex-grow px-4 py-2 rounded-xl text-xs bg-brand-950/50 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 hover:shadow-indigo-500/20 shadow-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
