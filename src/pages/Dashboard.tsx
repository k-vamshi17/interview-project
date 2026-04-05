import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Mic, Eye, Brain, BarChart3, Play, LogOut } from "lucide-react";

const stats = [
  { label: "Sessions", value: "0", icon: Play },
  { label: "Confidence", value: "—", icon: Eye },
  { label: "Clarity", value: "—", icon: Mic },
  { label: "Relevance", value: "—", icon: Brain },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("interviewai_user");
    if (!stored) { navigate("/login"); return; }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("interviewai_user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background city-grid-bg relative">
      <div className="absolute top-40 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Nav */}
      <nav className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 glitch-hover">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground tracking-tight">INTERVIEW<span className="text-primary">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline font-mono">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 glitch-hover">
              <LogOut className="h-4 w-4" /> Exit
            </Button>
          </div>
        </div>
      </nav>

      <div className="container py-12 max-w-4xl relative z-10">
        <div className="animate-fade-up">
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase neon-text">Dashboard</p>
          <h1 className="text-2xl font-black text-foreground mb-1 tracking-tight">
            Welcome, {user.name}
          </h1>
          <p className="text-muted-foreground text-sm mb-8 font-mono">
            // start a mock interview or review performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`glass-card p-5 text-center animate-fade-up-delay-${i + 1}`}>
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Start */}
        <div className="glass-card p-8 text-center animate-fade-up-delay-3 relative overflow-hidden scanline">
          <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 float-animation neon-glow-pulse">
            <Play className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-lg font-black text-foreground mb-2 tracking-tight">
            Start Mock Interview
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 font-mono">
            // AI-generated questions • real-time feedback
          </p>
          <Button size="lg" className="gap-2 neon-glow font-bold">
            <Play className="h-4 w-4" /> Begin Session
          </Button>
        </div>

        {/* Activity */}
        <div className="mt-10 animate-fade-up-delay-4">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="font-mono uppercase tracking-wider">Recent Activity</span>
          </h3>
          <div className="glass-card p-8 text-center">
            <p className="text-sm text-muted-foreground font-mono">
              // no sessions yet — start your first one above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
