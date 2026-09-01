import React, { useState, useEffect } from "react";
import { Building2, CheckCircle, XCircle, AlertCircle, Eye, Edit, Trash2, Inbox, SearchX } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useDashboardStore } from "../store/useDashboardStore";

function StatusBadge({ status }: { status: string }) {
  if (status === "active") {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300 flex items-center gap-1 w-fit">
        <CheckCircle className="w-3 h-3" />Faol
      </span>
    );
  }
  if (status === "inactive") {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300 flex items-center gap-1 w-fit">
        <AlertCircle className="w-3 h-3" />To'lov kutilmoqda
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300 flex items-center gap-1 w-fit">
      <XCircle className="w-3 h-3" />Bloklangan
    </span>
  );
}

export default function RecentRestaurantsTable() {
  const { searchQuery } = useDashboardStore();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
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

  const remove = async (id: string) => {
    await supabase.from("restaurants").delete().eq("id", id);
    load();
  };

  const filtered = restaurants.filter((r) =>
    (r.name + " " + r.owner).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in-up bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-700 overflow-hidden">
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Qo'shilgan</th>
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
                  <td className="px-6 py-4"><StatusBadge status={r.status} /></td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="group p-2 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-300"><Eye className="w-4 h-4 icon-anim icon-wiggle" /></button>
                      <button className="group p-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/40 rounded-lg text-yellow-600 dark:text-yellow-300"><Edit className="w-4 h-4 icon-anim icon-wiggle" /></button>
                      <button onClick={() => remove(r.id)} className="group p-2 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg text-red-600 dark:text-red-300"><Trash2 className="w-4 h-4 icon-anim icon-wiggle" /></button>
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