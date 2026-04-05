import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Video, Activity, Play, LogOut, Settings, History, ChevronRight, User, Sparkles } from "lucide-react";

const stats = [
  { label: "Total Sessions", value: "14", trend: "+2 this week" },
  { label: "Avg. Confidence", value: "87%", trend: "+5% vs last month" },
  { label: "Technical Depth", value: "9.2", trend: "Top 15% percentile" },
  { label: "Pacing Score", value: "Optimal", trend: "140 wpm avg" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // For demo purposes, we will default to a mock user if none exists in localStorage
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
    <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-primary/30">
      
      {/* Top Navbar */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold tracking-tighter text-white">Interview<span className="text-primary">Ace</span></span>
            <div className="hidden md:flex ml-8 gap-1">
              <Button variant="ghost" size="sm" className="text-white bg-white/5 hover:bg-white/10 rounded-md">Overview</Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white rounded-md">Transcripts</Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white rounded-md">Analytics</Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="h-8 w-px bg-white/10 mx-1" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-white">{user.name}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Candidate Tier</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center text-white border border-white/10 shadow-inner">
                <User className="h-4 w-4" />
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-rose-400">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8 max-w-6xl">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 animate-fade-up">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Mission Control</h1>
            <p className="text-muted-foreground">System telemetry is stable. You are ready for your next simulation.</p>
          </div>
          <Button size="lg" className="rounded-full shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] gap-2 bg-primary text-white font-semibold">
            <Play className="h-4 w-4 fill-current" /> Initialize Simulation
          </Button>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`rounded-xl border border-white/5 bg-white/[0.02] p-5 animate-fade-up-delay-${Math.min(i + 1, 4)} overflow-hidden relative group`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className="text-[10px] text-emerald-400/80 font-mono bg-emerald-400/10 inline-block px-1.5 py-0.5 rounded">
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 animate-fade-up-delay-3">
          
          {/* Simulation Booth */}
          <div className="lg:col-span-2 rounded-xl border border-white/5 bg-[#0a0a0a] overflow-hidden flex flex-col relative shadow-2xl">
            <div className="h-12 border-b border-white/5 flex items-center px-5 justify-between bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">CAM_01_INACTIVE</span>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground rounded hover:bg-white/5">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground rounded hover:bg-white/5">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 aspect-[16/9] md:aspect-auto flex items-center justify-center p-8 relative">
              <div className="absolute inset-0 bg-background/50 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.1)_0%,transparent_60%)]" />
              
              <div className="text-center relative z-10 w-full max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">System Standby</h3>
                <p className="text-sm text-muted-foreground mb-8">
                  Hardware diagnostic passed. AI evaluation engine is primed and awaiting your input.
                </p>
                <Button className="w-full text-white bg-white/10 hover:bg-white/20 border border-white/5 py-6 rounded-xl font-medium tracking-wide">
                  Run Equipment Test
                </Button>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="rounded-xl border border-white/5 bg-white/[0.01] flex flex-col h-full animate-fade-up-delay-4">
            <div className="p-5 border-b border-white/5">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <History className="h-4 w-4 text-primary" /> Session History
              </h3>
            </div>
            <div className="p-2 flex-1 overflow-auto">
              {[
                { date: "Oct 24 • System Design", score: "92 / 100", time: "45m" },
                { date: "Oct 21 • Behavioral HR", score: "88 / 100", time: "30m" },
                { date: "Oct 18 • Frontend Arch", score: "95 / 100", time: "60m" },
                { date: "Oct 15 • Initial Baseline", score: "74 / 100", time: "20m" },
              ].map((log, i) => (
                <div key={i} className="group p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center">
                    <History className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white/90 mb-0.5">{log.date}</div>
                    <div className="text-xs text-muted-foreground flex gap-2">
                      <span>Score: {log.score}</span>
                      <span>•</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/5 bg-black/20">
              <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-white">
                View Detailed Analytics
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
