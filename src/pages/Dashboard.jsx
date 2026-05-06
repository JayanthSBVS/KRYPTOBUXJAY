import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const stats = [
  { label: "Portfolio Value", value: "$124,850", change: "+12.4%", up: true, icon: "tabler:chart-line" },
  { label: "BTC Holdings", value: "2.4891 BTC", change: "+0.32 BTC", up: true, icon: "tabler:currency-bitcoin" },
  { label: "ETH Holdings", value: "18.72 ETH", change: "-1.2 ETH", up: false, icon: "tabler:currency-ethereum" },
  { label: "Total Trades", value: "1,284", change: "+47 today", up: true, icon: "tabler:arrows-exchange" },
];

const activities = [
  { type: "BUY", asset: "Bitcoin", amount: "+0.05 BTC", value: "$3,200", time: "2m ago", color: "text-green-400" },
  { type: "SELL", asset: "Ethereum", amount: "-2 ETH", value: "$6,840", time: "18m ago", color: "text-red-400" },
  { type: "BUY", asset: "Solana", amount: "+50 SOL", value: "$8,750", time: "1h ago", color: "text-green-400" },
  { type: "SELL", asset: "MATIC", amount: "-500 MATIC", value: "$420", time: "3h ago", color: "text-red-400" },
];

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-body-bg text-white">
      {/* Top Nav */}
      <header className="border-b border-border bg-darkmode/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon icon="tabler:chart-bar" className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold text-white">KryptoBux</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/70">Markets Live</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="hidden md:block text-sm text-white/80">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-primary/50 transition-all duration-200 text-sm cursor-pointer"
            >
              <Icon icon="tabler:logout" />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{user?.name} 👋</span>
          </h1>
          <p className="text-lightblue">Your crypto portfolio at a glance.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-darkmode border border-border rounded-xl p-5 hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lightblue text-sm">{stat.label}</span>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                  <Icon icon={stat.icon} className="text-primary text-lg" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className={`text-sm font-medium ${stat.up ? "text-green-400" : "text-red-400"}`}>
                {stat.up ? "↑" : "↓"} {stat.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-darkmode border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Portfolio Performance</h2>
              <div className="flex gap-2">
                {["1D", "1W", "1M", "1Y"].map((t) => (
                  <button key={t} className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${t === "1M" ? "bg-primary text-white" : "text-white/50 hover:text-white border border-white/10"}`}>{t}</button>
                ))}
              </div>
            </div>
            {/* Simulated chart */}
            <div className="h-48 flex items-end gap-1 px-2">
              {[40, 65, 45, 80, 60, 90, 70, 85, 75, 95, 65, 88, 72, 100, 82, 94, 78, 88, 96, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/60 to-secondary/40 hover:from-primary hover:to-secondary transition-all duration-200 cursor-pointer"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/30 px-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-darkmode border border-border rounded-xl p-6"
          >
            <h2 className="text-lg font-bold mb-5">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map((act, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-0.5 rounded text-xs font-bold ${act.type === "BUY" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                      {act.type}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{act.asset}</p>
                      <p className="text-xs text-white/40">{act.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${act.color}`}>{act.amount}</p>
                    <p className="text-xs text-white/50">{act.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 rounded-lg border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-all duration-200 cursor-pointer">
              View All Transactions
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
