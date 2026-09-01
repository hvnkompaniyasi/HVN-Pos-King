import React, { useState, useEffect } from "react";
import { X, Wallet, Plus, CheckCircle, History, Undo2, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

const prices: any = { Lite: 250000, Pro: 300000, Premium: 500000 };

export default function PaymentModal({ restaurant, onClose, onUpdated }: any) {
  const [balance, setBalance] = useState(Number(restaurant.balance) || 0);
  const [amount, setAmount] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [payments, setPayments] = useState<any[]>([]);
  const [refunds, setRefunds] = useState<any[]>([]);

  const price = prices[restaurant.tariff] || 0;
  const progress = Math.min(100, Math.round((balance / price) * 100));

  const loadHistory = async () => {
    const { data: payData } = await supabase
      .from("payments")
      .select("*")
      .eq("restaurant_id", restaurant.id)
      .order("created_at", { ascending: false });

    const { data: refundData } = await supabase
      .from("refunds")
      .select("*")
      .eq("restaurant_id", restaurant.id)
      .order("created_at", { ascending: false });

    setPayments(payData || []);
    setRefunds(refundData || []);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const addPayment = async () => {
    setError("");
    setMessage("");

    const value = Number(amount);
    if (!value || value <= 0) {
      setError("To'g'ri summa kiriting");
      return;
    }

    const { data, error } = await supabase.rpc("add_payment", {
      r_id: restaurant.id,
      r_amount: value
    });

    if (error) {
      setError(error.message);
      return;
    }

    setBalance(Number(data.balance));
    if (data.activated) {
      setMessage("To'lov qabul qilindi. Restoran faol holatga o'tdi.");
    } else {
      setMessage("Pul balansga qo'shildi. Muddat tugashiga 1 kun qolganda tarif avtomatik yechiladi.");
    }

    setAmount("");
    loadHistory();
    onUpdated();
  };

  const refund = async () => {
    setError("");
    setMessage("");

    const value = Number(refundAmount);
    if (!value || value <= 0) {
      setError("Qaytariladigan summani to'g'ri kiriting");
      return;
    }

    if (value > balance) {
      setError("Balansda buncha qaytariladigan mablag' yo'q");
      return;
    }

    if (!window.confirm(value.toLocaleString() + " so'm qaytarishni tasdiqlaysizmi?")) return;

    const { data, error } = await supabase.rpc("refund_restaurant", {
      r_id: restaurant.id,
      r_amount: value,
      r_reason: refundReason.trim() || null
    });

    if (error) {
      setError(error.message);
      return;
    }

    setBalance(Number(data.balance));
    setMessage(value.toLocaleString() + " so'm refund qilindi. Qoldiq: " + Number(data.balance).toLocaleString() + " so'm");

    setRefundAmount("");
    setRefundReason("");
    loadHistory();
    onUpdated();
  };

  const history = [
    ...payments.map((p) => ({ ...p, type: "payment" })),
    ...refunds.map((r) => ({ ...r, type: "refund" }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 icon-3d flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white">{restaurant.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{restaurant.tariff} tarif - {price.toLocaleString()} so'm/oy</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white mb-4 shadow-[0_8px_30px_rgba(37,99,235,0.4)]">
          <p className="text-xs opacity-80 mb-1">Qaytarilishi mumkin bo'lgan balans</p>
          <p className="text-3xl font-bold mb-3">{balance.toLocaleString()} so'm</p>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700 ease-apple" style={{ width: progress + "%" }} />
          </div>
          <p className="text-xs opacity-80 mt-1.5">Tarifgacha: {progress}%</p>
        </div>

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

        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Pul qo'shish</h4>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Summa (so'm)"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button onClick={addPayment} className="group px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-[0_4px_15px_rgba(34,197,94,0.4)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
              <Plus className="w-4 h-4 icon-anim icon-wiggle" />
              Qo'shish
            </button>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
          <h4 className="text-sm font-bold text-orange-700 dark:text-orange-300 mb-3 flex items-center gap-2">
            <Undo2 className="w-4 h-4" />
            Pulni qaytarish
          </h4>
          <input
            type="number"
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
            placeholder="Qaytariladigan summa"
            className="w-full mb-2 px-4 py-3 rounded-xl border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
          <input
            type="text"
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
            placeholder="Sabab (ixtiyoriy)"
            className="w-full mb-3 px-4 py-3 rounded-xl border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
          <button onClick={refund} className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-[0_4px_15px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
            <Undo2 className="w-4 h-4" />
            Refund qilish
          </button>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-3">
            Joriy tarif davri uchun yechilgan summa qaytarilmaydi. Faqat balansda turgan ortiqcha mablag' qaytariladi.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <History className="w-4 h-4" />
            To'lov va refund tarixi
          </h4>

          {history.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">Hali tranzaksiyalar yo'q</p>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.type + item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <div>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">{new Date(item.created_at).toLocaleString()}</span>
                    {item.type === "refund" && item.reason && <span className="block text-[10px] text-orange-500">{item.reason}</span>}
                  </div>
                  {item.type === "payment" ? (
                    <span className="text-sm font-bold text-green-600 dark:text-green-300">+{Number(item.amount).toLocaleString()} so'm</span>
                  ) : (
                    <span className="text-sm font-bold text-orange-600 dark:text-orange-300">-{Number(item.amount).toLocaleString()} so'm</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}