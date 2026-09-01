import React, { useState, useEffect } from "react";
import { TrendingUp, Wallet, Undo2, CalendarRange } from "lucide-react";
import { supabase } from "../lib/supabase";

const monthNames = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"];

export default function Reports() {
  const [months, setMonths] = useState<any[]>([]);
  const [totals, setTotals] = useState({ payments: 0, refunds: 0, net: 0, monthNet: 0 });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data: pays } = await supabase.from("payments").select("amount, created_at");
    const { data: refs } = await supabase.from("refunds").select("amount, created_at");

    const now = new Date();
    const buckets: any[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets.push({ label: monthNames[d.getMonth()], year: d.getFullYear(), month: d.getMonth(), payments: 0, refunds: 0 });
    }

    const fill = (list: any[], field: string) => {
      (list || []).forEach((p) => {
        const d = new Date(p.created_at);
        const b = buckets.find((x) => x.year === d.getFullYear() && x.month === d.getMonth());
        if (b) b[field] += Number(p.amount);
      });
    };

    fill(pays, "payments");
    fill(refs, "refunds");

    const totalP = (pays || []).reduce((s, p) => s + Number(p.amount), 0);
    const totalR = (refs || []).reduce((s, r) => s + Number(r.amount), 0);
    const cur = buckets[buckets.length - 1];

    setTotals({ payments: totalP, refunds: totalR, net: totalP - totalR, monthNet: cur.payments - cur.refunds });
    setMonths(buckets.map((b) => ({ ...b, net: b.payments - b.refunds })));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const max = Math.max(...months.map((m) => m.net), 1);

  const cards = [
    { title: "Sof daromad", value: totals.net, icon: TrendingUp, color: "from-green-500 to-emerald-600", shadow: "rgba(34,197,94,0.4)" },
    { title: "Shu oy daromadi", value: totals.monthNet, icon: CalendarRange, color: "from-blue-500 to-blue-600", shadow: "rgba(37,99,235,0.4)" },
    { title: "Jami to'lovlar", value: totals.payments, icon: Wallet, color: "from-purple-500 to-purple-600", shadow: "rgba(168,85,247,0.4)" },
    { title: "Jami refundlar", value: totals.refunds, icon: Undo2, color: "from-orange-500 to-orange-600", shadow: "rgba(249,115,22,0.4)" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <div key={i} className="animate-fade-in-up p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-apple hover:-translate-y-1" style={{ animationDelay: i * 100 + "ms" }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{c.title}</p>
              <div className={"w-11 h-11 rounded-xl bg-gradient-to-br " + c.color + " icon-3d flex items-center justify-center shadow-[0_4px_15px_" + c.shadow + "]"}>
                <c.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{c.value.toLocaleString()} so'm</p>
          </div>
        ))}
      </div>

      <div className="animate-fade-in-up bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Oylik sof daromad (oxirgi 12 oy)</h3>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex items-end gap-2 md:gap-3">
            {months.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full h-56 flex items-end justify-center">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-10 pointer-events-none">
                    {m.net.toLocaleString()} so'm
                  </div>
                  <div
                    className={"w-full max-w-[42px] rounded-t-xl transition-all duration-700 ease-apple group-hover:opacity-100 " + (m.net > 0 ? "bg-gradient-to-t from-blue-600 to-blue-400 shadow-[0_4px_15px_rgba(37,99,235,0.35)] group-hover:from-green-600 group-hover:to-green-400" : "bg-gray-200 dark:bg-gray-700")}
                    style={{ height: m.net > 0 ? Math.max(4, (m.net / max) * 100) + "%" : "4px" }}
                  />
                </div>
                <span className={"text-xs font-medium " + (i === months.length - 1 ? "text-blue-600 dark:text-blue-300 font-bold" : "text-gray-500 dark:text-gray-400")}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-gradient-to-t from-blue-600 to-blue-400" />Sof daromad</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700" />To'lov bo'lmagan oy</span>
        </div>
      </div>
    </div>
  );
}