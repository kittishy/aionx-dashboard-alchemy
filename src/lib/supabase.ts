
import { createClient } from "@supabase/supabase-js";

// Substitua estas variáveis pelos seus valores do Supabase
// Você deve utilizar a integração do Supabase no Lovable para configurar estas variáveis
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL and Anon Key are required. Please set them using the Supabase integration."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
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
    .eq("user_id", userId);
  return { data, error };
};

export const createConnection = async (connection: Omit<Connection, "id" | "created_at">) => {
  const { data, error } = await supabase
    .from("connections")
    .insert([connection])
    .select();
  return { data, error };
};

export const updateConnection = async (id: string, updates: Partial<Connection>) => {
  const { data, error } = await supabase
    .from("connections")
    .update(updates)
    .eq("id", id)
    .select();
  return { data, error };
};

export const deleteConnection = async (id: string) => {
  const { error } = await supabase
    .from("connections")
    .delete()
    .eq("id", id);
  return { error };
};
