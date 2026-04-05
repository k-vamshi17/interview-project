import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShieldCheck, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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
      toast({ title: isSignUp ? "Account created successfully" : "Welcome back!" });
      navigate("/dashboard");
    }, 800);
  };

  const toggleMode = () => setIsSignUp(!isSignUp);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex md:items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background decorations */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-slate-200/60 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="w-full max-w-5xl md:grid md:grid-cols-2 gap-12 items-center z-10 pt-10 md:pt-0">
        
        {/* Visual Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col justify-between h-full p-10 rounded-3xl border border-slate-200 bg-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(79,70,229,0.05)_0%,transparent_60%)]" />
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative z-10 flex items-center gap-2 mb-12"
          >
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
            <span className="font-bold tracking-tighter text-slate-900 text-2xl">Interview<span className="text-indigo-600">Ace</span></span>
          </motion.div>
          
          <div className="relative z-10 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-extrabold text-slate-900 tracking-tight"
            >
              Welcome to InterviewAce
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 leading-relaxed font-medium text-lg"
            >
              Sign in to practice your interviews, review your AI feedback, and track your progress over time.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">All systems ready</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Form Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm mx-auto"
        >
          <Link to="/">
            <motion.div 
              whileHover={{ x: -3 }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-10 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </motion.div>
          </Link>

          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "signup" : "login"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                {isSignUp ? "Create an Account" : "Sign In"}
              </h1>
              <p className="text-sm font-medium text-slate-500 mb-8">
                {isSignUp ? "Sign up to start practicing right away." : "Welcome back! Please enter your details."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence>
                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <Label htmlFor="name" className="text-xs uppercase text-slate-500 tracking-widest font-bold">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Jane Smith" 
                        required 
                        className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 shadow-sm focus-visible:ring-indigo-500 transition-all focus:scale-[1.02]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase text-slate-500 tracking-widest font-bold">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="you@email.com" 
                    required 
                    className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 shadow-sm focus-visible:ring-indigo-500 transition-all focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs uppercase text-slate-500 tracking-widest font-bold">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    required minLength={6} 
                    className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 font-mono shadow-sm focus-visible:ring-indigo-500 transition-all focus:scale-[1.02]"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md gap-2 mt-4" disabled={loading}>
                    {loading ? (
                      <> <Activity className="h-4 w-4 animate-spin" /> Verifying... </>
                    ) : (
                      isSignUp ? "Create Account" : "Sign In"
                    )}
                  </Button>
                </motion.div>
              </form>

              <p className="mt-8 text-center text-sm font-medium text-slate-600">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button onClick={toggleMode} className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors">
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;
