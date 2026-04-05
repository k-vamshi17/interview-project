import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Eye, Brain, Play, LogOut, BarChart3 } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <span className="font-semibold text-foreground tracking-tight">
            Interview<span className="text-primary">AI</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </nav>

      <div className="container py-10 max-w-3xl">
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome, {user.name}</h1>
          <p className="text-sm text-muted-foreground mb-8">Start a mock interview or review your performance.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`rounded-xl border border-border bg-card p-4 text-center animate-fade-up-delay-${Math.min(i + 1, 4)}`}>
              <stat.icon className="h-4 w-4 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-8 text-center animate-fade-up-delay-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Play className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Start Mock Interview</h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-5">
            AI-generated questions with real-time feedback on your performance.
          </p>
          <Button size="lg" className="gap-2">
            <Play className="h-4 w-4" /> Begin Session
          </Button>
        </div>

        <div className="mt-8 animate-fade-up-delay-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-primary" /> Recent Activity
          </h3>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">No sessions yet — start your first one above.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
