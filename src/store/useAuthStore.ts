import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

export const APP_ID = "pos-king";

interface Profile {
  id: string;
  email: string;
  role: string;
  allowed_apps: string[];
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  allowed: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

async function loadProfile(userId: string): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return (data as Profile) || null;
}

function checkAccess(profile: Profile | null): boolean {
  if (!profile) return false;
  return profile.role === "admin" || profile.allowed_apps.includes(APP_ID);
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  profile: null,
  loading: true,
  allowed: false,

  initialize: async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;
    let profile: Profile | null = null;
    if (session) {
      profile = await loadProfile(session.user.id);
    }
    set({
      session,
      user: session?.user ?? null,
      profile,
      allowed: checkAccess(profile),
      loading: false
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      let profile: Profile | null = null;
      if (session) {
        profile = await loadProfile(session.user.id);
      }
      set({
        session,
        user: session?.user ?? null,
        profile,
        allowed: checkAccess(profile)
      });
    });
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };

    const profile = await loadProfile(data.user.id);
    if (!checkAccess(profile)) {
      await supabase.auth.signOut();
      return { error: "Bu hisob ushbu tizimga kirish huquqiga ega emas" };
    }

    set({ user: data.user, profile, allowed: true });
    return { error: null };
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, profile: null, allowed: false });
  }
}));