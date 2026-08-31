import React from "react";
import { CheckCircle, CreditCard } from "lucide-react";

const colorMap: any = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  gold: "from-yellow-400 to-yellow-600",
  gray: "from-gray-500 to-gray-600"
};

interface TariffCardProps {
  name: string;
  count: string;
  price: string;
  color: string;
  features: string[];
}

export default function TariffCard({ name, count, price, color, features }: TariffCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
      <div className={"w-12 h-12 rounded-xl bg-gradient-to-br " + colorMap[color] + " flex items-center justify-center mb-4"}>
        <CreditCard className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
      <p className="text-gray-500 text-sm mb-3">{price}</p>
      <div className="text-3xl font-bold text-gray-800 mb-3">{count}</div>
      <p className="text-gray-400 text-xs">restoran</p>
      <div className="mt-4 space-y-2">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle className="w-3 h-3 text-green-500" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}