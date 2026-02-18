
import React from 'react';
import { TrendingUp, Users, DollarSign, Activity, FileText, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', users: 400, revenue: 2400 },
  { name: 'Tue', users: 300, revenue: 1398 },
  { name: 'Wed', users: 200, revenue: 9800 },
  { name: 'Thu', users: 278, revenue: 3908 },
  { name: 'Fri', users: 189, revenue: 4800 },
  { name: 'Sat', users: 239, revenue: 3800 },
  { name: 'Sun', users: 349, revenue: 4300 },
];

const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {change}
      </span>
    </div>
    <div className="mt-4">
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Users" value="12,402" icon={Users} color="bg-blue-500" change="+12%" />
        <StatCard title="Monthly Revenue" value="$48,290" icon={DollarSign} color="bg-green-500" change="+8.2%" />
        <StatCard title="Uptime" value="99.99%" icon={Activity} color="bg-indigo-500" change="+0.01%" />
        <StatCard title="Conversions" value="18.5%" icon={TrendingUp} color="bg-purple-500" change="-2.4%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-6">User Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-6">Revenue Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold mb-4">API Health Logs</h3>
        <div className="space-y-4">
          {[
            { method: 'POST', endpoint: '/api/auth/register', status: 201, time: '142ms', date: 'Just now' },
            { method: 'GET', endpoint: '/api/users/profile', status: 200, time: '45ms', date: '2 mins ago' },
            { method: 'POST', endpoint: '/api/auth/login', status: 200, time: '89ms', date: '5 mins ago' },
            { method: 'PUT', endpoint: '/api/settings', status: 401, time: '12ms', date: '12 mins ago' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                  log.method === 'POST' ? 'bg-emerald-100 text-emerald-700' : 
                  log.method === 'GET' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {log.method}
                </span>
                <span className="font-mono text-sm text-slate-600">{log.endpoint}</span>
              </div>
              <div className="flex items-center gap-8">
                <span className={`text-sm font-semibold ${log.status >= 400 ? 'text-red-500' : 'text-slate-900'}`}>{log.status}</span>
                <span className="text-sm text-slate-400 w-16 text-right">{log.time}</span>
                <span className="text-xs text-slate-400 w-24 text-right">{log.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
