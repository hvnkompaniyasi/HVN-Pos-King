import React from "react";
import { Building2, CheckCircle, XCircle, AlertCircle, Eye, Edit, Trash2 } from "lucide-react";
import { restaurants } from "../data/dashboardData";

function StatusBadge({ status }: { status: string }) {
  if (status === "active") {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1 w-fit">
        <CheckCircle className="w-3 h-3" />Faol
      </span>
    );
  }
  if (status === "inactive") {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit">
        <AlertCircle className="w-3 h-3" />To'lov kutilmoqda
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1 w-fit">
      <XCircle className="w-3 h-3" />Bloklangan
    </span>
  );
}

export default function RecentRestaurantsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">Oxirgi qo'shilgan restoranlar</h3>
        <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
          Barchasini ko'rish
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Restoran</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Egasi</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tarif</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Holat</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Daromad</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Qo'shilgan</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {restaurants.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-800">{r.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{r.owner}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{r.tariff}</span>
                </td>
                <td className="px-6 py-4"><StatusBadge status={r.status} /></td>
                <td className="px-6 py-4 font-semibold text-gray-800">{r.revenue} so'm</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{r.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-yellow-50 rounded-lg text-yellow-600"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}