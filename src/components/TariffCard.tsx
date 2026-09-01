import React from "react";
import { CreditCard } from "lucide-react";

const colorMap: any = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  gold: "from-yellow-400 to-yellow-600"
};

const glowMap: any = {
  blue: "shadow-[0_8px_24px_rgba(59,130,246,0.45)]",
  purple: "shadow-[0_8px_24px_rgba(168,85,247,0.45)]",
  gold: "shadow-[0_8px_24px_rgba(234,179,8,0.45)]"
};

interface TariffCardProps {
  name: string;
  count: string;
  price: string;
  color: string;
  index?: number;
}

export default function TariffCard({ name, count, price, color, index = 0 }: TariffCardProps) {
  return (
    <div
      style={{ animationDelay: (index * 110) + "ms" }}
      className="group animate-fade-in-up ease-apple bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-700 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
    >
      <div className={"w-12 h-12 rounded-xl bg-gradient-to-br " + colorMap[color] + " " + glowMap[color] + " icon-3d flex items-center justify-center mb-4"}>
        <CreditCard className="w-6 h-6 text-white icon-anim icon-wiggle" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{name}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{price}</p>
      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{count}</div>
      <p className="text-gray-400 dark:text-gray-500 text-xs">restoran</p>
    </div>
  );
}