import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Video, Activity, History, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { TopNav } from "@/components/TopNav";

const stats = [
  { label: "Total Sessions", value: "14", trend: "Great progress" },
  { label: "Completion Rate", value: "98%", trend: "Almost perfect" },
  { label: "Best Score", value: "92/100", trend: "+5 points" },
  { label: "Time Practiced", value: "5h 20m", trend: "This month" },
];

const GlowCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md hover:-translate-y-1 transform duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(79, 70, 229, 0.05), transparent 40%)` }}
      />
      <div className="relative z-10 h-full p-5">{children}</div>
    </div>
  );
};

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("interviewai_user");
    if (!stored) {
      const defaultUser = { name: "Alex Candidate", email: "alex@example.com" };
      setUser(defaultUser);
    } else {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) return null;

  const firstName = user.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <TopNav user={user} />

      <div className="container py-8 max-w-6xl relative z-10">
        {/* Personalized Header */}
        <FadeUp delay={0.1} className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">
                Welcome back, <span className="text-indigo-600">{firstName}!</span> 👋
              </h1>
              <p className="text-sm font-medium text-slate-500">Here's an overview of your recent practice sessions.</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="rounded-md font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                onClick={() => navigate("/settings")}
              >
                Edit Profile
              </Button>
            </motion.div>
          </div>
        </FadeUp>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={0.2 + i * 0.1} className="h-full">
              <GlowCard>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-3">{stat.label}</p>
                <p className="text-3xl font-extrabold text-slate-900 mb-2">{stat.value}</p>
                <div className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block border border-emerald-200">
                  {stat.trend}
                </div>
              </GlowCard>
            </FadeUp>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Interview Room */}
          <FadeUp delay={0.4} className="lg:col-span-2">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col shadow-sm h-full"
            >
              <div className="h-12 border-b border-slate-100 flex items-center px-5 justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-slate-600">Mock Interview Room</span>
                </div>
                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 rounded hover:bg-slate-200">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 rounded hover:bg-slate-200">
                      <Video className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center p-8 relative bg-slate-50/50 min-h-[280px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.05)_0%,transparent_60%)]" />
                <div className="text-center relative z-10 w-full max-w-sm">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mx-auto mb-6"
                  >
                    <Activity className="h-8 w-8 text-indigo-600" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to Practice, {firstName}!</h3>
                  <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
                    Your camera and microphone are connected. Start your next mock interview whenever you are ready.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={() => navigate("/mock-interview")} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm py-5 rounded-lg font-semibold">
                      Start Mock Interview
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Recent Sessions */}
          <FadeUp delay={0.5} className="h-full">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border border-slate-200 bg-white flex flex-col h-full shadow-sm"
            >
              <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                  <History className="h-4 w-4 text-indigo-600" /> Recent Sessions
                </h3>
              </div>
              <div className="p-2 flex-1 overflow-auto">
                {[
                  { date: "Software Engineer • System Design", score: "Excellent", time: "45m" },
                  { date: "Frontend Dev • React Basics", score: "Good", time: "30m" },
                  { date: "Project Manager • Leadership", score: "Great", time: "60m" },
                  { date: "Data Scientist • Python", score: "Needs Polish", time: "20m" },
                ].map((log, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className="group p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-900 mb-0.5 line-clamp-1">{log.date}</div>
                      <div className="text-xs font-medium text-slate-500 flex gap-2">
                        <span className="text-emerald-600">{log.score}</span>
                        <span className="text-slate-300">•</span>
                        <span>{log.time}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  </motion.div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                <Button
                  variant="ghost"
                  className="w-full text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  onClick={() => navigate("/history")}
                >
                  View Full History →
                </Button>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
