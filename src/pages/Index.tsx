import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Eye, Brain, BarChart3, ArrowRight, Sparkles, Zap, Target } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice & Tone",
    description: "Real-time speech rate, filler detection, and prosody analysis.",
  },
  {
    icon: Eye,
    title: "Body Language",
    description: "Computer vision tracking: eye contact, expressions, gestures.",
  },
  {
    icon: Brain,
    title: "Answer Quality",
    description: "NLP semantic scoring for structure, relevance, and depth.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Detailed performance reports with actionable insights.",
  },
];

const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="type-cursor" />}
    </span>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background city-grid-bg relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 glitch-hover">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg text-foreground tracking-tight">
              INTERVIEW<span className="text-primary">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="glitch-hover">Sign in</Button>
            </Link>
            <Link to="/login?tab=signup">
              <Button size="sm" className="neon-glow">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-24 px-4 relative">
        <div className="container max-w-3xl text-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20 mb-8 neon-glow-pulse">
              <Target className="h-3 w-3" />
              NYC-GRADE AI COACHING
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground animate-fade-up-delay-1 leading-[1.1]">
            <TypewriterText text="Crush your next interview." />
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto animate-fade-up-delay-2 leading-relaxed">
            AI-powered mock interviews with real-time analysis of your{" "}
            <span className="text-primary font-medium">voice</span>,{" "}
            <span className="text-primary font-medium">expressions</span>, and{" "}
            <span className="text-primary font-medium">answers</span>.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up-delay-3">
            <Link to="/login?tab=signup">
              <Button size="lg" className="gap-2 neon-glow text-base px-8">
                Start Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-base glitch-hover">
                Sign in
              </Button>
            </Link>
          </div>

          {/* Neon divider */}
          <div className="mt-20 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-fade-up-delay-4" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 relative">
        <div className="container max-w-4xl">
          <h2 className="text-sm font-mono font-bold text-primary text-center tracking-widest uppercase mb-3 animate-fade-up neon-text">
            Modules
          </h2>
          <h3 className="text-2xl font-bold text-center text-foreground mb-12 animate-fade-up-delay-1">
            Everything to get you hired
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`glass-card p-6 group relative overflow-hidden scanline ${
                  i % 2 === 0 ? "animate-slide-left" : "animate-slide-right"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-10 w-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:neon-glow transition-all">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-1.5 tracking-tight">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16 px-4 border-y border-border bg-card/50">
        <div className="container max-w-3xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "10K+", label: "Mock Interviews" },
              { value: "95%", label: "Improvement Rate" },
              { value: "24/7", label: "Available" },
            ].map((stat, i) => (
              <div key={stat.label} className={`animate-fade-up-delay-${i + 1}`}>
                <p className="text-2xl sm:text-3xl font-black text-primary neon-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative">
        <div className="container max-w-2xl text-center animate-fade-up">
          <div className="h-16 w-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 float-animation neon-glow-pulse">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-3 tracking-tight">
            The city never sleeps.<br />Neither does your coach.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Practice anytime. Get instant AI feedback. Land the job.
          </p>
          <Link to="/login?tab=signup">
            <Button size="lg" className="gap-2 neon-glow text-base px-8">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-background/80">
        <div className="container flex items-center justify-between text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span>INTERVIEW<span className="text-primary">AI</span></span>
          </div>
          <span>© 2026 NYC</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
