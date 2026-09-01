import React, { useState } from "react";
import { X, Save, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";

export default function EditModal({ restaurant, onClose, onUpdated }: any) {
  const [name, setName] = useState(restaurant.name || "");
  const [owner, setOwner] = useState(restaurant.owner || "");
  const [phone, setPhone] = useState(restaurant.phone || "");
  const [address, setAddress] = useState(restaurant.address || "");
  const [tariff, setTariff] = useState(restaurant.tariff || "Lite");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const save = async () => {
    setError("");
    setMessage("");
    const { error } = await supabase.rpc("update_restaurant", {
      r_id: restaurant.id,
      r_name: name.trim(),
      r_owner: owner.trim(),
      r_phone: phone.trim(),
      r_address: address.trim(),
      r_tariff: tariff
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage("Muvaffaqiyatli saqlandi!");
      onUpdated();
      setTimeout(onClose, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-800 dark:text-white">Restoranni tahrirlash</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
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

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Restoran nomi</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Egasi / FIO</label>
            <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Telefon</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tarif</label>
              <select value={tariff} onChange={(e) => setTariff(e.target.value)} className={inputClass}>
                <option value="Lite">Lite</option>
                <option value="Pro">Pro</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Manzil</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} />
          </div>
          <button onClick={save} className="group w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
            <Save className="w-4 h-4 icon-anim icon-wiggle" />
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}