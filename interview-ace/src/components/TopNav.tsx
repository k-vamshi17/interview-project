import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Settings, LogOut, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";

interface TopNavProps {
  user: { name: string; email: string; avatar?: string };
}

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "History", path: "/history" },
  { label: "Tips", path: "/tips" },
];

export const TopNav = ({ user }: TopNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("interviewai_user");
    navigate("/");
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50"
    >
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            <span className="font-bold tracking-tighter text-slate-900">
              Interview<span className="text-indigo-600">Ace</span>
            </span>
          </Link>
          <div className="hidden md:flex ml-8 gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-md transition-all hover:scale-105 ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50 font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/mock-interview">
             <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-bold rounded-lg px-4 hidden md:flex transition-transform hover:scale-105">
                 Start Mock Interview
             </Button>
          </Link>
          <Link to="/settings">
            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
              <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-full">
                <Settings className="h-4 w-4" />
              </Button>
            </motion.div>
          </Link>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-slate-900">{user.name}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">My Account</div>
            </div>
            <Link to="/settings">
              <div className="h-9 w-9 rounded-full bg-indigo-600 border-2 border-indigo-200 flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:scale-110 transition-transform overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{initials || <UserIcon className="h-4 w-4" />}</span>
                )}
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 hover:scale-110 transition-transform"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
