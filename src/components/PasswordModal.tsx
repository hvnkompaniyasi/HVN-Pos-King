import React, { useState } from "react";
import { X, KeyRound, Eye, Copy, CheckCircle, AlertCircle, Lock, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/useAuthStore";

export default function PasswordModal({ restaurant, onClose }: any) {
  const adminEmail = useAuthStore((s) => s.user?.email);
  const [step, setStep] = useState<"verify" | "reveal">("verify");
  const [myPassword, setMyPassword] = useState("");
  const [revealed, setRevealed] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const verify = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email: adminEmail || "", password: myPassword });
    if (error) {
      setError("Admin paroli noto'g'ri!");
      return;
    }
    const { data, error: e2 } = await supabase.rpc("reveal_restaurant_password", { r_id: restaurant.id });
    if (e2) {
      setError(e2.message);
      return;
    }
    if (!data) {
      setError("Bu restoran uchun parol saqlanmagan (eski restoran)");
      return;
    }
    setRevealed(data);
    setStep("reveal");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(revealed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 icon-3d flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white">{restaurant.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Egasi: {restaurant.owner}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 animate-scale-in">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-xs text-red-300 font-medium">{error}</p>
          </div>
        )}

        {step === "verify" ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Xavfsizlik uchun avval <b>o'z admin parolingizni</b> kiriting.
              </p>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                value={myPassword}
                onChange={(e) => setMyPassword(e.target.value)}
                placeholder="Admin parolingiz"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button onClick={verify} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_4px_15px_rgba(168,85,247,0.4)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Parolni ko'rish
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white text-center shadow-[0_8px_30px_rgba(168,85,247,0.4)]">
              <p className="text-xs opacity-80 mb-1">Restoran egasining paroli</p>
              <p className="text-2xl font-bold tracking-wider">{revealed}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-xs text-blue-700 dark:text-blue-300">
              Login: <b>{restaurant.phone}</b> (telefon raqami)
            </div>
            <button onClick={copy} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Nusxalandi!" : "Nusxalash"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}