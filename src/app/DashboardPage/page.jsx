'use client';
import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Tooltip 
} from 'recharts';
import { 
  Server, Activity, Cpu, Zap, 
  ShieldCheck, LayoutGrid, ArrowUpRight, TrendingUp 
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useFocus } from '@/context/FocusContext';


const ThreeCanvas = dynamic(() => import('../../components/ThreeCanvas'), { ssr: false });

// --- MOCK DATA ---
const performanceData = [
  { time: '01', val1: 4000, val2: 2400 },
  { time: '04', val1: 3000, val2: 1398 },
  { time: '08', val1: 2000, val2: 9800 },
  { time: '12', val1: 2780, val2: 3908 },
  { time: '16', val1: 1890, val2: 4800 },
  { time: '20', val1: 2390, val2: 3800 },
  { time: '24', val1: 3490, val2: 4300 },
];

const barData = [
  { name: 'M', val: 40 }, { name: 'T', val: 70 }, { name: 'W', val: 50 },
  { name: 'T', val: 90 }, { name: 'F', val: 60 }, { name: 'S', val: 30 },
];



// --- STYLED COMPONENTS ---

const PanelCard = ({ children, className = "" }) => (
  <div className={`bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);


const MiniStatCard = ({ title, value, subValue, trend, icon: Icon, colorClass }) => (
  <PanelCard className="p-5">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-widest">{title}</p>
        <h2 className="text-2xl font-bold text-white tracking-tight">{value}</h2>
        <p className={`text-[10px] mt-1 font-bold ${colorClass}`}>{trend}</p>
      </div>
      <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${colorClass}`}>
        <Icon size={18} />
      </div>
    </div>
  </PanelCard>
);

