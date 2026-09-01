import React from "react";
import { Building2, CheckCircle, AlertCircle, XCircle, Calendar, Users } from "lucide-react";

const iconMap: any = { Building2, CheckCircle, AlertCircle, XCircle, Calendar, Users };

const colorMap: any = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  red: "from-red-500 to-red-600",
  cyan: "from-cyan-500 to-cyan-600"
};

const glowMap: any = {
  blue: "shadow-[0_8px_24px_rgba(59,130,246,0.45)]",
  green: "shadow-[0_8px_24px_rgba(34,197,94,0.45)]",
  purple: "shadow-[0_8px_24px_rgba(168,85,247,0.45)]",
  orange: "shadow-[0_8px_24px_rgba(249,115,22,0.45)]",
  red: "shadow-[0_8px_24px_rgba(239,68,68,0.45)]",
  cyan: "shadow-[0_8px_24px_rgba(6,182,212,0.45)]"
};

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  subtitle?: string;
  index?: number;
}

export default function StatCard({ title, value, icon, color, subtitle, index = 0 }: StatCardProps) {
  const Icon = iconMap[icon] || Building2;

  return (
    <div
      style={{ animationDelay: (index * 90) + "ms" }}
      className="group animate-fade-in-up ease-apple bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-700 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{value}</h3>
          {subtitle && <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">{subtitle}</p>}
        </div>
        <div className={"w-14 h-14 rounded-2xl bg-gradient-to-br " + colorMap[color] + " " + glowMap[color] + " icon-3d flex items-center justify-center"}>
          <Icon className="w-7 h-7 text-white icon-anim icon-bounce" />
        </div>
      </div>
    </div>
  );
}