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

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  subtitle?: string;
}

export default function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  const Icon = iconMap[icon] || Building2;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{value}</h3>
          {subtitle && <p className="text-gray-400 text-xs mb-2">{subtitle}</p>}
        </div>
        <div className={"w-14 h-14 rounded-2xl bg-gradient-to-br " + colorMap[color] + " flex items-center justify-center shadow-lg"}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
}