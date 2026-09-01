import React, { useState, useEffect } from "react";
import { Building2, Trash2, Inbox, SearchX, CalendarClock, Wallet, Eye, Pencil } from "lucide-react";
import { supabase } from "../lib/supabase";
import { autoBlockOverdue } from "../lib/autoBlock";
import { useDashboardStore } from "../store/useDashboardStore";
import PaymentModal from "./PaymentModal";
import PasswordModal from "./PasswordModal";
import EditModal from "./EditModal";

const statusClass = (status: string) => {
  if (status === "active") return "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300";
  if (status === "inactive") return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300";
  return "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300";
};

function DueBadge({ date }: { date: string }) {
  if (!date) return <span className="text-gray-400 text-sm">-</span>;
  const ms = new Date(date).getTime() - Date.now();
  const mins = Math.floor(ms / 60000);
  if (ms < 0) {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500">
        <CalendarClock className="w-4 h-4" />Muddati o'tgan
      </span>
    );
  }
  if (mins <= 1440) {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 animate-pulse">
        <CalendarClock className="w-4 h-4" />{Math.max(1, Math.floor(mins / 60))} soat qoldi - avtomatik to'lov oynasi
      </span>
    );
  }
  if (mins < 1440) {
    const h = Math.floor(mins / 60);
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-yellow-500">
        <CalendarClock className="w-4 h-4" />{h} soat qoldi
      </span>
    );
  }
  const d = Math.ceil(ms / 86400000);
  if (d <= 3) {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-yellow-500">
        <CalendarClock className="w-4 h-4" />{d} kun qoldi
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
      <CalendarClock className="w-4 h-4" />{d} kun qoldi
    </span>
  );
}

export default function RecentRestaurantsTable() {
  const { searchQuery } = useDashboardStore();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [passFor, setPassFor] = useState<any>(null);
  const [editFor, setEditFor] = useState<any>(null);

  const load = async () => {
    await autoBlockOverdue();
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .order("created_at", { ascending: false });
    setRestaurants(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("restaurants").update({ status }).eq("id", id);
    load();
  };

  const remove = async (id: string) => {
    if (!window.confirm("Restoran va egasi hisobi birga o'chiriladi. Tasdiqlaysizmi?")) return;
    await supabase.rpc("delete_restaurant", { r_id: id });
    load();
  };

  const filtered = restaurants.filter((r) =>
    (r.name + " " + r.owner).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in-up bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-700 overflow-hidden">
      {selected && <PaymentModal restaurant={selected} onClose={() => setSelected(null)} onUpdated={load} />}
      {passFor && <PasswordModal restaurant={passFor} onClose={() => setPassFor(null)} />}
      {editFor && <EditModal restaurant={editFor} onClose={() => setEditFor(null)} onUpdated={load} />}

      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Restoranlar ro'yxati</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} ta restoran</span>
      </div>

      {loading ? (
        <div className="p-12 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 icon-3d flex items-center justify-center">
            {searchQuery ? <SearchX className="w-10 h-10 text-blue-600 dark:text-blue-300" /> : <Inbox className="w-10 h-10 text-blue-600 dark:text-blue-300" />}
          </div>
          {searchQuery ? (
            <>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Hech narsa topilmadi</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Qidiruv bo'yicha natija yo'q</p>
            </>
          ) : (
            <>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Hozircha restoranlar yo'q</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Birinchi restoran qo'shilganda shu yerda ko'rinadi</p>
            </>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Restoran</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Egasi</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tarif</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Holat</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">To'lov muddati</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Balans</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 icon-3d flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-white">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{r.owner}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">{r.tariff}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      title="Holatni o'zgartirish"
                      className={"px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer outline-none border-0 transition-colors " + statusClass(r.status)}
                    >
                      <option value="active">Faol</option>
                      <option value="inactive">To'lov kutilmoqda</option>
                      <option value="blocked">Bloklangan</option>
                    </select>
                  </td>
                  <td className="px-6 py-4"><DueBadge date={r.payment_due_date} /></td>
                  <td className="px-6 py-4 font-semibold text-green-600 dark:text-green-300">{Number(r.balance || 0).toLocaleString()} so'm</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditFor(r)} className="group p-2 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-300" title="Tahrirlash"><Pencil className="w-4 h-4 icon-anim icon-wiggle" /></button>
                      <button onClick={() => setPassFor(r)} className="group p-2 hover:bg-purple-50 dark:hover:bg-purple-900/40 rounded-lg text-purple-600 dark:text-purple-300" title="Parolni ko'rish">
                        <Eye className="w-4 h-4 icon-anim icon-wiggle" />
                      </button>
                      <button onClick={() => setSelected(r)} className="group p-2 hover:bg-green-50 dark:hover:bg-green-900/40 rounded-lg text-green-600 dark:text-green-300" title="Hisob / To'lov">
                        <Wallet className="w-4 h-4 icon-anim icon-wiggle" />
                      </button>
                      <button onClick={() => remove(r.id)} className="group p-2 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg text-red-600 dark:text-red-300" title="O'chirish">
                        <Trash2 className="w-4 h-4 icon-anim icon-wiggle" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}