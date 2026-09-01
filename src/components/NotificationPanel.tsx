import React from "react";
import { CheckCircle, AlertCircle, XCircle, Settings, CheckCheck, Inbox } from "lucide-react";
import { NotificationItem } from "../data/notifications";

const typeConfig: any = {
  payment: { icon: AlertCircle, bg: "bg-yellow-100 dark:bg-yellow-900/60", text: "text-yellow-600 dark:text-yellow-300" },
  new: { icon: CheckCircle, bg: "bg-green-100 dark:bg-green-900/60", text: "text-green-600 dark:text-green-300" },
  alert: { icon: XCircle, bg: "bg-red-100 dark:bg-red-900/60", text: "text-red-600 dark:text-red-300" },
  system: { icon: Settings, bg: "bg-blue-100 dark:bg-blue-900/60", text: "text-blue-600 dark:text-blue-300" }
};

interface Props {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onMarkRead: (id: number) => void;
  onClose: () => void;
}

export default function NotificationPanel({ notifications, onMarkAllRead, onMarkRead, onClose }: Props) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      <div className="absolute right-0 top-14 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 dark:text-white">Bildirishnomalar</h3>
          <button onClick={onMarkAllRead} className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-300 hover:underline">
            <CheckCheck className="w-4 h-4" />
            Barchasini o'qish
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 && (
            <div className="p-8 text-center">
              <Inbox className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Bildirishnomalar yo'q</p>
            </div>
          )}
          {notifications.map((n) => {
            const config = typeConfig[n.type];
            const Icon = config.icon;
            return (
              <button
                key={n.id}
                onClick={() => onMarkRead(n.id)}
                className={"w-full flex items-start gap-3 p-4 text-left transition-colors " + (n.read ? "hover:bg-gray-50 dark:hover:bg-gray-700/50" : "bg-blue-50/60 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/30")}
              >
                <div className={"w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 " + config.bg}>
                  <Icon className={"w-5 h-5 " + config.text} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{n.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}