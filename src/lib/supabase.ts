
import { createClient } from "@supabase/supabase-js";
import { Connection, Database } from "@/types";
import { supabase as integratedSupabase } from "@/integrations/supabase/client";

// Initialize Supabase client using the integrated client
export const supabase = integratedSupabase;

// Auth helpers
export const signUp = async (email: string, password: string, userData?: { username: string }) => {
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: userData
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

// Connections helpers
export const getUserConnections = async (userId: string) => {
  const { data, error } = await supabase
    .from("connections")
    .select("*")
    .eq("user_id", userId) as { data: Connection[] | null; error: Error | null };
  return { data: data || [], error };
};

export const createConnection = async (connection: Omit<Connection, "id" | "created_at">) => {
  const { data, error } = await supabase
    .from("connections")
    .insert([connection])
    .select() as { data: Connection[] | null; error: Error | null };
  return { data: data || [], error };
};

export const updateConnection = async (id: string, updates: Partial<Connection>) => {
  const { data, error } = await supabase
    .from("connections")
    .update(updates)
    .eq("id", id)
    .select() as { data: Connection[] | null; error: Error | null };
  return { data: data || [], error };
};

export const deleteConnection = async (id: string) => {
  const { error } = await supabase
    .from("connections")
    .delete()
    .eq("id", id) as { error: Error | null };
  return { error };
};
