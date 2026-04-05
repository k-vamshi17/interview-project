import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Eye, Brain, BarChart3, ArrowRight, Sparkles, Activity } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Enterprise-Grade Voice Analysis",
    description: "Multi-dimensional tracking of speech rate, tonal variance, and filler word frequency.",
  },
  {
    icon: Eye,
    title: "Micro-Expression Tracking",
    description: "Advanced visual mapping for eye contact consistency and non-verbal confidence indicators.",
  },
  {
    icon: Brain,
    title: "Contextual NLP Scoring",
    description: "Deep semantic analysis of your answers to evaluate structural integrity and technical depth.",
  },
  {
    icon: BarChart3,
    title: "Actionable Intelligence",
    description: "Comprehensive performance matrices with targeted, algorithmic improvement suggestions.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-foreground">
      {/* Background glowing orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-white/10">
        <div className="container flex items-center justify-between h-16">
          <span className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Interview<span className="text-primary">Ace</span>
          </span>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Link to="/login?tab=signup">
              <Button size="sm" className="rounded-full px-6 font-medium shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.65)] transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-4 relative z-10">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-up">
            <Activity className="h-3 w-3" /> System Online - v2.4.0
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-up-delay-1 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
            Master Your Next <br/> Technical Interview
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delay-2 leading-relaxed">
            Elevate your communication skills with hyper-realistic AI simulations. Receive instant, actionable analytics on your pacing, tone, and technical depth before you face a real recruiter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
            <Link to="/login?tab=signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full h-14 px-8 text-base gap-2 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-105 transition-transform">
                Start Free Simulation <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full h-14 px-8 text-base border-white/10 hover:bg-white/5">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Abstract Dashboard Mockup */}
      <section className="px-4 pb-20 relative z-10 animate-fade-up-delay-4">
        <div className="container max-w-5xl">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-2 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-20 rounded-2xl" />
            <div className="rounded-xl border border-white/5 bg-[#0A0A0A] overflow-hidden">
              {/* Mockup Header */}
              <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="mx-auto px-4 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-muted-foreground font-mono flex items-center gap-2">
                  <Activity className="h-3 w-3 text-emerald-400" /> Connecting to AI Engine...
                </div>
              </div>
              {/* Mockup Body */}
              <div className="aspect-[16/9] md:aspect-[21/9] flex bg-black relative">
                <div className="flex-1 border-r border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)]" />
                   <div className="w-32 h-32 rounded-full border border-primary/30 flex items-center justify-center relative">
                      <div className="absolute w-full h-full rounded-full border border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
                      <Mic className="h-10 w-10 text-primary/80" />
                   </div>
                   <p className="mt-6 text-sm text-muted-foreground font-mono">Listening for candidate response...</p>
                </div>
                <div className="w-64 bg-white/[0.01] p-4 flex flex-col gap-4 hidden md:flex">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Live Metrics</div>
                    {[ {label: 'Confidence', val: '92%'}, {label: 'Pacing', val: 'Optimal'}, {label: 'Clarity', val: '88%'} ].map(m => (
                      <div key={m.label} className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <div className="text-[10px] text-muted-foreground mb-1">{m.label}</div>
                        <div className="text-sm font-semibold">{m.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 relative z-10 bg-black/20 border-y border-white/5">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Diagnostic Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Precision metrics for interview perfection
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all hover:border-primary/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white/90">{f.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 relative z-10">
        <div className="container max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: "50K+", label: "Interviews Simulated" },
            { value: "98%", label: "Placement Success Rate" },
            { value: "< 50ms", label: "Real-time Latency" },
          ].map((s) => (
            <div key={s.label} className="p-6">
              <p className="text-4xl font-extrabold text-white mb-2 tracking-tight">{s.value}</p>
              <p className="text-sm font-medium text-primary uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-4 bg-black/40 relative z-10">
        <div className="container flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <span className="font-bold flex items-center gap-1.5 text-white">
             <Sparkles className="h-4 w-4 text-primary" /> Interview<span className="text-primary">Ace</span>
          </span>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">System Status</span>
          </div>
          <span>© 2026 AI Assessment Platforms, Inc.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
