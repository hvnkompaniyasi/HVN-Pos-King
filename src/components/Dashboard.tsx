import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import RestaurantList from './RestaurantList';
import { useDashboardStore } from '../store/useDashboardStore';
import { 
  Building2, Users, DollarSign, TrendingUp, TrendingDown, 
  CheckCircle, XCircle, AlertCircle, Plus, Search, 
  MoreVertical, Eye, Edit, Trash2, Shield, CreditCard,
  Activity, Calendar, Filter, Download
} from 'lucide-react';

function StatCard({ title, value, icon: Icon, color, subtitle }: any) {
  const colors: any = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    cyan: 'from-cyan-500 to-cyan-600',
  };

  return (
    <div className='bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <p className='text-gray-500 text-sm font-medium mb-1'>{title}</p>
          <h3 className='text-3xl font-bold text-gray-800 mb-2'>{value}</h3>
          {subtitle && <p className='text-gray-400 text-xs mb-2'>{subtitle}</p>}
        </div>
        <div className={'w-14 h-14 rounded-2xl bg-gradient-to-br ' + colors[color] + ' flex items-center justify-center shadow-lg'}>
          <Icon className='w-7 h-7 text-white' />
        </div>
      </div>
    </div>
  );
}

function TariffCard({ name, count, price, color, features }: any) {
  const colors: any = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    gold: 'from-yellow-400 to-yellow-600',
    gray: 'from-gray-500 to-gray-600',
  };

  return (
    <div className='bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300'>
      <div className={'w-12 h-12 rounded-xl bg-gradient-to-br ' + colors[color] + ' flex items-center justify-center mb-4'}>
        <CreditCard className='w-6 h-6 text-white' />
      </div>
      <h3 className='text-lg font-bold text-gray-800 mb-1'>{name}</h3>
      <p className='text-gray-500 text-sm mb-3'>{price}</p>
      <div className='text-3xl font-bold text-gray-800 mb-3'>{count}</div>
      <p className='text-gray-400 text-xs'>restoran</p>
      <div className='mt-4 space-y-2'>
        {features.map((feature: string, idx: number) => (
          <div key={idx} className='flex items-center gap-2 text-xs text-gray-600'>
            <CheckCircle className='w-3 h-3 text-green-500' />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentRestaurantsTable() {
  const restaurants = [
    { id: 1, name: 'Burger House', owner: 'Ali Valiyev', tariff: 'Pro', status: 'active', date: '2024-01-15', revenue: '2,450,000' },
    { id: 2, name: 'Pizza Corner', owner: 'Vali Aliyev', tariff: 'Basic', status: 'inactive', date: '2024-01-14', revenue: '0' },
    { id: 3, name: 'Sushi Bar', owner: 'Sara Karimova', tariff: 'Premium', status: 'active', date: '2024-01-13', revenue: '5,780,000' },
    { id: 4, name: 'Cafe Delight', owner: 'Jamshid Bek', tariff: 'Pro', status: 'blocked', date: '2024-01-12', revenue: '1,230,000' },
    { id: 5, name: 'Fast Food Plus', owner: 'Nargiza Ali', tariff: 'Basic', status: 'active', date: '2024-01-11', revenue: '890,000' },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className='px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1 w-fit'><CheckCircle className='w-3 h-3' />Faol</span>;
    } else if (status === 'inactive') {
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit"><AlertCircle className='w-3 h-3' />To'lov kutilmoqda</span>;
    } else {
      return <span className='px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1 w-fit'><XCircle className='w-3 h-3' />Bloklangan</span>;
    }
  };

  return (
    <div className='bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden'>
      <div className='p-6 border-b border-gray-100 flex items-center justify-between'>
        <h3 className='text-xl font-bold text-gray-800'>Oxirgi qo'shilgan restoranlar</h3>
        <button className='flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-colors'>
          Barchasini ko'rish
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase'>Restoran</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase'>Egasi</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase'>Tarif</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase'>Holat</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase'>Daromad</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase'>Qo'shilgan</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase'>Amallar</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center'>
                      <Building2 className='w-5 h-5 text-blue-600' />
                    </div>
                    <span className='font-semibold text-gray-800'>{restaurant.name}</span>
                  </div>
                </td>
                <td className='px-6 py-4 text-gray-600'>{restaurant.owner}</td>
                <td className='px-6 py-4'>
                  <span className='px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700'>{restaurant.tariff}</span>
                </td>
                <td className='px-6 py-4'>{getStatusBadge(restaurant.status)}</td>
                <td className='px-6 py-4 font-semibold text-gray-800'>{restaurant.revenue} so'm</td>
                <td className='px-6 py-4 text-gray-500 text-sm'>{restaurant.date}</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-2'>
                    <button className='p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600'>
                      <Eye className='w-4 h-4' />
                    </button>
                    <button className='p-2 hover:bg-yellow-50 rounded-lg transition-colors text-yellow-600'>
                      <Edit className='w-4 h-4' />
                    </button>
                    <button className='p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600'>
                      <Trash2 className='w-4 h-4' />
                    </button>
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

export default function Dashboard() {
  const { activeTab } = useDashboardStore();

  const handleLogout = () => {
    console.log('Chiqish bosildi');
  };

  if (activeTab === 'restaurants') {
    return (
      <div className='flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100'>
        <Sidebar onLogout={handleLogout} />
        <main className='flex-1 flex flex-col overflow-hidden'>
          <Header />
          <div className='flex-1 overflow-auto p-8'>
            <RestaurantList />
          </div>
        </main>
      </div>
    );
  }

  if (activeTab === 'agents') {
    return (
      <div className='flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100'>
        <Sidebar onLogout={handleLogout} />
        <main className='flex-1 flex flex-col overflow-hidden'>
          <Header />
          <div className='flex-1 overflow-auto p-8'>
            <div className='max-w-2xl mx-auto'>
              <div className='bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>Yangi restoran qo'shish</h2>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Restoran nomi *</label>
                    <input type='text' placeholder='Restoran nomini kiriting' className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300' />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Egasi/FIO *</label>
                    <input type='text' placeholder='Egasining ismi' className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300' />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>Telefon *</label>
                      <input type='tel' placeholder='+998 (__) ___-__-__' className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300' />
                    </div>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>Tarif *</label>
                      <select className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'>
                        <option>Basic - 150,000 so'm/oy</option>
                        <option>Pro - 300,000 so'm/oy</option>
                        <option>Premium - 500,000 so'm/oy</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Manzil</label>
                    <input type="text" placeholder="Shahar, ko'cha, uy" className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300' />
                  </div>
                  <div className='pt-4 flex gap-3'>
                    <button className='flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-300 transform hover:scale-[1.02]'>
                      Restoranni yaratish
                    </button>
                    <button className='px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300'>
                      Bekor qilish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100'>
      <Sidebar onLogout={handleLogout} />
      <main className='flex-1 flex flex-col overflow-hidden'>
        <Header />
        <div className='flex-1 overflow-auto p-8'>
          <div className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <StatCard 
                title='Jami restoranlar'
                value='156'
                icon={Building2}
                color='blue'
                subtitle="Barcha davrlar bo'yicha"
              />
              <StatCard 
                title='Faol restoranlar'
                value='128'
                icon={CheckCircle}
                color='green'
                subtitle="To'lov qilgan"
              />
              <StatCard 
                title="To'lov kutilmoqda"
                value='18'
                icon={AlertCircle}
                color='orange'
                subtitle="3 kun ichida to'lov qilishi kerak"
              />
              <StatCard 
                title='Bloklangan'
                value='10'
                icon={XCircle}
                color='red'
                subtitle="To'lov qilmagan"
              />
              <StatCard 
                title='Yangi (bu oy)'
                value='23'
                icon={Calendar}
                color='cyan'
              />
              <StatCard 
                title='Jami foydalanuvchilar'
                value='1,247'
                icon={Users}
                color='blue'
              />
            </div>

            <div>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>Tariflar bo'yicha taqsimot</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <TariffCard 
                  name='Basic'
                  count='45'
                  price="150,000 so'm/oy"
                  color='blue'
                  features={['1 kassa', '100 ta mahsulot', 'Email yordam']}
                />
                <TariffCard 
                  name='Pro'
                  count='62'
                  price="300,000 so'm/oy"
                  color='purple'
                  features={['3 kassa', '500 ta mahsulot', 'Telefon yordam', 'SMS xabarnomalar']}
                />
                <TariffCard 
                  name='Premium'
                  count='21'
                  price="500,000 so'm/oy"
                  color='gold'
                  features={['Cheksiz kassa', 'Cheksiz mahsulot', '24/7 yordam', 'API kirish', 'Mobil ilova']}
                />
                <TariffCard 
                  name='Enterprise'
                  count='0'
                  price='Individual'
                  color='gray'
                  features={['Maxsus yechim', "O'z serveri", 'Maxsus integratsiya']}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center flex-shrink-0'>
                    <AlertCircle className='w-6 h-6 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-lg font-bold text-gray-800 mb-2'>To'lov muddati yaqinlashgan</h3>
                    <p className='text-gray-600 text-sm mb-3'>5 ta restoranning to'lov muddati 3 kun ichida tugaydi</p>
                    <button className='px-4 py-2 bg-yellow-500 text-white rounded-xl text-sm font-semibold hover:bg-yellow-600 transition-colors'>
                      Eslatma yuborish
                    </button>
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0'>
                    <Activity className='w-6 h-6 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-lg font-bold text-gray-800 mb-2'>Yuqori faollik</h3>
                    <p className='text-gray-600 text-sm mb-3'>Bugun 89 ta restoran faol ishlagan</p>
                    <div className='flex items-center gap-2 text-blue-600 text-sm font-semibold'>
                      <TrendingUp className='w-4 h-4' />
                      +12% o'tgan haftaga nisbatan
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <RecentRestaurantsTable />
          </div>
        </div>
      </main>
    </div>
  );
}