import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TopNav } from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Camera, CheckCircle, AlertCircle } from "lucide-react";

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const Toast = ({ message, type }: { message: string; type: "success" | "error" }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg font-medium text-sm ${
        type === "success" ? "bg-emerald-600 text-white" : "bg-red-500 text-white"
      }`}
    >
      {type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
      {message}
    </motion.div>
  </AnimatePresence>
);

const Settings = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("interviewai_user");
    if (!stored) { navigate("/login"); return; }
    const parsed = JSON.parse(stored);
    setUser(parsed);
    setName(parsed.name || "");
    setEmail(parsed.email || "");
    setAvatar(parsed.avatar);
  }, [navigate]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setAvatar(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = () => {
    if (!name.trim() || !email.trim()) {
      showToast("Name and email cannot be empty.", "error");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      const updated = { ...user, name: name.trim(), email: email.trim(), avatar };
      localStorage.setItem("interviewai_user", JSON.stringify(updated));
      setUser(updated as typeof user);
      setSaving(false);
      showToast("Profile updated successfully!", "success");
    }, 600);
  };

  const handlePasswordSave = () => {
    if (!newPassword || newPassword.length < 6) {
      showToast("New password must be at least 6 characters.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showToast("Password changed successfully!", "success");
    }, 800);
  };

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <TopNav user={{ ...user, name, avatar }} />

      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="container py-8 max-w-3xl">
        <FadeUp delay={0.1}>
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Account Settings</h1>
            <p className="text-sm font-medium text-slate-500">Manage your profile, email, and password.</p>
          </div>
        </FadeUp>

        {/* Profile Picture Section */}
        <FadeUp delay={0.15}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
            <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-600" /> Profile Picture
            </h2>
            <div className="flex items-center gap-6">
              <div
                className="relative w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-extrabold border-4 border-indigo-100 cursor-pointer overflow-hidden group"
                onClick={() => fileRef.current?.click()}
              >
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <div>
                <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} className="border-slate-200 text-slate-700 hover:bg-slate-50 mb-2 flex items-center gap-2">
                  <Camera className="h-3.5 w-3.5" /> Upload Photo
                </Button>
                <p className="text-xs text-slate-400 font-medium">JPG, PNG or GIF. Max 5MB.</p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Profile Info Section */}
        <FadeUp delay={0.2}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
            <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Mail className="h-4 w-4 text-indigo-600" /> Personal Information
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase text-slate-500 tracking-widest font-bold">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 bg-white border-slate-200 h-12 shadow-sm focus-visible:ring-indigo-500"
                    placeholder="Your full name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase text-slate-500 tracking-widest font-bold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-white border-slate-200 h-12 shadow-sm focus-visible:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleProfileSave}
                  disabled={saving}
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
                >
                  {saving ? "Saving..." : "Save Profile"}
                </Button>
              </motion.div>
            </div>
          </div>
        </FadeUp>

        {/* Change Password Section */}
        <FadeUp delay={0.25}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Lock className="h-4 w-4 text-indigo-600" /> Change Password
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-xs uppercase text-slate-500 tracking-widest font-bold">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pl-9 bg-white border-slate-200 h-12 shadow-sm font-mono focus-visible:ring-indigo-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-xs uppercase text-slate-500 tracking-widest font-bold">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-9 bg-white border-slate-200 h-12 shadow-sm font-mono focus-visible:ring-indigo-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs uppercase text-slate-500 tracking-widest font-bold">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-9 bg-white border-slate-200 h-12 shadow-sm font-mono focus-visible:ring-indigo-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {newPassword && confirmPassword && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-xs font-semibold flex items-center gap-1.5 ${
                    newPassword === confirmPassword ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {newPassword === confirmPassword ? (
                    <><CheckCircle className="h-3.5 w-3.5" /> Passwords match</>
                  ) : (
                    <><AlertCircle className="h-3.5 w-3.5" /> Passwords do not match</>
                  )}
                </motion.div>
              )}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handlePasswordSave}
                  disabled={saving}
                  variant="outline"
                  className="w-full h-11 border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold"
                >
                  {saving ? "Updating..." : "Update Password"}
                </Button>
              </motion.div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

export default Settings;
