import React, { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300";
const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";

export default function RestaurantForm() {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [tariff, setTariff] = useState("Lite");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase
      .from("restaurants")
      .insert([{ name: name.trim(), owner: owner.trim(), phone: phone.trim(), address: address.trim(), tariff }]);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setName("");
      setOwner("");
      setPhone("");
      setAddress("");
      setTimeout(() => setSuccess(false), 3000);
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
            <p className="text-green-600 dark:text-green-300 text-sm font-medium">Restoran muvaffaqiyatli qo'shildi!</p>
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
              <label className={labelClass}>Telefon *</label>
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
          <div>
            <label className={labelClass}>Manzil</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shahar, ko'cha, uy" className={inputClass} />
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