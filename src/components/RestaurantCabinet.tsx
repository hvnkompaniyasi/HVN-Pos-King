import React, { useState, useEffect } from "react";
import { LogOut, Wallet, ShieldAlert, CheckCircle, AlertCircle, Store, Plus, Bell } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/useAuthStore";

const prices: any = { Lite: 250000, Pro: 300000, Premium: 500000 };

const notifClass = (type: string) => {
  if (type === "warning") return "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700";
  if (type === "success") return "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700";
  if (type === "error") return "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700";
  return "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700";
};

export default function RestaurantCabinet() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [rest, setRest] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);

  const load = async () => {
    await supabase.rpc("process_billing");
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .eq("owner_id", user ? user.id : "")
      .single();
    setRest(data);
    if (data) {
      const { data: n } = await supabase
        .from("notifications")
        .select("*")
        .eq("restaurant_id", data.id)
        .order("created_at", { ascending: false })
        .limit(10);
      setNotifications(n || []);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const pay = async () => {
    setError("");
    setMessage("");
    const value = Number(amount);
    if (!value || value <= 0) {
      setError("To'g'ri summa kiriting");
      return;
    }
    const { data, error } = await supabase.rpc("owner_top_up", { r_amount: value });
    if (error) {
      setError(error.message);
    } else {
      if (data.activated) {
        setMessage("To'lov qabul qilindi! Restoran FAOL holatga o'tdi.");
      } else {
        setMessage("Pul balansga qo'shildi. Qoldiq: " + Number(data.balance).toLocaleString() + " so'm. Muddatga 1 kun qolganda avtomatik yechiladi.");
      }
      setAmount("");
      load();
    }
  };

  if (!rest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const price = prices[rest.tariff] || 0;
  const balance = Number(rest.balance) || 0;
  const progress = Math.min(100, Math.round((balance / price) * 100));
  const blocked = rest.status === "blocked";
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 icon-3d flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">{rest.name}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{rest.tariff} tarif - {price.toLocaleString()} so'm/oy</p>
            </div>
          </div>
          <button onClick={logout} className="group flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 transition-all duration-300">
            <LogOut className="w-4 h-4 icon-anim icon-wiggle" />
            Chiqish
          </button>
        </div>

        {blocked ? (
          <div className="animate-fade-in-up p-5 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_8px_30px_rgba(239,68,68,0.4)] flex items-center gap-4">
            <ShieldAlert className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg">Restoran bloklangan</p>
              <p className="text-sm opacity-90">Tizimdan foydalanish uchun to'lov qiling</p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up p-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_8px_30px_rgba(34,197,94,0.4)] flex items-center gap-4">
            <CheckCircle className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg">Restoran faol</p>
              <p className="text-sm opacity-90">Keyingi to'lov: {new Date(rest.payment_due_date).toLocaleString()}</p>
            </div>
          </div>
        )}

        {unread > 0 && (
          <div className="animate-fade-in-up space-y-2">
            {notifications.filter((n) => !n.read).map((n) => (
              <button key={n.id} onClick={() => markRead(n.id)} className={"w-full text-left p-4 rounded-2xl border-2 animate-scale-in transition-all duration-300 hover:scale-[1.01] " + notifClass(n.type)}>
                <p className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  {n.type === "warning" ? <AlertCircle className="w-4 h-4 text-orange-500" /> : n.type === "error" ? <ShieldAlert className="w-4 h-4 text-red-500" /> : <CheckCircle className="w-4 h-4 text-green-500" />}
                  {n.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{n.body}</p>
                <p className="text-[10px] text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()} - o'qildi deb belgilash uchun bosing</p>
              </button>
            ))}
          </div>
        )}

        <div className="animate-fade-in-up p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 icon-3d flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hisobingizdagi qoldiq</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{balance.toLocaleString()} so'm</p>
            </div>
          </div>
          <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-700 ease-apple" style={{ width: progress + "%" }} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Tarifgacha: {progress}% ({price.toLocaleString()} so'm kerak). To'lov muddatiga 1 kun qolganda avtomatik yechiladi.</p>
        </div>

        <div className="animate-fade-in-up p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-500" />
            Bildirishnomalar tarixi
          </h3>
          {notifications.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">Hali bildirishnomalar yo'q</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((n) => (
                <button key={n.id} onClick={() => markRead(n.id)} className={"w-full text-left p-3 rounded-xl border transition-all duration-300 " + (n.read ? "opacity-60 bg-gray-50 dark:bg-gray-700/40 border-transparent" : notifClass(n.type))}>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{n.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{n.body}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="animate-fade-in-up p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">Pul to'ldirish</h3>
          {message && (
            <div className="mb-4 p-3 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center gap-2 animate-scale-in">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p className="text-xs text-green-600 dark:text-green-300 font-medium">{message}</p>
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 animate-scale-in">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-300 font-medium">{error}</p>
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Summa (so'm)"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <button onClick={pay} className="group px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-[0_4px_15px_rgba(34,197,94,0.4)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
              <Plus className="w-4 h-4 icon-anim icon-wiggle" />
              To'lov qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}