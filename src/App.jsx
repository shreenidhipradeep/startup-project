import { useState } from 'react'
import { Rocket, Sparkles, AlertCircle, RefreshCw, ChevronLeft, LayoutGrid, Presentation, MessageSquare, Download, Play } from 'lucide-react'
import IdeaInput from './components/IdeaInput'
import LoadingScreen from './components/LoadingScreen'
import ScoreCards from './components/ScoreCards'
import ReportSection from './components/ReportSection'
import NamesAndTaglines from './components/NamesAndTaglines'
import SectionNav from './components/SectionNav'
import ModelCanvas from './components/ModelCanvas'
import MentorChat from './components/MentorChat'
import { callClaude } from './hooks/useClaudeAPI'
import { callGemini } from './hooks/useGeminiAPI'
import { 
  systemPrompt, 
  buildCombinedAnalysisPrompt, 
  buildCombinedBrandKitPrompt, 
  buildCombinedJsonPrompt 
} from './prompts/sectionPrompts'
import { mockFoodtech, mockFintech, mockEdtech, mockGeneric } from './prompts/mockData'

// Icons mapping for report sections
import { Users, TrendingUp, DollarSign, Code, AlertTriangle, ShieldCheck } from 'lucide-react'

const SECTION_DETAILS = {
  idea: { title: 'Idea Intelligence', icon: Sparkles, colorClass: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5' },
  customer: { title: 'Customer Intelligence', icon: Users, colorClass: 'text-sky-400 border-sky-500/20 bg-sky-500/5' },
  market: { title: 'Market & Competition', icon: TrendingUp, colorClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
  business: { title: 'Business Model', icon: DollarSign, colorClass: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
  build: { title: 'Building the Startup', icon: Code, colorClass: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
  risk: { title: 'Risk & Validation', icon: AlertTriangle, colorClass: 'text-rose-400 border-rose-500/20 bg-rose-500/5' },
  validation: { title: 'Validation Engine', icon: ShieldCheck, colorClass: 'text-teal-400 border-teal-500/20 bg-teal-500/5' },
  traction: { title: 'Traction Dashboard', icon: Sparkles, colorClass: 'text-pink-400 border-pink-500/20 bg-pink-500/5' }
}

function App() {
  // Load state from localStorage on init
  const [stage, setStage] = useState(() => localStorage.getItem('sg_stage') || 'input')
  const [idea, setIdea] = useState(() => localStorage.getItem('sg_idea') || '')
  
  // Choose AI Engine Mode: 'demo' | 'gemini' | 'claude'
  // Default to 'gemini' if VITE_GEMINI_API_KEY is populated, else default to 'demo'
  const [apiMode, setApiMode] = useState(() => {
    const saved = localStorage.getItem('sg_api_mode')
    if (saved) return saved
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY
    return (geminiKey && geminiKey !== 'your_free_key_here' && geminiKey.trim() !== '') ? 'gemini' : 'demo'
  })

  const [activeSections, setActiveSections] = useState(() => {
    const saved = localStorage.getItem('sg_active_sections')
    return saved ? JSON.parse(saved) : []
  })
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('sg_results')
    return saved ? JSON.parse(saved) : {}
  })
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('sg_scores')
    return saved ? JSON.parse(saved) : { ideaScore: 70, painScore: 7, timingScore: 7 }
  })
  const [names, setNames] = useState(() => localStorage.getItem('sg_names') || '')
  const [taglines, setTaglines] = useState(() => localStorage.getItem('sg_taglines') || '')
  const [bmc, setBmc] = useState(() => {
    const saved = localStorage.getItem('sg_bmc')
    return saved ? JSON.parse(saved) : null
  })
  const [pitchDeck, setPitchDeck] = useState(() => localStorage.getItem('sg_pitch_deck') || '')
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('sg_chat_history')
    return saved ? JSON.parse(saved) : []
  })
  
  const [error, setError] = useState('')

  const handleModeChange = (mode) => {
    setApiMode(mode)
    localStorage.setItem('sg_api_mode', mode)
  }

  const fetchSection = async (key, prompt, system, maxTokens) => {
    try {
      if (apiMode === 'gemini') {
        return await callGemini(prompt, system, maxTokens)
      }
      return await callClaude(prompt, system, maxTokens)
    } catch (err) {
      console.error(`Error loading ${key} section:`, err)
      return `### Connection Error\nCould not compile the **${key}** module. Details: ${err.message}.`
    }
  }

  const handleGenerate = async (ideaText, selectedSections) => {
    setIdea(ideaText)
    setActiveSections(selectedSections)
    setStage('loading')
    setError('')

    // --- 1. DEMO MOCK RUNTIME ---
    if (apiMode === 'demo') {
      const text = ideaText.toLowerCase()
      let selectedMock = mockGeneric

      if (
        text.includes('food') || 
        text.includes('cook') || 
        text.includes('meal') || 
        text.includes('lunch') || 
        text.includes('eat') || 
        text.includes('kitchen') || 
        text.includes('office') || 
        text.includes('catering')
      ) {
        selectedMock = mockFoodtech
      } else if (
        text.includes('gold') || 
        text.includes('save') || 
        text.includes('upi') || 
        text.includes('penny') || 
        text.includes('coin') || 
        text.includes('finance') || 
        text.includes('student') || 
        text.includes('money')
      ) {
        selectedMock = mockFintech
      } else if (
        text.includes('code') || 
        text.includes('school') || 
        text.includes('vernacular') || 
        text.includes('kid') || 
        text.includes('teach') || 
        text.includes('language') || 
        text.includes('coding')
      ) {
        selectedMock = mockEdtech
      }

      setTimeout(() => {
        const textReports = {}
        selectedSections.forEach((secId) => {
          textReports[secId] = selectedMock.results[secId] || "Mock analysis section details loaded successfully."
        })

        const initialChat = [
          {
            role: 'assistant',
            content: `Hello! I'm your Startup Co-Founder (Demo Mode). I've analyzed your concept: **"${ideaText}"**.\n\nAsk me anything! We can brainstorm a B2B pivot, write investor cold emails, plan customer acquisition, or simulate "What If" scenarios. What's on your mind?`
          }
        ]

        setResults(textReports)
        setScores(selectedMock.scores)
        setBmc(selectedMock.bmc)
        setNames(selectedMock.names)
        setTaglines(selectedMock.taglines)
        setPitchDeck(selectedMock.pitchDeck)
        setChatHistory(initialChat)
        setStage('results')

        // Save to localStorage
        localStorage.setItem('sg_stage', 'results')
        localStorage.setItem('sg_idea', ideaText)
        localStorage.setItem('sg_active_sections', JSON.stringify(selectedSections))
        localStorage.setItem('sg_results', JSON.stringify(textReports))
        localStorage.setItem('sg_scores', JSON.stringify(selectedMock.scores))
        localStorage.setItem('sg_names', selectedMock.names)
        localStorage.setItem('sg_taglines', selectedMock.taglines)
        if (selectedMock.bmc) localStorage.setItem('sg_bmc', JSON.stringify(selectedMock.bmc))
        localStorage.setItem('sg_pitch_deck', selectedMock.pitchDeck)
        localStorage.setItem('sg_chat_history', JSON.stringify(initialChat))
      }, 2500)

      return
    }

    // --- 2. CONSOLIDATED REAL AI RUNTIME (Resolves Rate Limits & Quotas) ---
    // We consolidate what used to be 13 separate calls into 3 requests to avoid exceeding rate limits (5 RPM on Gemini free)
    const promises = [
      fetchSection('analysis', buildCombinedAnalysisPrompt(ideaText, selectedSections), systemPrompt, 7000),
      fetchSection('brandkit', buildCombinedBrandKitPrompt(ideaText), systemPrompt, 1800),
      fetchSection('jsondata', buildCombinedJsonPrompt(ideaText), 'Return only valid JSON.', 1000)
    ]

    try {
      const resultsArray = await Promise.all(promises)

      const analysisOutput = resultsArray[0]
      const brandKitOutput = resultsArray[1]
      const jsonOutput = resultsArray[2]

      // A. Parse Analysis Sections
      const textReports = {}
      selectedSections.forEach((secId) => {
        // Loose match regex to support different output headings (e.g. ===IDEA===, ### IDEA, **IDEA**)
        const regex = new RegExp(`(?:===|###|#|\\*\\*|\\b)${secId.toUpperCase()}(?:===|\\b|\\*\\*)\\s*([\\s\\S]*?)(?=(===|###|#|\\*\\*|\\b)(?:IDEA|CUSTOMER|MARKET|BUSINESS|BUILD|RISK|VALIDATION|TRACTION)(?:===|\\b|\\*\\*)|$)`, 'i');
        const match = analysisOutput.match(regex)
        
        if (match && match[1].trim().length > 10) {
          textReports[secId] = match[1].trim()
        } else {
          // Fallback: If only 1 section was selected, output the whole result
          if (selectedSections.length === 1 && !analysisOutput.includes("Connection Error")) {
            textReports[secId] = analysisOutput.trim()
          } else {
            textReports[secId] = analysisOutput.includes("Connection Error")
              ? analysisOutput
              : `Module analysis processed. Complete generated contents available below:\n\n${analysisOutput}`
          }
        }
      })

      // B. Parse Brand Kit
      let retrievedNames = ''
      let retrievedTaglines = ''
      let retrievedPitchDeck = ''

      const nameMatch = brandKitOutput.match(/===NAMES===([\s\S]*?)(?=(===TAGLINES===|===PITCH===|$))/i)
      const taglineMatch = brandKitOutput.match(/===TAGLINES===([\s\S]*?)(?=(===NAMES===|===PITCH===|$))/i)
      const pitchMatch = brandKitOutput.match(/===PITCH===([\s\S]*?)(?=(===NAMES===|===TAGLINES===|$))/i)

      if (nameMatch) retrievedNames = nameMatch[1].trim()
      else retrievedNames = brandKitOutput.includes("Connection Error") ? brandKitOutput : "Names generation compiled."

      if (taglineMatch) retrievedTaglines = taglineMatch[1].trim()
      else retrievedTaglines = brandKitOutput.includes("Connection Error") ? brandKitOutput : "Taglines generation compiled."

      if (pitchMatch) retrievedPitchDeck = pitchMatch[1].trim()
      else retrievedPitchDeck = brandKitOutput.includes("Connection Error") ? brandKitOutput : "Pitch deck outline compiled."

      // C. Parse JSON Scores & BMC
      let parsedScores = { ideaScore: 78, painScore: 8, timingScore: 8 }
      let parsedBmc = null

      try {
        const cleanJson = jsonOutput.replace(/```json/g, '').replace(/```/g, '').trim()
        const parsedData = JSON.parse(cleanJson)
        parsedScores = {
          ideaScore: parsedData.ideaScore || 78,
          painScore: parsedData.painScore || 8,
          timingScore: parsedData.timingScore || 8
        }
        parsedBmc = parsedData.bmc || null
      } catch (e) {
        console.error("Failed to parse combined JSON data, falling back.", e)
        if (jsonOutput.includes("Connection Error")) {
          // Keep default fallbacks for scores
        }
      }

      const initialChat = [
        {
          role: 'assistant',
          content: `Hello! I'm your Startup Co-Founder (${apiMode === 'gemini' ? 'Gemini Mode' : 'Claude Mode'}). I've analyzed your concept: **"${ideaText}"**.\n\nAsk me anything! We can brainstorm a B2B pivot, write investor cold emails, plan customer acquisition, or simulate "What If" scenarios. What's on your mind?`
        }
      ]

      setResults(textReports)
      setScores(parsedScores)
      setBmc(parsedBmc)
      setNames(retrievedNames)
      setTaglines(retrievedTaglines)
      setPitchDeck(retrievedPitchDeck)
      setChatHistory(initialChat)
      setStage('results')

      // Save to localStorage
      localStorage.setItem('sg_stage', 'results')
      localStorage.setItem('sg_idea', ideaText)
      localStorage.setItem('sg_active_sections', JSON.stringify(selectedSections))
      localStorage.setItem('sg_results', JSON.stringify(textReports))
      localStorage.setItem('sg_scores', JSON.stringify(parsedScores))
      localStorage.setItem('sg_names', retrievedNames)
      localStorage.setItem('sg_taglines', retrievedTaglines)
      if (parsedBmc) localStorage.setItem('sg_bmc', JSON.stringify(parsedBmc))
      localStorage.setItem('sg_pitch_deck', retrievedPitchDeck)
      localStorage.setItem('sg_chat_history', JSON.stringify(initialChat))
    } catch (err) {
      console.error(err)
      setError(err.message || 'Fatal generation error. Please check your API key.')
      setStage('input')
    }
  }

  const handleReset = () => {
    setStage('input')
    setIdea('')
    setResults({})
    setBmc(null)
    setNames('')
    setTaglines('')
    setPitchDeck('')
    setChatHistory([])
    setError('')

    // Clear localStorage
    localStorage.removeItem('sg_stage')
    localStorage.removeItem('sg_idea')
    localStorage.removeItem('sg_active_sections')
    localStorage.removeItem('sg_results')
    localStorage.removeItem('sg_scores')
    localStorage.removeItem('sg_names')
    localStorage.removeItem('sg_taglines')
    localStorage.removeItem('sg_bmc')
    localStorage.removeItem('sg_pitch_deck')
    localStorage.removeItem('sg_chat_history')
  }

  const handleDownload = () => {
    let md = `# StartupGPT 2.0 - Venture Validation Report\n\n`;
    md += `### Original Concept\n> "${idea}"\n\n`;
    md += `### Metrics Dashboard\n`;
    md += `- **Venture Score**: ${scores.ideaScore}/100\n`;
    md += `- **Customer Pain Score**: ${scores.painScore}/10\n`;
    md += `- **Market Timing Score**: ${scores.timingScore}/10\n\n`;
    
    if (names) {
      md += `## Suggested Startup Names\n${names}\n\n`;
    }
    if (taglines) {
      md += `## High-Impact Taglines\n${taglines}\n\n`;
    }
    if (bmc) {
      md += `## HBS Business Model Canvas\n\n`;
      md += `| Key Partners | Key Activities | Value Propositions | Customer Relationships | Customer Segments |\n`;
      md += `| --- | --- | --- | --- | --- |\n`;
      md += `| ${bmc.keyPartners.replace(/\n/g, '<br>')} | ${bmc.keyActivities.replace(/\n/g, '<br>')} | ${bmc.valuePropositions.replace(/\n/g, '<br>')} | ${bmc.customerRelationships.replace(/\n/g, '<br>')} | ${bmc.customerSegments.replace(/\n/g, '<br>')} |\n\n`;
      md += `| Cost Structure | Channels & Revenue |\n`;
      md += `| --- | --- |\n`;
      md += `| ${bmc.costStructure.replace(/\n/g, '<br>')} | ${bmc.channels.replace(/\n/g, '<br>')}<br><br>${bmc.revenueStreams.replace(/\n/g, '<br>')} |\n\n`;
    }
    
    Object.entries(results).forEach(([key, value]) => {
      md += `## ${SECTION_DETAILS[key]?.title || key.toUpperCase()}\n${value}\n\n`;
    });
    
    if (pitchDeck) {
      md += `## Investor Pitch Deck Outline\n${pitchDeck}\n\n`;
    }
    
    md += `\n---\n*Report compiled via StartupGPT 2.0 on ${new Date().toLocaleDateString()}*`;
    
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `startupgpt-blueprint-${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert("Please allow popups to download the PDF report.")
      return
    }

    const formatMarkdownToHtml = (text) => {
      if (!text) return ''
      return text
        .replace(/### (.*?)\n/g, '<h3 style="color:#0f172a; margin-top:15px; margin-bottom:5px; font-size:14px;">$1</h3>')
        .replace(/## (.*?)\n/g, '<h2 style="color:#4f46e5; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; font-size:18px; margin-top:20px;">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>StartupGPT - Venture Blueprint: ${idea}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #334155;
              padding: 40px;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 3px double #e2e8f0;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title { color: #4f46e5; font-size: 28px; font-weight: 700; margin: 0; }
            .subtitle { color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }
            .concept { background: #f8fafc; border-left: 4px solid #4f46e5; padding: 15px; border-radius: 4px; margin-bottom: 30px; font-style: italic; }
            .metrics { display: flex; gap: 20px; margin-bottom: 35px; }
            .metric-card { border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; flex: 1; text-align: center; background: #fff; }
            .metric-title { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
            .metric-value { font-size: 26px; font-weight: 700; color: #4f46e5; margin-top: 5px; }
            .section-title { color: #1e1b4b; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; font-size: 18px; margin-top: 35px; text-transform: uppercase; letter-spacing: 0.5px; }
            .box-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 30px; }
            .box { border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; background: #fafafa; }
            .box h4 { margin: 0 0 6px 0; color: #4f46e5; font-size: 12px; text-transform: uppercase; }
            .box p { margin: 0; font-size: 12px; color: #475569; }
            .report-block { font-size: 13px; color: #334155; }
            pre { background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; font-family: monospace; white-space: pre-wrap; font-size: 12px; }
            @media print {
              body { padding: 20px; }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">StartupGPT Venture Blueprint</h1>
            <div class="subtitle">AI Co-Founder Actionable Analysis</div>
          </div>
          
          <div class="concept">
            <strong>Venture Concept:</strong> "${idea}"
          </div>
          
          <div class="metrics">
            <div class="metric-card">
              <div class="metric-title">Startup Idea Score</div>
              <div class="metric-value">${scores.ideaScore}/100</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Customer Pain Severity</div>
              <div class="metric-value">${scores.painScore}/10</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Market Timing Rating</div>
              <div class="metric-value">${scores.timingScore}/10</div>
            </div>
          </div>
    `)

    if (names) {
      printWindow.document.write(`
        <h2 class="section-title">Suggested Startup Names</h2>
        <div class="report-block">${formatMarkdownToHtml(names)}</div>
      `)
    }

    if (taglines) {
      printWindow.document.write(`
        <h2 class="section-title">High-Impact Taglines</h2>
        <div class="report-block">${formatMarkdownToHtml(taglines)}</div>
      `)
    }

    if (bmc) {
      printWindow.document.write(`
        <h2 class="section-title page-break">Business Model Canvas</h2>
        <div class="box-grid">
          <div class="box"><h4>Value Propositions</h4><p>${bmc.valuePropositions}</p></div>
          <div class="box"><h4>Customer Segments</h4><p>${bmc.customerSegments}</p></div>
          <div class="box"><h4>Key Activities</h4><p>${bmc.keyActivities}</p></div>
          <div class="box"><h4>Key Partners</h4><p>${bmc.keyPartners}</p></div>
          <div class="box"><h4>Key Resources</h4><p>${bmc.keyResources}</p></div>
          <div class="box"><h4>Customer Relationships</h4><p>${bmc.customerRelationships}</p></div>
          <div class="box"><h4>Channels</h4><p>${bmc.channels}</p></div>
          <div class="box"><h4>Cost Structure</h4><p>${bmc.costStructure}</p></div>
          <div class="box"><h4>Revenue Streams</h4><p>${bmc.revenueStreams}</p></div>
        </div>
      `)
    }

    Object.entries(results).forEach(([key, val]) => {
      const sectionTitle = SECTION_DETAILS[key]?.title || key.toUpperCase()
      printWindow.document.write(`
        <h2 class="section-title page-break">${sectionTitle}</h2>
        <div class="report-block">${formatMarkdownToHtml(val)}</div>
      `)
    })

    if (pitchDeck) {
      printWindow.document.write(`
        <h2 class="section-title page-break">Investor Pitch Deck Outline</h2>
        <div class="report-block">${formatMarkdownToHtml(pitchDeck)}</div>
      `)
    }

    printWindow.document.write(`
          <div style="margin-top:50px; text-align:center; font-size:10px; color:#94a3b8; border-top:1px dashed #cbd5e1; padding-top:15px;" class="page-break">
            Report compiled by StartupGPT 2.0 on ${new Date().toLocaleDateString()}
          </div>
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()

    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 600)
  }

  const getReportSummaryText = () => {
    let summary = ''
    Object.entries(results).forEach(([key, val]) => {
      summary += `${key.toUpperCase()}:\n${val.slice(0, 800)}\n\n`
    })
    if (names) summary += `NAME SUGGESTIONS:\n${names.slice(0, 400)}\n\n`
    if (taglines) summary += `TAGLINE SUGGESTIONS:\n${taglines.slice(0, 400)}\n\n`
    return summary
  }

  return (
    <div className="min-h-screen bg-brand-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="border-b border-white/5 bg-brand-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleReset}>
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-md shadow-indigo-500/10">
              <Rocket className="w-5 h-5 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight font-sans">
                StartupGPT <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">2.0</span>
              </h1>
              <p className="text-[9px] text-slate-400 font-medium">Your AI Co-Founder Platform</p>
            </div>
          </div>

          {/* Engine Selector Segmented Control */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => handleModeChange('demo')}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase transition-all select-none ${
                  apiMode === 'demo' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Demo
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('gemini')}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase transition-all select-none ${
                  apiMode === 'gemini' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
                title="Use Gemini 2.5 Flash - Free AI Key"
              >
                Gemini
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('claude')}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase transition-all select-none ${
                  apiMode === 'claude' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
                title="Use Claude 3.5 Sonnet - Paid API Key"
              >
                Claude
              </button>
            </div>

            {stage === 'results' && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-xl border border-white/5 bg-white/5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                New
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Sticky pill section nav */}
      {stage === 'results' && (
        <SectionNav activeSections={activeSections} onReset={handleReset} />
      )}

      {/* Main Section */}
      <main className="max-w-5xl mx-auto px-4 py-10 flex-grow flex flex-col items-center justify-center w-full relative z-10">
        {error && (
          <div className="mb-6 w-full max-w-2xl bg-rose-500/10 border border-rose-500/25 text-rose-300 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Execution interrupted</h4>
              <p className="text-xs text-slate-400">{error}</p>
            </div>
          </div>
        )}

        {/* Setup Stage */}
        {stage === 'input' && (
          <div className="w-full flex flex-col items-center space-y-8">
            <div className="text-center max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium">
                <Sparkles className="w-3 h-3 text-indigo-400 animate-spin" />
                Real-Time AI Integrations
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 font-sans leading-tight">
                Launch Your Idea With Premium AI Mentorship
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Describe your startup vision. We will run parallel engines to construct brand name candidates, score viability metrics, and format full-scale marketing playbooks.
              </p>
            </div>

            <IdeaInput onGenerate={handleGenerate} />
          </div>
        )}

        {/* Loading Screen */}
        {stage === 'loading' && <LoadingScreen />}

        {/* Complete Results Display */}
        {stage === 'results' && (
          <div className="w-full max-w-4xl space-y-10 animate-fade-in">
            
            {/* 1. Score dashboard cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1 flex-wrap gap-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Venture Metric Indicators
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-300 transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-white/10 active:scale-[0.98]"
                    title="Download as Markdown file (.md)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download (.md)
                  </button>
                  <button
                    onClick={handlePrintPdf}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-xl hover:bg-indigo-500/20 active:scale-[0.98]"
                    title="Print report or save as PDF"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </div>
              </div>
              <ScoreCards scores={scores} />
            </div>

            {/* 2. Names & Taglines generator row */}
            {(names || taglines) && (
              <NamesAndTaglines namesText={names} taglinesText={taglines} />
            )}

            {/* 3. Business Model Canvas Grid */}
            {bmc && (
              <ModelCanvas bmcData={bmc} />
            )}

            {/* 4. Render analytical reports */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                Venture Intelligence Reports
              </h3>
              {activeSections.map((secId) => {
                const details = SECTION_DETAILS[secId]
                const content = results[secId]
                if (!details || !content) return null

                return (
                  <ReportSection
                    key={secId}
                    id={secId}
                    title={details.title}
                    icon={details.icon}
                    content={content}
                    colorClass={details.colorClass}
                  />
                )
              })}

              {/* Pitch deck outline card */}
              {pitchDeck && (
                <ReportSection
                  id="pitchdeck"
                  title="10-Slide Investor Pitch Deck Outline"
                  icon={Presentation}
                  content={pitchDeck}
                  colorClass="text-purple-400 border-purple-500/20 bg-purple-500/5"
                />
              )}
            </div>

            {/* 5. AI Mentor Chat Room */}
            {chatHistory && (
              <div className="space-y-3 pt-6 border-t border-white/5 scroll-mt-24" id="section-chat">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  Venture Mentorship Chat
                </h3>
                <MentorChat
                  idea={idea}
                  reportSummary={getReportSummaryText()}
                  messages={chatHistory}
                  setMessages={setChatHistory}
                  apiMode={apiMode}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-500 mt-12">
        <p>© {new Date().getFullYear()} StartupGPT. Powered by Claude 3.5 Sonnet & Gemini 2.5 Flash.</p>
      </footer>
    </div>
  )
}

export default App
