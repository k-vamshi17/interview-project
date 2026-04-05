import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TopNav } from "@/components/TopNav";
import { Mic, Eye, Brain, MessageSquare, Clock, Star, Zap, Heart, TrendingUp, CheckCircle } from "lucide-react";

const categories = [
  {
    icon: Mic,
    title: "Voice & Delivery",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    tips: [
      "Speak at a steady pace — not too fast, not too slow. Aim for 130–150 words per minute.",
      "Pause briefly before answering tough questions. It shows you're thoughtful, not unprepared.",
      "Avoid filler words like 'um', 'uh', 'like', and 'you know'. Practice removing them consciously.",
      "Vary your tone to sound engaged. A flat voice can make you seem disinterested.",
    ],
  },
  {
    icon: Eye,
    title: "Body Language & Presence",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    tips: [
      "Look into the camera, not at yourself on screen — this mimics eye contact for the interviewer.",
      "Sit up straight and slightly forward to show engagement and energy.",
      "Smile naturally when appropriate. It makes you appear warm and approachable.",
      "Avoid crossing your arms — it can look closed off or defensive.",
    ],
  },
  {
    icon: Brain,
    title: "Structuring Your Answers",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    tips: [
      "Use the STAR method: Situation, Task, Action, Result — for all behavioral questions.",
      "Keep your answers focused. Most answers should be 1–3 minutes, not a monologue.",
      "Always end your answer with a clear result or what you learned from the experience.",
      "Prepare 3–5 strong STAR stories that can be adapted for different questions.",
    ],
  },
  {
    icon: MessageSquare,
    title: "Communication Tips",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    tips: [
      "Ask the interviewer to clarify if a question is unclear. It shows maturity and precision.",
      "Use specific numbers and data in your answers (e.g., 'increased revenue by 20%').",
      "Mirror the interviewer's language and key words to build rapport naturally.",
      "Don't talk negatively about past employers or colleagues — ever.",
    ],
  },
  {
    icon: Clock,
    title: "Preparation & Research",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    tips: [
      "Research the company's mission, products, recent news, and culture before every interview.",
      "Prepare at least 5 thoughtful questions to ask the interviewer at the end.",
      "Dress appropriately — even for video calls, dress for the role you want.",
      "Test your tech setup (camera, mic, internet) at least 30 minutes before a virtual interview.",
    ],
  },
  {
    icon: TrendingUp,
    title: "Career Growth Mindset",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
    tips: [
      "Treat every interview — even rejections — as valuable practice and learning.",
      "Follow up with a short, professional 'thank you' email within 24 hours.",
      "Keep a journal of the questions you are asked to improve your answers over time.",
      "Practice with a friend or use InterviewAce regularly to build real confidence.",
    ],
  },
];

const quickTips = [
  { icon: Zap, text: "Answer in 90 seconds or less for most questions" },
  { icon: CheckCircle, text: "Quantify your accomplishments whenever possible" },
  { icon: Heart, text: "Show genuine enthusiasm for the role and company" },
  { icon: Star, text: "Practice out loud, not just in your head" },
];

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Tips = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("interviewai_user");
    if (!stored) { navigate("/login"); return; }
    setUser(JSON.parse(stored));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <TopNav user={user} />

      <div className="container py-8 max-w-5xl">
        {/* Header */}
        <FadeUp delay={0.1}>
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Interview Tips</h1>
            <p className="text-slate-500 font-medium">Expert-curated advice to help you walk into every interview with confidence.</p>
          </div>
        </FadeUp>

        {/* Quick Tips Banner */}
        <FadeUp delay={0.2}>
          <div className="bg-indigo-600 rounded-2xl p-6 mb-10 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -mr-20 -mt-20 opacity-50" />
            <h2 className="text-white font-bold text-lg mb-4 relative z-10">⚡ Quick Wins</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
              {quickTips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3"
                >
                  <tip.icon className="h-4 w-4 text-indigo-200 flex-shrink-0" />
                  <span className="text-sm text-white font-medium">{tip.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, catIdx) => (
            <FadeUp key={cat.title} delay={catIdx * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm h-full"
              >
                {/* Card Header */}
                <div className={`p-5 border-b border-slate-100 flex items-center gap-3 ${cat.bg}`}>
                  <div className={`p-2 rounded-lg ${cat.bg} border ${cat.border}`}>
                    <cat.icon className={`h-5 w-5 ${cat.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900">{cat.title}</h3>
                </div>

                {/* Tips List */}
                <div className="p-5 space-y-4">
                  {cat.tips.map((tip, tipIdx) => (
                    <motion.div
                      key={tipIdx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: tipIdx * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full ${cat.bg} border ${cat.border} flex items-center justify-center`}>
                        <CheckCircle className={`h-3 w-3 ${cat.color}`} />
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Footer CTA */}
        <FadeUp delay={0.3}>
          <div className="mt-12 text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Put these tips into action!</h2>
            <p className="text-slate-500 mb-6 font-medium">The best way to improve is to keep practicing. Start a new mock interview session now.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-colors"
              >
                Start Practicing Now →
              </button>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

export default Tips;
