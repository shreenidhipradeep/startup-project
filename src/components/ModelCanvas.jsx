import { Users, Activity, Key, Gift, Heart, Send, Target, Wallet, CreditCard, Copy, Check, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { parseMarkdownToJSX } from './ReportSection'

function CanvasBlock({ title, icon: Icon, content, colorClass, isHalfHeight }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content || '')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={`glass-card rounded-2xl p-5 border-white/5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300 ${isHalfHeight ? 'h-[175px]' : 'h-[366px]'} md:h-auto`}>
      <div className="space-y-2 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
            <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
            {title}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            title="Copy block content"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
        <div className="text-[10px] text-slate-300 leading-relaxed max-h-[300px] overflow-y-auto">
          {content ? parseMarkdownToJSX(content) : <span className="text-slate-600 italic">No details available.</span>}
        </div>
      </div>
    </div>
  )
}

export default function ModelCanvas({ bmcData }) {
  if (!bmcData) return null

  return (
    <div className="space-y-4 w-full animate-fade-in">
      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 px-1">
        <LayoutDashboard className="w-4 h-4 text-indigo-400" />
        Business Model Canvas (HBS Standard)
      </h3>

      {/* Main 9-box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Col 1: Key Partners */}
        <div className="md:col-span-1 md:flex md:flex-col">
          <CanvasBlock
            title="Key Partners"
            icon={Users}
            content={bmcData.keyPartners}
            colorClass="text-indigo-400"
            isHalfHeight={false}
          />
        </div>

        {/* Col 2: Key Activities & Key Resources */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <CanvasBlock
            title="Key Activities"
            icon={Activity}
            content={bmcData.keyActivities}
            colorClass="text-sky-400"
            isHalfHeight={true}
          />
          <CanvasBlock
            title="Key Resources"
            icon={Key}
            content={bmcData.keyResources}
            colorClass="text-purple-400"
            isHalfHeight={true}
          />
        </div>

        {/* Col 3: Value Propositions */}
        <div className="md:col-span-1 md:flex md:flex-col">
          <CanvasBlock
            title="Value Propositions"
            icon={Gift}
            content={bmcData.valuePropositions}
            colorClass="text-rose-400"
            isHalfHeight={false}
          />
        </div>

        {/* Col 4: Customer Relationships & Channels */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <CanvasBlock
            title="Customer Relationships"
            icon={Heart}
            content={bmcData.customerRelationships}
            colorClass="text-pink-400"
            isHalfHeight={true}
          />
          <CanvasBlock
            title="Channels"
            icon={Send}
            content={bmcData.channels}
            colorClass="text-teal-400"
            isHalfHeight={true}
          />
        </div>

        {/* Col 5: Customer Segments */}
        <div className="md:col-span-1 md:flex md:flex-col">
          <CanvasBlock
            title="Customer Segments"
            icon={Target}
            content={bmcData.customerSegments}
            colorClass="text-emerald-400"
            isHalfHeight={false}
          />
        </div>

        {/* Bottom row: Cost Structure & Revenue Streams */}
        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <CanvasBlock
            title="Cost Structure"
            icon={Wallet}
            content={bmcData.costStructure}
            colorClass="text-amber-400"
            isHalfHeight={true}
          />
          <CanvasBlock
            title="Revenue Streams"
            icon={CreditCard}
            content={bmcData.revenueStreams}
            colorClass="text-green-400"
            isHalfHeight={true}
          />
        </div>
      </div>
    </div>
  )
}