const GlowingBar = ({ label, value, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-bold tracking-tighter uppercase">
      <span className="text-slate-400">{label}</span>
      <span className="text-white">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div 
        className="h-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

export default function BeautifulDashboard() {

  const [highlightColor, setHighlightColor] = useState('#ff0000');

  const { setFocusPart } = useFocus();
  return (
    <div className="relative w-screen h-screen bg-[#050505] overflow-hidden font-sans text-slate-200">
      {/* 3D BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas highlightColor={highlightColor} />
      </div>
      {/* UI OVERLAY */}
      <div className="relative z-10 h-full flex flex-row p-8 pointer-events-none">
        
        {/* LEFT COLUMN: FIXED SIDEBAR */}
        <div className="w-80 flex flex-col gap-5 pointer-events-auto h-full">
          
          {/* LOGO CARD */}
          <PanelCard className="p-6 bg-gradient-to-br from-blue-600/20 to-transparent border-blue-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                <LayoutGrid size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-black tracking-tighter italic text-white">SYSTEM_NEXUS</h1>
            </div>
          </PanelCard>

          {/* STATS FROM IMAGE REF */}
          <MiniStatCard 
            title="Core Intel" 
            value="68%" 
            trend="+2.3%" 
            icon={Cpu} 
            colorClass="text-blue-400"
          />

          <PanelCard className="p-6">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-slate-500">Resource Stack</h3>
            <div className="space-y-6">
              <GlowingBar label="Neural Load" value={87} color="#3b82f6" />
              <GlowingBar label="Memory Bank" value={63} color="#8b5cf6" />
              <GlowingBar label="Active Nodes" value={45} color="#06b6d4" />
            </div>
          </PanelCard>
{/* FOCUS CONTROLS */}
<PanelCard className="p-5 pointer-events-auto">
  <h3 className="text-[10px] uppercase tracking-widest text-slate-400 mb-4">
    Camera Focus
  </h3>

  <button
    onClick={() => {
      // clear then re-set so clicking the same target repeatedly works
      setFocusPart(null);
      setTimeout(() => setFocusPart('building007'), 50);
    }}
    className="w-full py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40
               text-cyan-300 text-xs font-bold tracking-widest
               hover:bg-cyan-500/30 transition"
  >
    FOCUS GLASS MODULE
  </button>
</PanelCard>






{/* COLOR CONTROLS */}
<PanelCard className="p-5 pointer-events-auto">
  <h3 className="text-[10px] uppercase tracking-widest text-slate-400 mb-4">
    Bike Color
  </h3>

  <div className="flex gap-3">
    <button
      onClick={() => setHighlightColor('#ef4444')}
      className="w-6 h-6 rounded-full bg-red-500 ring-2 ring-white/20"
    />

    <button
      onClick={() => setHighlightColor('#22c55e')}
      className="w-6 h-6 rounded-full bg-green-500 ring-2 ring-white/20"
    />

    <button
      onClick={() => setHighlightColor('#3b82f6')}
      className="w-6 h-6 rounded-full bg-blue-500 ring-2 ring-white/20"
    />

    <button
      onClick={() => setHighlightColor('#facc15')}
      className="w-6 h-6 rounded-full bg-yellow-400 ring-2 ring-white/20"
    />
  </div>
</PanelCard>




          {/* LOGS MODULE */}
          <PanelCard className="flex-1 p-6 relative">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-slate-500">Live Telemetry</h3>
            <div className="space-y-4 font-mono text-[10px] opacity-70">
              <div className="flex justify-between"><span className="text-blue-400"># ENV_SYNC</span><span>0.02ms</span></div>
              <div className="flex justify-between text-slate-400"># SEC_ENCRYPT</div>
              <div className="flex justify-between text-amber-500">! CACHE_OVERFLOW</div>
              <div className="flex justify-between text-emerald-400"># PEER_CONNECTED</div>
            </div>
            {/* Gradient fade at bottom of logs */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </PanelCard>
        </div>

        {/* RIGHT AREA: BOTTOM CHARTS */}
        <div className="flex-1 flex flex-col gap-6 ml-8 h-full justify-end">
          
          <div className="flex gap-6 h-72 pointer-events-auto">
            
            {/* MAIN AREA CHART (Network Intelligence) */}
            <PanelCard className="flex-[2] p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Network Intelligence</h3>
                  <p className="text-2xl font-bold text-white mt-1">$32,430 <span className="text-xs text-blue-400 ml-2">+11.5%</span></p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                   <TrendingUp size={16} className="text-blue-400" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height="60%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val1" stroke="#3b82f6" strokeWidth={3} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </PanelCard>

            {/* NEON BAR CHART (Thermal) */}
            <PanelCard className="flex-1 p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Thermal Gradient</h3>
              <ResponsiveContainer width="100%" height="70%">
                <BarChart data={barData}>
                  <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#ef4444' : '#f87171'} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </PanelCard>

            {/* PIE CHART (Efficiency) */}
            <PanelCard className="w-72 p-8 flex flex-col items-center justify-center">
               <div className="relative w-32 h-32">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={[{v:72}, {v:28}]} innerRadius={40} outerRadius={55} dataKey="v" stroke="none">
                        <Cell fill="#06b6d4" />
                        <Cell fill="#1e293b" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white tracking-tighter">72%</span>
                  </div>
               </div>
               <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-4 font-bold">Efficiency</p>
            </PanelCard>

            {/* SECURITY CARD */}
            <PanelCard className="w-64 p-8 bg-emerald-500/5 border-emerald-500/20 flex flex-col justify-between">
               <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 mb-4">
                  <ShieldCheck className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Secure Node</h3>
                <p className="text-[10px] text-emerald-500/60 mt-2 leading-relaxed font-medium italic">AES-256 Protocol Active & Stable</p>
               </div>
               <div className="pt-4 border-t border-emerald-500/10 flex justify-between items-center text-[10px] text-emerald-400 font-bold">
                 <span>VERIFIED</span>
                 <ArrowUpRight size={14} />
               </div>
            </PanelCard>

          </div>
        </div>

      </div>
    </div>
  );
}