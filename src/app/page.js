'use client';
import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Server, Activity, Cpu, Thermometer, Zap, AlertTriangle, Globe } from 'lucide-react';

// --- DATASET ---
const cpuMemData = [
  { time: '09:00', cpu: 55, mem: 60 },
  { time: '10:00', cpu: 58, mem: 62 },
  { time: '11:00', cpu: 61, mem: 65 },
  { time: '12:00', cpu: 66, mem: 70 },
  { time: '13:00', cpu: 70, mem: 73 },
  { time: '14:00', cpu: 68, mem: 72 },
];

const powerData = [
  { time: '09:00', kw: 360 }, { time: '10:00', kw: 380 },
  { time: '11:00', kw: 400 }, { time: '12:00', kw: 450 },
  { time: '13:00', kw: 470 }, { time: '14:00', kw: 420 },
];

const networkData = [
  { time: '09:00', in: 18, out: 15 }, { time: '10:00', in: 22, out: 18 },
  { time: '11:00', in: 25, out: 20 }, { time: '12:00', in: 30, out: 26 },
  { time: '13:00', in: 28, out: 24 }, { time: '14:00', in: 24, out: 20 },
];

// --- COMPONENTS ---
const StatusCard = ({ title, value, icon: Icon, colorClass = "from-blue-600 to-cyan-500" }) => (
  <div className="bg-slate-900/60 backdrop-blur-md border border-blue-500/20 rounded-xl p-4 flex items-center gap-4 hover:border-blue-400 transition-all pointer-events-auto shadow-lg shadow-blue-500/5">
    <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClass} shadow-lg shadow-cyan-500/20`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-blue-200/50 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">{title}</p>
      <p className="text-xl font-mono font-bold text-white">{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="fixed inset-0 z-10 flex flex-col p-6 pointer-events-none select-none">
      
      {/* RIGHT SIDE: STATUS CARDS */}
      <div className="flex justify-end flex-1">
        <div className="flex flex-col gap-3 w-64 pointer-events-auto">
          <StatusCard title="Total Servers" value="120" icon={Server} />
          <StatusCard title="Active Servers" value="108" icon={Activity} />
          <StatusCard title="Avg CPU Usage" value="68%" icon={Cpu} />
          <StatusCard title="Avg Temperature" value="24°C" icon={Thermometer} />
          <StatusCard title="Power Usage" value="420 kW" icon={Zap} />
          <StatusCard title="Active Alerts" value="3" icon={AlertTriangle} colorClass="from-red-600 to-orange-500" />
        </div>
      </div>

      {/* BOTTOM: GRAPHS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64 pointer-events-auto">
        
        {/* Graph 1: CPU & Memory */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 flex flex-col">
          <h3 className="text-blue-400 text-[10px] font-bold uppercase mb-2 flex items-center gap-2">
            <Cpu size={14} /> Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cpuMemData}>
              <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="mem" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Graph 2: Power Area Chart */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 flex flex-col">
          <h3 className="text-blue-400 text-[10px] font-bold uppercase mb-2 flex items-center gap-2">
            <Zap size={14} /> Power Usage (kW)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={powerData}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#475569" fontSize={10} />
              <YAxis stroke="#475569" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none' }} />
              <Area type="monotone" dataKey="kw" stroke="#3b82f6" fillOpacity={1} fill="url(#blueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Graph 3: Network Traffic */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 flex flex-col">
          <h3 className="text-blue-400 text-[10px] font-bold uppercase mb-2 flex items-center gap-2">
            <Globe size={14} /> Network Traffic
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={networkData}>
              <XAxis dataKey="time" stroke="#475569" fontSize={10} />
              <YAxis stroke="#475569" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              <Line name="In" type="stepAfter" dataKey="in" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line name="Out" type="stepAfter" dataKey="out" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}