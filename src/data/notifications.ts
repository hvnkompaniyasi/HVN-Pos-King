export interface NotificationItem {
  id: number;
  type: "payment" | "new" | "alert" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const initialNotifications: NotificationItem[] = [];