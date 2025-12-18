'use client';
import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Server, Activity, Cpu, Thermometer, Zap, 
  AlertTriangle, Globe, ShieldCheck, Database, LayoutGrid 
} from 'lucide-react';
import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(() => import('../../components/ThreeCanvas'), { ssr: false });

// --- DATASETS ---
const storageData = [
  { name: 'Used', value: 72, color: '#3b82f6' },
  { name: 'Free', value: 28, color: '#1e293b' },
];

const cpuMemData = [
  { time: '09:00', cpu: 55, mem: 60 }, { time: '10:00', cpu: 58, mem: 62 },
  { time: '11:00', cpu: 75, mem: 65 }, { time: '12:00', cpu: 66, mem: 70 },
  { time: '13:00', cpu: 82, mem: 73 }, { time: '14:00', cpu: 68, mem: 72 },
];

// --- COMPONENTS ---
const GlowCard = ({ children, className = "" }) => (
  <div className={`bg-slate-950/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:border-blue-500/40 transition-all pointer-events-auto ${className}`}>
    {children}
  </div>
);

const StatusCard = ({ title, value, icon: Icon, color = "blue", trend = "+2.4%" }) => (
  <GlowCard className="p-4 flex items-center gap-4">
    <div className={`p-3 rounded-xl bg-gradient-to-br ${color === 'red' ? 'from-red-600 to-orange-500' : 'from-blue-600 to-cyan-500'} shadow-lg shadow-blue-500/20`}>
      <Icon size={20} className="text-white" />
    </div>
    <div className="flex-1">
      <p className="text-blue-200/40 text-[9px] uppercase font-bold tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-mono font-bold text-white leading-none">{value}</p>
        <span className={`text-[10px] font-bold ${color === 'red' ? 'text-red-400' : 'text-cyan-400'}`}>{trend}</span>
      </div>
    </div>
  </GlowCard>
);

export default function BeautifulDashboard() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-sans text-slate-200">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas />
      </div>

      {/* Main UI Overlay */}
      <div className="relative z-10 h-full flex flex-col p-6 pointer-events-none">
        
        {/* HEADER BAR */}
        <div className="flex justify-between items-start mb-6">
          <div className="pointer-events-auto bg-black/20 backdrop-blur-md p-3 rounded-xl border border-white/5">
            <h1 className="text-xl font-black italic tracking-tighter flex items-center gap-2">
              <LayoutGrid className="text-blue-500" /> SYSTEM_NEXUS <span className="text-blue-500/50 font-light not-italic text-sm">v4.0.2</span>
            </h1>
          </div>
          <div className="flex gap-4 pointer-events-auto">
            <div className="text-right">
              <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Encryption Status</p>
              <p className="text-xs text-emerald-400 flex items-center justify-end gap-1"><ShieldCheck size={12}/> AES-256 ACTIVE</p>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: LEFT & RIGHT PANELS */}
        <div className="flex flex-1 justify-between gap-6 mb-6">
          
          {/* LEFT SIDE: STORAGE & ANALYTICS */}
          <div className="w-72 flex flex-col gap-4 pointer-events-auto">
            <GlowCard className="p-5">
              <h3 className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Database size={14} /> Storage Cluster
              </h3>
              <div className="h-40 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={storageData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                      {storageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-mono font-bold text-white">72%</span>
                  <span className="text-[8px] text-blue-300/50 uppercase">Capacity</span>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="p-5 flex-1">
              <h3 className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-2">Live Logs</h3>
              <div className="font-mono text-[9px] space-y-2 text-blue-300/60">
                <p><span className="text-blue-500">[09:42]</span> Node_04 Re-routed</p>
                <p><span className="text-blue-500">[10:15]</span> Backup Sync Complete</p>
                <p><span className="text-amber-500">[11:02]</span> Latency Spike Zone B</p>
                <p><span className="text-blue-500">[12:44]</span> Cooling Cycle Init</p>
              </div>
            </GlowCard>
          </div>

          {/* RIGHT SIDE: STATUS CARDS */}
          <div className="w-72 flex flex-col gap-3 pointer-events-auto">
            <StatusCard title="Total Nodes" value="120" icon={Server} />
            <StatusCard title="Active Flux" value="108" icon={Activity} color="cyan" />
            <StatusCard title="CPU Core Load" value="68%" icon={Cpu} trend="+12%" />
            <StatusCard title="Thermal Index" value="24.2°C" icon={Thermometer} trend="-0.5%" />
            <StatusCard title="Energy Draw" value="420 kW" icon={Zap} trend="+8.1%" />
            <StatusCard title="System Alerts" value="03" icon={AlertTriangle} color="red" trend="CRITICAL" />
          </div>
        </div>

        {/* BOTTOM: GRAPHS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-72 pointer-events-auto">
          
          {/* CPU & Memory - Improved with Area Gradients */}
          <GlowCard className="p-5">
            <h3 className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
              <Cpu size={14} /> Processor Intelligence
            </h3>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={cpuMemData}>
                <defs>
                  <linearGradient id="cpuG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#1e293b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="url(#cpuG)" strokeWidth={3} />
                <Area type="monotone" dataKey="mem" stroke="#06b6d4" fill="none" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </GlowCard>

          {/* Network Load - Improved Visuals */}
          <GlowCard className="p-5">
            <h3 className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
              <Globe size={14} /> Global Traffic
            </h3>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={cpuMemData}>
                <XAxis dataKey="time" stroke="#1e293b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none' }} />
                <Line type="stepAfter" dataKey="cpu" stroke="#10b981" strokeWidth={3} dot={false} />
                <Line type="stepAfter" dataKey="mem" stroke="#8b5cf6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </GlowCard>

          {/* Temperature/Power Combined */}
          <GlowCard className="p-5 hidden lg:block">
            <h3 className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
              <Thermometer size={14} /> Thermal Trend
            </h3>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={cpuMemData}>
                <XAxis dataKey="time" hide />
                <Area type="basis" dataKey="cpu" stroke="#f59e0b" fill="#f59e0b20" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </GlowCard>

        </div>
      </div>
    </div>
  );
}