import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Eye, Brain, BarChart3, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Analysis",
    description: "Speech rate, filler words, clarity and tone feedback.",
  },
  {
    icon: Eye,
    title: "Body Language",
    description: "Eye contact, expressions and confidence tracking.",
  },
  {
    icon: Brain,
    title: "Answer Quality",
    description: "Structure, relevance and depth scoring with NLP.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Detailed reports with actionable improvement tips.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <span className="font-semibold text-foreground tracking-tight">
            Interview<span className="text-primary">AI</span>
          </span>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/login?tab=signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-2xl text-center">
          <p className="text-sm font-medium text-primary mb-4 animate-fade-up">AI-powered interview coaching</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight animate-fade-up-delay-1">
            Ace your next interview
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto animate-fade-up-delay-2">
            Practice with AI. Get real-time feedback on your voice, expressions, and answers.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 animate-fade-up-delay-3">
            <Link to="/login?tab=signup">
              <Button size="lg" className="gap-2">
                Start free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Sign in</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container max-w-3xl">
          <h2 className="text-center text-sm font-medium text-primary mb-2 animate-fade-up">Features</h2>
          <h3 className="text-center text-2xl font-semibold text-foreground mb-10 animate-fade-up-delay-1">
            Everything you need to prepare
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow animate-fade-up-delay-${Math.min(i + 1, 4)}`}
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <f.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{f.title}</h4>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 border-y border-border bg-secondary/50">
        <div className="container max-w-2xl grid grid-cols-3 gap-6 text-center">
          {[
            { value: "10K+", label: "Mock Interviews" },
            { value: "95%", label: "Improvement" },
            { value: "24/7", label: "Available" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-lg text-center animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to practice?</h2>
          <p className="text-muted-foreground mb-6">Get instant AI feedback and land the job.</p>
          <Link to="/login?tab=signup">
            <Button size="lg" className="gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <div className="container flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Interview<span className="text-primary">AI</span></span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
