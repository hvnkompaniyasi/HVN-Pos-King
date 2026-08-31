import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setRole } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (user) {
        // Check role in users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (userError) {
          console.error('Role check error:', userError);
          await supabase.auth.signOut();
          throw new Error(`Database error: ${userError.message}. Check if RLS policies allow reading the "users" table.`);
        }

        if (!userData) {
          await supabase.auth.signOut();
          throw new Error('User profile not found in "users" table.');
        }

        const role = userData.role?.toLowerCase();
        if (role !== 'king') {
          console.log('Unauthorized role detected:', role);
          await supabase.auth.signOut();
          throw new Error(`Access denied. Role "${role}" detected, but "king" is required.`);
        }

        setUser(user);
        setRole(role);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 p-6 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-black dark:bg-white flex items-center justify-center rounded-2xl mb-6 shadow-2xl">
            <Shield className="text-white dark:text-black w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2 text-black dark:text-white">HVN EmpireOS</h1>
          <p className="text-agent-muted dark:text-dark-muted text-sm font-mono uppercase tracking-widest">Xavfsiz Kirish Protokoli</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-agent-muted dark:text-dark-muted flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email Manzili
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="agent-input"
                placeholder="agent@hvnpos.king"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-agent-muted dark:text-dark-muted flex items-center gap-2">
                <Lock className="w-3 h-3" /> Parol
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="agent-input"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-lg font-medium"
                role="alert"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              aria-label={loading ? "Kirish kutilmoqda" : "Sessiyani boshlash"}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              ) : (
                <>
                  Sessiyani Boshlash
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
