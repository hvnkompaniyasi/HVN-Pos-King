export const statistics = [
  { title: "Jami restoranlar", value: "156", icon: "Building2", color: "blue", subtitle: "Barcha davrlar bo'yicha" },
  { title: "Faol restoranlar", value: "128", icon: "CheckCircle", color: "green", subtitle: "To'lov qilgan" },
  { title: "To'lov kutilmoqda", value: "18", icon: "AlertCircle", color: "orange", subtitle: "3 kun ichida to'lov qilishi kerak" },
  { title: "Bloklangan", value: "10", icon: "XCircle", color: "red", subtitle: "To'lov qilmagan" },
  { title: "Yangi (bu oy)", value: "23", icon: "Calendar", color: "cyan" },
  { title: "Jami foydalanuvchilar", value: "1,247", icon: "Users", color: "blue" }
];

export const tariffs = [
  { name: "Basic", count: "45", price: "150,000 so'm/oy", color: "blue", features: ["1 kassa", "100 ta mahsulot", "Email yordam"] },
  { name: "Pro", count: "62", price: "300,000 so'm/oy", color: "purple", features: ["3 kassa", "500 ta mahsulot", "Telefon yordam", "SMS xabarnomalar"] },
  { name: "Premium", count: "21", price: "500,000 so'm/oy", color: "gold", features: ["Cheksiz kassa", "Cheksiz mahsulot", "24/7 yordam", "API kirish", "Mobil ilova"] },
  { name: "Enterprise", count: "0", price: "Individual", color: "gray", features: ["Maxsus yechim", "O'z serveri", "Maxsus integratsiya"] }
];

export const restaurants = [
  { id: 1, name: "Burger House", owner: "Ali Valiyev", tariff: "Pro", status: "active", date: "2024-01-15", revenue: "2,450,000" },
  { id: 2, name: "Pizza Corner", owner: "Vali Aliyev", tariff: "Basic", status: "inactive", date: "2024-01-14", revenue: "0" },
  { id: 3, name: "Sushi Bar", owner: "Sara Karimova", tariff: "Premium", status: "active", date: "2024-01-13", revenue: "5,780,000" },
  { id: 4, name: "Cafe Delight", owner: "Jamshid Bek", tariff: "Pro", status: "blocked", date: "2024-01-12", revenue: "1,230,000" },
  { id: 5, name: "Fast Food Plus", owner: "Nargiza Ali", tariff: "Basic", status: "active", date: "2024-01-11", revenue: "890,000" }
];