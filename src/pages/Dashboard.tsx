import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Mic, Eye, Brain, BarChart3, Play, LogOut } from "lucide-react";

const stats = [
  { label: "Sessions", value: "0", icon: Play },
  { label: "Avg Confidence", value: "—", icon: Eye },
  { label: "Avg Clarity", value: "—", icon: Mic },
  { label: "Avg Relevance", value: "—", icon: Brain },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("interviewai_user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("interviewai_user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-semibold text-foreground">InterviewAI</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.name}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container py-12 max-w-4xl">
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Welcome, {user.name}
          </h1>
          <p className="text-muted-foreground mb-8">
            Start a mock interview or review your past performance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass-card p-5 text-center animate-fade-up-delay-${i + 1}`}
            >
              <stat.icon className="h-5 w-5 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Start Interview */}
        <div className="glass-card p-8 text-center animate-fade-up-delay-3">
          <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Play className="h-7 w-7 text-accent" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Start Mock Interview
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Practice with AI-generated questions tailored to your role. Get feedback on voice, body language, and answer quality.
          </p>
          <Button size="lg" className="gap-2">
            <Play className="h-4 w-4" /> Begin Session
          </Button>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 animate-fade-up-delay-4">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-accent" />
            Recent Activity
          </h3>
          <div className="glass-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No interview sessions yet. Start your first one above!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
