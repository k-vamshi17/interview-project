import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Activity } from "lucide-react";
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
      toast({ title: isSignUp ? "Account provisioned" : "Authentication successful" });
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-foreground flex md:items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl md:grid md:grid-cols-2 gap-8 items-center z-10 pt-10 md:pt-0">
        
        {/* Visual Panel */}
        <div className="hidden md:flex flex-col justify-between h-full p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
          <div className="relative z-10 flex items-center gap-2 mb-12">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold tracking-tighter text-white text-xl">Interview<span className="text-primary">Ace</span></span>
          </div>
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Access the Assessment Framework
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Authenticate to initialize your sandbox environment and configure hardware telemetry. The AI evaluation engine is standing by.
            </p>
            <div className="flex items-center gap-3 pt-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Nodes Online</span>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="w-full max-w-sm mx-auto animate-fade-up">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors mb-10 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" /> Return to Terminal
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {isSignUp ? "Initialize Profile" : "System Login"}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {isSignUp ? "Configure a new candidate profile to continue." : "Enter your credentials to access the console."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Candidate ID (Full Name)</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="John Doe" 
                  required 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Transmission Relay (Email)</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="candidate@node.local" 
                required 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Access Key (Password)</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                required minLength={6} 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 font-mono"
              />
            </div>
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] gap-2 mt-4" disabled={loading}>
              {loading ? (
                <> <Activity className="h-4 w-4 animate-spin" /> Processing... </>
              ) : (
                isSignUp ? "Provision Account" : "Authenticate"
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isSignUp ? "Existing clearance?" : "No clearance established?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:text-white hover:underline transition-colors font-medium">
              {isSignUp ? "Authenticate here" : "Request access"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
