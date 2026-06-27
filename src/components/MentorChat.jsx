import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, Bot, User, Sparkles, Activity } from 'lucide-react'
import { callGemini } from '../hooks/useGeminiAPI'

const QUICK_CHIPS = [
  { label: 'B2B Pivot', text: 'What if I pivot my model from direct-to-consumer (B2C) to corporate B2B SaaS? How would my product value, channels, and pricing structure change?' },
  { label: 'Investor Email', text: 'Draft a short, highly professional cold email template I can send to early-stage angel investors in India for my startup.' },
  { label: 'This Week\'s Tasks', text: 'Based on my startup concept, give me 3 specific, actionable tasks I should do this week to validate demand.' },
  { label: 'Revenue Critique', text: 'Brutally critique my monetization strategy. List the top 2 leaks and suggest how to optimize my unit economics.' }
]

export default function MentorChat({ idea, reportSummary, messages, setMessages, apiMode }) {
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

    const systemContext = `You are StartupGPT, a sharp-minded co-founder and mentor. Keep answers extremely focused on this startup. Refuse to discuss unrelated topics. Here is the startup context:
    Idea: "${idea}"
    Summary of generated business intelligence: ${reportSummary ? reportSummary.slice(0, 3000) : 'Generating details...'}
    Be honest, encouraging, and write in short, punchy paragraphs with bold items.`;

    // --- 1. DEMO MODE ---
    if (apiMode === 'demo') {
      setTimeout(() => {
        const query = text.toLowerCase()
        let reply = ""

        if (query.includes('pivot') || query.includes('b2b')) {
          reply = `Here is a **B2B Pivot Strategy** customized for this concept:\n\n1. **Target Corporate Partnerships**: Instead of selling to individual consumers, pitch this to corporate HR teams as a wellness benefit.\n2. **Direct Billing**: Charge companies on a flat monthly retainer (subscription fees) rather than micro-fees to improve cash flow predictability.\n3. **Admin Dashboard**: Provide HR with analytics dashboards showing team engagement rates.\n\nThis shift can **raise your LTV by 4.5x** and reduce customer churn to near-zero.`
        } else if (query.includes('investor') || query.includes('email') || query.includes('cold')) {
          reply = `Here is an **Investor Cold Email Template** ready to customize:\n\n**Subject**: Round-up gold wealth platform for young India - Gullak\n\nDear [Investor Name],\n\nI am the founder of Gullak, a micro-investment platform that rounds up UPI payments to buy digital gold. We are targeting India's 75M college students.\n\nIn our first 4 weeks, we've hit 2,000 signups with a ₹450 customer acquisition cost. We are raising a $50k pre-seed round to scale auto-debit NPCI mandate integrations.\n\nI would love to share our short slide deck. Do you have 5 minutes for a call this Thursday at 3 PM?\n\nBest regards,\n[Your Name]`
        } else if (query.includes('task') || query.includes('week') || query.includes('todo')) {
          reply = `Here are your **3 Immediate Tasks** to execute this week:\n\n1. **Conduct 5 Customer Interviews**: Use our generated Google Form survey questions to speak with target users in person.\n2. **Launch a Waitlist Landing Page**: Publish our generated copywriting using Carrd or Softr to collect the first 100 emails.\n3. **Onboard 2 Beta Partners**: Reach out to small local vendors or creators and get agreements for a pilot testing launch.`
        } else if (query.includes('revenue') || query.includes('critique') || query.includes('leak') || query.includes('economics')) {
          reply = `Here is a **Monetization & Unit Economics Critique**:\n\n1. **Payment Gateway Leaks**: Micro-transactions under ₹20 are heavily diluted by flat processing gateway fees. Mitigate by batching deductions once users reach a threshold of ₹50.\n2. **Freemium Churn**: Having unlimited free features hurts server costs. Restrict advanced timelines and download sheets to premium tier accounts to drive conversions.`
        } else {
          reply = `That is an excellent point! As your co-founder, my advice is to focus 100% of our energy this week on getting our first 10 organic signups to prove active demand. Building dashboards before getting users is a common failure trap. Let's design our launch waitlist first!`
        }

        const finalMessages = [...updatedMessages, { role: 'assistant', content: reply }]
        setMessages(finalMessages)
        localStorage.setItem('sg_chat_history', JSON.stringify(finalMessages))
        setLoading(false)
      }, 1500)

      return
    }

    // --- 2. GEMINI MODE (Free Real AI) ---
    if (apiMode === 'gemini') {
      try {
        const reply = await callGemini(text, systemContext, 800, updatedMessages);
        const finalMessages = [...updatedMessages, { role: 'assistant', content: reply }];
        setMessages(finalMessages)
        localStorage.setItem('sg_chat_history', JSON.stringify(finalMessages))
      } catch (err) {
        console.warn("Gemini chat failed, loading simulated co-founder response:", err)
        const query = text.toLowerCase()
        let reply = "*(API limit reached. Loaded simulated co-founder reply below)*\n\n"
        
        if (query.includes('pivot') || query.includes('b2b')) {
          reply += `Here is a **B2B Pivot Strategy**:\n\n1. **Target Corporate Partnerships**: Pitch this directly to business park management or office complexes.\n2. **Fixed Retainer**: Charge a monthly service flat fee instead of individual user transaction rates.\n3. **Analytics Dashboard**: Provide operations teams with automated dashboards showing usage metrics.`
        } else if (query.includes('investor') || query.includes('email') || query.includes('cold')) {
          reply += `Here is an **Investor Cold Email Template** ready to customize:\n\n**Subject**: B2B Smart City IoT Platform - Waste Optimization\n\nDear [Investor Name],\n\nI am the founder of our B2B smart waste monitoring solution. We help municipalities reduce collection route fuel costs by 28% using IoT sensors.\n\nWe are raising a $50k pre-seed round. I'd love to share our slide deck. Do you have 5 minutes this Thursday?\n\nBest,\n[Your Name]`
        } else if (query.includes('task') || query.includes('week') || query.includes('todo')) {
          reply += `Here are your **3 Actionable Tasks** for this week:\n\n1. **Speak with 2 municipal heads** or facility coordinators to study their trash routing problems.\n2. **Setup a waitlist page** featuring a live demo video mockup.\n3. **Map out key hardware costs** for the initial sensor prototypes.`
        } else {
          reply += `That is a solid point. As your co-founder, my recommendation is to first focus on gathering qualitative feedback from 3 early adapters in our target customer segment before drafting long-term contract structures.`
        }

        const finalMessages = [...updatedMessages, { role: 'assistant', content: reply }]
        setMessages(finalMessages)
        localStorage.setItem('sg_chat_history', JSON.stringify(finalMessages))
      } finally {
        setLoading(false)
      }
      return
    }

    // --- 3. CLAUDE MODE (Paid Real AI) ---
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
      if (!apiKey || apiKey === 'your_key_here') {
        throw new Error("Missing Anthropic API Key. Please configure your key in the local .env file.")
      }

      const apiMessages = updatedMessages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }))

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
          system: systemContext,
          messages: apiMessages.slice(-8)
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
      console.warn("Claude chat failed, loading simulated co-founder response:", err)
      const query = text.toLowerCase()
      let reply = "*(API limit reached. Loaded simulated co-founder reply below)*\n\n"

      if (query.includes('pivot') || query.includes('b2b')) {
        reply += `Here is a **B2B Pivot Strategy**:\n\n1. **Target Corporate Partnerships**: Pitch this directly to business park management or office complexes.\n2. **Fixed Retainer**: Charge a monthly service flat fee instead of individual user transaction rates.\n3. **Analytics Dashboard**: Provide operations teams with automated dashboards showing usage metrics.`
      } else if (query.includes('investor') || query.includes('email') || query.includes('cold')) {
        reply += `Here is an **Investor Cold Email Template** ready to customize:\n\n**Subject**: B2B Smart City IoT Platform - Waste Optimization\n\nDear [Investor Name],\n\nI am the founder of our B2B smart waste monitoring solution. We help municipalities reduce collection route fuel costs by 28% using IoT sensors.\n\nWe are raising a $50k pre-seed round. I'd love to share our slide deck. Do you have 5 minutes this Thursday?\n\nBest,\n[Your Name]`
      } else if (query.includes('task') || query.includes('week') || query.includes('todo')) {
        reply += `Here are your **3 Actionable Tasks** for this week:\n\n1. **Speak with 2 municipal heads** or facility coordinators to study their trash routing problems.\n2. **Setup a waitlist page** featuring a live demo video mockup.\n3. **Map out key hardware costs** for the initial sensor prototypes.`
      } else {
        reply += `That is a solid point. As your co-founder, my recommendation is to first focus on gathering qualitative feedback from 3 early adapters in our target customer segment before drafting long-term contract structures.`
      }

      const finalMessages = [...updatedMessages, { role: 'assistant', content: reply }]
      setMessages(finalMessages)
      localStorage.setItem('sg_chat_history', JSON.stringify(finalMessages))
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
              Co-Founder Mentorship Room <span className="text-[9px] text-indigo-400 font-bold ml-1 uppercase">({apiMode})</span>
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
