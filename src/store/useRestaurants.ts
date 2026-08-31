import React from 'react';
import { motion } from 'motion/react';
import { X, Zap, Rocket, Crown, Calendar, Phone, MapPin, Activity, Edit3, ShieldCheck } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { useCreateRestaurant, useUpdateRestaurant } from '../../hooks/useRestaurants';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

export default function RestaurantForm() {
  const { 
    editingRestaurant, 
    formData, 
    setFormData, 
    resetForm, 
    submitting, 
    setSubmitting 
  } = useDashboardStore();

  const createMutation = useCreateRestaurant();
  const updateMutation = useUpdateRestaurant();

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingRestaurant) {
        // Update
        const { login_email, password_hint, ...updateData } = formData;
        
        // Track changes for Telegram
        const oldData = { ...editingRestaurant };
        const newData = { ...editingRestaurant, ...updateData };

        await updateMutation.mutateAsync({ id: editingRestaurant.id, ...updateData });

        // Notify Telegram
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'RESTAURANT_UPDATED',
            data: { oldData, newData }
          })
        });

        alert('Restoran ma\'lumotlari yangilandi');
      } else {
        // Create
        // Check email uniqueness
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('email', formData.login_email)
          .maybeSingle();

        if (existingUser) {
          alert('Ushbu email bilan allaqachon restoran ochilgan!');
          setSubmitting(false);
          return;
        }

        const newRestaurant = await createMutation.mutateAsync({
          name: formData.name,
          plan_type: formData.plan_type,
          paid_until: formData.paid_until || null,
          phone: formData.phone,
          address: formData.address,
          info: formData.info,
          is_active: formData.is_active
        });

        // Create user
        const { error: userError } = await supabase
          .from('users')
          .insert([{
            email: formData.login_email,
            role: 'restaurant',
            restaurant_id: newRestaurant.id,
            password_hint: formData.password_hint
          }]);

        if (userError) throw userError;

        // Notify Telegram
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'RESTAURANT_CREATED',
            data: newRestaurant
          })
        });

        alert('Yangi restoran muvaffaqiyatli ochildi');
      }
      resetForm();
    } catch (err: any) {
      console.error('Error:', err);
      alert('Xatolik yuz berdi: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-mono text-agent-muted dark:text-dark-muted uppercase tracking-widest mb-1">
            {editingRestaurant ? 'Tahrirlash' : 'Yangi xisob'}
          </p>
          <h2 className="text-3xl font-bold tracking-tighter uppercase dark:text-white">
            {editingRestaurant ? 'Restoranni tahrirlash' : 'Restoran ochish'}
          </h2>
        </div>
        {editingRestaurant && (
          <button 
            onClick={resetForm}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 dark:text-white" />
          </button>
        )}
      </div>

      <div className="agent-card p-8 max-w-4xl">
        <form onSubmit={handleCreateOrUpdate} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-agent-muted dark:text-dark-muted border-b border-zinc-100 dark:border-zinc-800 pb-2">Asosiy ma'lumotlar</h4>
              
              <div className="space-y-2">
                <label htmlFor="rest-name" className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Restoran nomi *</label>
                <input 
                  id="rest-name"
                  required
                  type="text" 
                  className="agent-input" 
                  placeholder="Masalan: King Burger"
                  value={formData.name}
                  onChange={e => setFormData({ name: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Tarif rejasi *</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'lite', name: 'Lite', desc: 'Boshlang\'ich', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    { id: 'pro', name: 'Pro', desc: 'Professional', icon: Rocket, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                    { id: 'ultra', name: 'Ultra', desc: 'Maksimal', icon: Crown, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                  ].map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setFormData({ plan_type: plan.id as any })}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center group relative",
                        formData.plan_type === plan.id 
                          ? "border-black dark:border-white bg-zinc-50 dark:bg-zinc-900 shadow-sm" 
                          : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                      )}
                    >
                      <div className={cn("p-2 rounded-lg transition-colors", plan.bg, plan.color)}>
                        <plan.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-tight dark:text-white">{plan.name}</p>
                        <p className="text-[8px] text-zinc-400 font-medium">{plan.desc}</p>
                      </div>
                      {formData.plan_type === plan.id && (
                        <motion.div 
                          layoutId="plan-active"
                          className="absolute inset-0 border-2 border-black dark:border-white rounded-xl pointer-events-none"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="paid-until" className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">To'lov muddati</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" aria-hidden="true" />
                  <input 
                    id="paid-until"
                    type="date" 
                    className="agent-input pl-12" 
                    value={formData.paid_until}
                    onChange={e => setFormData({ paid_until: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-agent-muted dark:text-dark-muted border-b border-zinc-100 dark:border-zinc-800 pb-2">Aloqa va Manzil</h4>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Telefon raqami</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" aria-hidden="true" />
                  <input 
                    id="phone"
                    type="tel" 
                    className="agent-input pl-12" 
                    placeholder="+998 90 123 45 67"
                    value={formData.phone}
                    onChange={e => setFormData({ phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Manzil</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" aria-hidden="true" />
                  <input 
                    id="address"
                    type="text" 
                    className="agent-input pl-12" 
                    placeholder="Toshkent sh., Chilonzor"
                    value={formData.address}
                    onChange={e => setFormData({ address: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="info" className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Qo'shimcha tavsif</label>
                <textarea 
                  id="info"
                  rows={3}
                  className="agent-input resize-none" 
                  placeholder="Restoran haqida qisqacha..."
                  value={formData.info}
                  onChange={e => setFormData({ info: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            {!editingRestaurant && (
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-agent-muted dark:text-dark-muted border-b border-zinc-100 dark:border-zinc-800 pb-2">Kirish ma'lumotlari</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Login Email *</label>
                    <input 
                      id="login-email"
                      required={!editingRestaurant}
                      type="email" 
                      className="agent-input" 
                      placeholder="admin@restoran.uz"
                      value={formData.login_email}
                      onChange={e => setFormData({ login_email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password-hint" className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Parol eslatmasi *</label>
                    <input 
                      id="password-hint"
                      required={!editingRestaurant}
                      type="text" 
                      className="agent-input" 
                      placeholder="Masalan: tug'ilgan yil"
                      value={formData.password_hint}
                      onChange={e => setFormData({ password_hint: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className={cn("flex flex-col justify-end gap-4", editingRestaurant ? "md:col-span-2" : "")}>
              <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase dark:text-white">Xisob holati</p>
                  <p className="text-[10px] text-agent-muted dark:text-dark-muted">Restoran tizimga kira oladimi?</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({ is_active: !formData.is_active })}
                  className={cn(
                    "px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all",
                    formData.is_active ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                  )}
                >
                  {formData.is_active ? 'Faol' : 'Bloklangan'}
                </button>
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="agent-button-primary w-full py-4 flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <Activity className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {editingRestaurant ? <Edit3 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    {editingRestaurant ? 'O\'zgarishlarni saqlash' : 'Restoranni tasdiqlash'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
