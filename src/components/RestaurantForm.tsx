import React, { useState } from "react";
import { CheckCircle, AlertCircle, KeyRound, Clock } from "lucide-react";
import { supabase } from "../lib/supabase";

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300";
const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";

export default function RestaurantForm() {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [tariff, setTariff] = useState("Lite");
  const [trial, setTrial] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password.length < 4) {
      setError("Parol kamida 4 ta belgidan iborat bo'lishi kerak");
      setLoading(false);
      return;
    }

    const { error } = await supabase.rpc("create_restaurant", {
      r_name: name.trim(),
      r_owner: owner.trim(),
      r_phone: phone.trim(),
      r_address: address.trim(),
      r_tariff: tariff,
      r_trial: trial,
      r_password: password
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(trial ? "Restoran yaratildi! 3 kunlik sinov muddati faol." : "Restoran yaratildi! Egasi to'lov qilgach faollashadi.");
      setName("");
      setOwner("");
      setPhone("");
      setAddress("");
      setPassword("");
      setTimeout(() => setSuccess(""), 5000);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Yangi restoran qo'shish</h2>

        {success && (
          <div className="mb-4 p-4 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center gap-3 animate-scale-in">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-green-600 dark:text-green-300 text-sm font-medium">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center gap-3 animate-scale-in">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Restoran nomi *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Restoran nomini kiriting" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Egasi / FIO *</label>
            <input type="text" required value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Egasining ismi" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Telefon * (login uchun)</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 (__) ___-__-__" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tarif *</label>
              <select value={tariff} onChange={(e) => setTariff(e.target.value)} className={inputClass}>
                <option value="Lite">Lite - 250,000 so'm/oy</option>
                <option value="Pro">Pro - 300,000 so'm/oy</option>
                <option value="Premium">Premium - 500,000 so'm/oy</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">3 kunlik sinov muddati</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">O'chirilgan bo'lsa - restoran darhol bloklangan holatda, egasi to'lov qilgach faollashadi</p>
              </div>
            </div>
            <button type="button" onClick={() => setTrial(!trial)} className={"w-14 h-8 rounded-full transition-all duration-300 ease-apple relative flex-shrink-0 " + (trial ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : "bg-gray-300 dark:bg-gray-600")}>
              <span className={"absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-all duration-300 ease-apple " + (trial ? "left-7" : "left-1")} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Egasi uchun parol * (kamida 4 belgi)</label>
              <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parol o'ylab toping" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Manzil</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shahar, ko'cha, uy" className={inputClass} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-blue-600 dark:text-blue-300 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Restoran egasi <b>telefon raqami</b> va <b>shu parol</b> bilan kiradi. U o'z kabinetida holatini va balansini ko'rib, pul to'ldiradi.
            </p>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span>Restoranni yaratish</span>}
            </button>
            <button type="button" className="px-6 py-3 border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}