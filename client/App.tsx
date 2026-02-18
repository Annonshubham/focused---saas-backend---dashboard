
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Terminal, 
  ShieldCheck, 
  Users, 
  Settings, 
  FileCode, 
  Database,
  Lock,
  Server,
  Zap
} from 'lucide-react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'backend'>('dashboard');

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
            <Zap className="fill-indigo-400" size={24} />
            FocusEd
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">SaaS Platform</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('backend')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'backend' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Server size={20} />
            <span>Backend Logic</span>
          </button>

          <div className="pt-8 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase">Management</div>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800">
            <Users size={20} />
            <span>Users</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>

        <div className="p-4 bg-slate-800 m-4 rounded-xl text-center">
          <p className="text-xs text-slate-300">Environment: <span className="text-green-400 font-mono">Production</span></p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold capitalize text-slate-800">{activeTab}</h2>
            <div className="h-4 w-[1px] bg-slate-300"></div>
            <span className="text-sm text-slate-500 font-mono">/v1/api/auth</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <img className="h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/32/32?1" alt="User" />
              <img className="h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/32/32?2" alt="User" />
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-shadow shadow-sm">
              New Deployment
            </button>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'dashboard' ? (
            <Dashboard />
          ) : (
            <div className="space-y-6">
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Database className="text-indigo-600" />
                  Database Configuration
                </h3>
                <p className="text-slate-600 mb-4">FocusEd uses a structured Mongoose connection pattern with robust error logging and reconnection logic.</p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-indigo-300 overflow-x-auto">
                  <pre>{`// server/config/db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error: any) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

export default connectDB;`}</pre>
                </div>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lock className="text-indigo-600" />
                  Authentication Flow
                </h3>
                <p className="text-slate-600 mb-4">Leveraging Bcrypt for hashing and JWT for stateless session management.</p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-indigo-300 overflow-x-auto">
                  <pre>{`// server/middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const protect = async (req: any, res: any, next: any) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};`}</pre>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
