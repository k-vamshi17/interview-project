import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TopNav } from "@/components/TopNav";
import { Activity, Clock, Star, Filter, Search, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockSessions = [
  { id: 1, role: "Software Engineer", topic: "System Design", date: "Oct 24, 2025", duration: "45m", score: 92, grade: "A", status: "Excellent" },
  { id: 2, role: "Frontend Developer", topic: "React & State Management", date: "Oct 21, 2025", duration: "30m", score: 85, grade: "B+", status: "Good" },
  { id: 3, role: "Project Manager", topic: "Leadership & Communication", date: "Oct 18, 2025", duration: "60m", score: 88, grade: "A-", status: "Great" },
  { id: 4, role: "Data Scientist", topic: "Python & Machine Learning", date: "Oct 15, 2025", duration: "20m", score: 67, grade: "C+", status: "Needs Work" },
  { id: 5, role: "Backend Engineer", topic: "REST APIs & Databases", date: "Oct 10, 2025", duration: "50m", score: 95, grade: "A+", status: "Excellent" },
  { id: 6, role: "Product Manager", topic: "Product Strategy", date: "Oct 5, 2025", duration: "40m", score: 78, grade: "B", status: "Good" },
  { id: 7, role: "DevOps Engineer", topic: "CI/CD & Docker", date: "Sep 28, 2025", duration: "35m", score: 82, grade: "B+", status: "Good" },
  { id: 8, role: "Software Engineer", topic: "Algorithms & Data Structures", date: "Sep 20, 2025", duration: "55m", score: 74, grade: "B-", status: "Needs Work" },
];

const gradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (grade.startsWith("B")) return "text-blue-700 bg-blue-50 border-blue-200";
  return "text-amber-700 bg-amber-50 border-amber-200";
};

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const History = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const [search, setSearch] = useState("");
  const [sessions, setSessions] = useState(mockSessions);

  useEffect(() => {
    const stored = localStorage.getItem("interviewai_user");
    if (!stored) { navigate("/login"); return; }
    setUser(JSON.parse(stored));

    const historyData = JSON.parse(localStorage.getItem('mock_interview_history') || '[]');
    if (historyData.length > 0) {
      setSessions([...historyData, ...mockSessions]);
    }
  }, [navigate]);

  if (!user) return null;

  const filtered = sessions.filter(
    (s) =>
      s.role.toLowerCase().includes(search.toLowerCase()) ||
      s.topic.toLowerCase().includes(search.toLowerCase())
  );

  const avgScore = Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <TopNav user={user} />

      <div className="container py-8 max-w-5xl">
        <FadeUp delay={0.1}>
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Interview History</h1>
            <p className="text-sm font-medium text-slate-500">A complete log of all your past practice sessions.</p>
          </div>
        </FadeUp>

        {/* Summary Cards */}
        <FadeUp delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Sessions", value: sessions.length.toString(), icon: Activity, color: "text-indigo-600" },
              { label: "Average Score", value: `${avgScore}/100`, icon: BarChart3, color: "text-emerald-600" },
              { label: "Total Time Practiced", value: "6h 15m", icon: Clock, color: "text-amber-600" },
            ].map((card) => (
              <motion.div
                key={card.label}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{card.label}</span>
                </div>
                <p className="text-3xl font-extrabold text-slate-900">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Search and Filter */}
        <FadeUp delay={0.3}>
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by role or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white border-slate-200 h-11 shadow-sm"
              />
            </div>
            <Button variant="outline" className="h-11 gap-2 border-slate-200 text-slate-600 hover:bg-slate-50">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </FadeUp>

        {/* Session List */}
        <div className="space-y-3">
          {filtered.map((session, i) => (
            <FadeUp key={session.id} delay={0.35 + i * 0.05}>
              <motion.div
                whileHover={{ x: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 cursor-pointer"
              >
                {/* Score Circle */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-indigo-100 bg-indigo-50 flex flex-col items-center justify-center">
                  <span className="text-lg font-extrabold text-indigo-700 leading-none">{session.score}</span>
                  <span className="text-[9px] text-indigo-500 font-bold">/ 100</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{session.role}</h3>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm text-slate-600">{session.topic}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                    <span>{session.date}</span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{session.duration}</span>
                  </div>
                </div>

                {/* Grade Badge */}
                <div className="flex-shrink-0 flex items-center gap-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${gradeColor(session.grade)}`}>
                    {session.grade}
                  </span>
                  <span className="hidden sm:block text-xs text-slate-500 font-medium w-20 text-right">{session.status}</span>
                  <Star className="h-4 w-4 text-slate-300 hover:text-amber-400 cursor-pointer transition-colors" />
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Activity className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No sessions found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
