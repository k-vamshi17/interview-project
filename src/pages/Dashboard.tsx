import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Video, Activity, LogOut, Settings, History, ChevronRight, ShieldCheck, User } from "lucide-react";

const stats = [
  { label: "Total Sessions", value: "14", trend: "Great progress" },
  { label: "Completion Rate", value: "98%", trend: "Almost perfect" },
  { label: "Best Score", value: "92/100", trend: "+5 points" },
  { label: "Time Practiced", value: "5h 20m", trend: "This month" },
];

const GlowCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(79, 70, 229, 0.05), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full p-5">{children}</div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("interviewai_user");
    if (!stored) { 
      setUser({ name: "Alex Candidate", email: "alex@example.com" });
    } else {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("interviewai_user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Top Navbar */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            <span className="font-bold tracking-tighter text-slate-900">Interview<span className="text-indigo-600">Ace</span></span>
            <div className="hidden md:flex ml-8 gap-1">
              <Button variant="ghost" size="sm" className="text-indigo-600 bg-indigo-50 font-semibold rounded-md">Dashboard</Button>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100 rounded-md">History</Button>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100 rounded-md">Tips</Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="h-8 w-px bg-slate-200 mx-1" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Standard Account</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                <User className="h-4 w-4" />
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 animate-fade-up">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">Your Dashboard</h1>
            <p className="text-sm font-medium text-slate-500">Welcome back! Here's an overview of your recent practice.</p>
          </div>
          <Button size="sm" className="rounded-md font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            Edit Profile
          </Button>
        </div>

        {/* Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`animate-fade-up-delay-${Math.min(i + 1, 4)} h-full`}>
               <GlowCard>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-3">{stat.label}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                </div>
                <div className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block border border-emerald-200">
                  {stat.trend}
                </div>
              </GlowCard>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 animate-fade-up-delay-3">
          
          {/* Main Visual Terminal */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col relative shadow-sm">
            <div className="h-12 border-b border-slate-100 flex items-center px-5 justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-mono font-semibold text-slate-600">Mock Interview Room</span>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 rounded hover:bg-slate-200 hover:text-slate-900">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 rounded hover:bg-slate-200 hover:text-slate-900">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 aspect-[16/9] md:aspect-auto flex items-center justify-center p-8 relative bg-slate-50/50">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.05)_0%,transparent_60%)]" />
              
              <div className="text-center relative z-10 w-full max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mx-auto mb-6">
                  <Activity className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">Ready to Practice</h3>
                <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
                  Your camera and microphone are connected. You can start your mock interview whenever you are ready.
                </p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm py-5 rounded-lg font-semibold border-0 transition-all hover:-translate-y-0.5">
                  Start Mock Interview
                </Button>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="rounded-xl border border-slate-200 bg-white flex flex-col h-full animate-fade-up-delay-4 shadow-sm">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <History className="h-4 w-4 text-indigo-600" /> Recent Practice Sessions
              </h3>
            </div>
            <div className="p-2 flex-1 overflow-auto">
              {[
                { date: "Software Engineer • System Design", score: "Score: Excellent", time: "45m" },
                { date: "Frontend Dev • React Basics", score: "Score: Good", time: "30m" },
                { date: "Project Manager • Leadership", score: "Score: Great", time: "60m" },
                { date: "Data Scientist • Python", score: "Score: Needs Polish", time: "20m" },
              ].map((log, i) => (
                <div key={i} className="group p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900 mb-0.5 line-clamp-1">{log.date}</div>
                    <div className="text-xs font-medium text-slate-500 flex gap-2">
                      <span>{log.score}</span>
                      <span className="text-slate-300">•</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100 bg-slate-50/50">
              <Button variant="ghost" className="w-full text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                View Full History
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
