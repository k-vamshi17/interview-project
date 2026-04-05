import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Eye, Brain, BarChart3, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice & Tone Analysis",
    description: "Detects clarity, speech rate, pauses, and filler words in real-time.",
  },
  {
    icon: Eye,
    title: "Expression & Body Language",
    description: "Computer vision measures confidence, eye contact, and expressions.",
  },
  {
    icon: Brain,
    title: "Answer Quality Analysis",
    description: "NLP-based evaluation for relevance, structure, and correctness.",
  },
  {
    icon: BarChart3,
    title: "Personalized Dashboard",
    description: "Scores and actionable suggestions across all performance areas.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-semibold text-lg text-foreground">InterviewAI</span>
          </div>
          <div className="flex items-center gap-3">
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
        <div className="container max-w-3xl text-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-6">
              <Sparkles className="h-3 w-3" />
              AI-Powered Interview Preparation
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-up-delay-1 leading-tight">
            Ace your next interview with{" "}
            <span className="text-accent">AI coaching</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up-delay-2">
            Practice mock interviews and get real-time feedback on your voice, expressions, and answers. Build confidence before the real thing.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up-delay-3">
            <Link to="/login?tab=signup">
              <Button size="lg" className="gap-2">
                Start Practicing <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold text-center text-foreground mb-12 animate-fade-up">
            Everything you need to prepare
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`glass-card p-6 animate-fade-up-delay-${i + 1}`}
              >
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-medium text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-2xl text-center animate-fade-up">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to improve?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of candidates who aced their interviews with AI-powered coaching.
          </p>
          <Link to="/login?tab=signup">
            <Button size="lg" className="gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>InterviewAI</span>
          </div>
          <span>© 2026 All rights reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
