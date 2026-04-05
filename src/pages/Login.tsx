import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("tab") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("interviewai_user", JSON.stringify({ email, name: name || email.split("@")[0] }));
      toast({ title: isSignUp ? "Account created" : "Welcome back", description: "Entering the grid..." });
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background city-grid-bg flex relative overflow-hidden">
      {/* Ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-lg mx-auto w-full relative z-10">
        <div className="animate-fade-up">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 glitch-hover">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg text-foreground tracking-tight">
              INTERVIEW<span className="text-primary">AI</span>
            </span>
          </div>

          <h1 className="text-2xl font-black text-foreground mb-1 tracking-tight">
            {isSignUp ? "Join the grid" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground text-sm mb-8 font-mono">
            {isSignUp ? "// create your account" : "// sign in to continue"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2 animate-fade-up-delay-1">
                <Label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required className="bg-card border-border focus:border-primary/50 focus:ring-primary/20" />
              </div>
            )}
            <div className="space-y-2 animate-fade-up-delay-1">
              <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="bg-card border-border focus:border-primary/50 focus:ring-primary/20" />
            </div>
            <div className="space-y-2 animate-fade-up-delay-2">
              <Label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="bg-card border-border focus:border-primary/50 focus:ring-primary/20" />
            </div>
            <div className="animate-fade-up-delay-3">
              <Button type="submit" className="w-full neon-glow font-bold" disabled={loading}>
                {loading ? "Connecting..." : isSignUp ? "Create account" : "Sign in"}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already on the grid?" : "New here?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline font-bold">
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden border-l border-border">
        {/* Scanline effect */}
        <div className="absolute inset-0 scanline" />
        <div className="absolute inset-0 city-grid-bg opacity-50" />

        <div className="text-center animate-fade-up-delay-2 relative z-10">
          <div className="h-24 w-24 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 float-animation neon-glow-pulse">
            <Zap className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-xl font-black text-foreground mb-2 tracking-tight">
            THE CITY NEVER SLEEPS
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs font-mono">
            // real-time AI coaching<br />
            // voice • expression • content
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
