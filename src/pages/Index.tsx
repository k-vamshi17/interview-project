import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Eye, Brain, BarChart3, ArrowRight, ShieldCheck, Activity } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Analysis",
    description: "Get feedback on how fast you speak, your tone of voice, and how clearly you express your ideas.",
  },
  {
    icon: Eye,
    title: "Body Language",
    description: "Tracks if you make good eye contact and helps you look more confident on camera.",
  },
  {
    icon: Brain,
    title: "Answer Quality",
    description: "Analyzes your answers to make sure you are hitting the right points and structuring them well.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Review your performance with simple, easy-to-read reports and get specific tips on how to improve.",
  },
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
      className={`relative overflow-hidden group rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(79, 70, 229, 0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full p-8">{children}</div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <span className="font-bold text-xl tracking-tighter flex items-center gap-2 text-slate-900">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            Interview<span className="text-indigo-600 font-extrabold">Ace</span>
          </span>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Sign In
            </Link>
            <Link to="/login?tab=signup">
              <Button size="sm" className="rounded-md px-5 font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 px-4 relative z-10 overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-up shadow-sm">
            <Activity className="h-4 w-4" /> AI Interview Practice
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-up-delay-1 text-slate-900">
            Master your next <br/> job interview.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 animate-fade-up-delay-2 leading-relaxed font-medium">
            Practice your interviews with our friendly AI. Get instant feedback on your speaking pace, clarity, and the quality of your answers before the real thing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
            <Link to="/login?tab=signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-md h-14 px-8 text-base gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                Start Practicing <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-md h-14 px-8 text-base border-slate-300 text-slate-700 hover:bg-slate-100">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mockup Presentation */}
      <section className="px-4 pb-24 relative z-10 animate-fade-up-delay-4">
        <div className="container max-w-6xl">
          <div className="rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-sm p-4 shadow-2xl relative">
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="h-12 border-b border-slate-100 flex items-center px-4 justify-between bg-slate-50/80">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                </div>
                <div className="px-3 py-1 rounded-md bg-white border border-slate-200 text-[10px] text-slate-500 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> AI is Ready
                </div>
              </div>
              <div className="aspect-[16/9] md:aspect-[24/9] flex bg-slate-50 relative">
                <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-200 relative overflow-hidden">
                   <div className="w-32 h-32 rounded-full border border-indigo-100 flex items-center justify-center relative bg-white shadow-sm">
                      <div className="absolute w-full h-full rounded-full border border-indigo-200 animate-ping" style={{ animationDuration: '3s' }} />
                      <Mic className="h-10 w-10 text-indigo-500" />
                   </div>
                   <p className="mt-6 text-sm text-slate-500 font-mono tracking-tight">Listening to your answer...</p>
                </div>
                <div className="w-64 bg-white p-6 flex flex-col gap-5 hidden md:flex h-full">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Live Feedback</div>
                  {[ {label: 'Confidence', val: 'Looking Good'}, {label: 'Pacing', val: 'Perfect'}, {label: 'Answer Quality', val: 'Strong'} ].map(m => (
                    <div key={m.label} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <div className="text-[10px] text-slate-500 mb-1 font-medium">{m.label}</div>
                      <div className="text-sm font-semibold text-slate-900">{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 relative z-10 bg-white border-y border-slate-200">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-3 text-shadow-sm">Why use InterviewAce?</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Everything you need to succeed.
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <GlowCard key={f.title}>
                <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6 border border-indigo-100">
                  <f.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900">{f.title}</h4>
                <p className="text-slate-600 leading-relaxed font-medium">{f.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 bg-slate-900 text-white relative z-10 overflow-hidden">
        <div className="container max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
          {[
            { value: "500K+", label: "Practice Interviews" },
            { value: "98%", label: "Feel More Confident" },
            { value: "Instant", label: "Feedback Delivered" },
          ].map((s) => (
            <div key={s.label} className="p-6">
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">{s.value}</p>
              <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-4 bg-white relative z-10">
        <div className="container flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">
          <span className="font-bold flex items-center gap-1.5 text-slate-900">
             <ShieldCheck className="h-4 w-4 text-indigo-600" /> Interview<span className="text-indigo-600">Ace</span>
          </span>
          <div className="flex gap-6 font-medium">
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Help Center</span>
          </div>
          <span>© 2026 InterviewAce.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
