import { createClient } from "@supabase/supabase-js";
import { Connection } from "@/types";

// Substitua estas variáveis pelos seus valores do Supabase
// Você deve utilizar a integração do Supabase no Lovable para configurar estas variáveis
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Create a temporary default client for development
// This will prevent the app from crashing during initial development
// but functionality requiring Supabase will only work after proper configuration
let supabase;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase URL and Anon Key are required. Please set them using the Supabase integration."
    );
    // Create a mock client that will show clear error messages when methods are called
    supabase = {
      auth: {
        signUp: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        signOut: () => Promise.resolve({ error: new Error("Supabase not configured") }),
        getUser: () => Promise.resolve({ data: { user: null }, error: new Error("Supabase not configured") }),
        onAuthStateChange: () => ({ subscription: { unsubscribe: () => {} }, data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        select: () => ({ eq: () => Promise.resolve({ data: [], error: new Error("Supabase not configured") }) }),
        insert: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        update: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        delete: () => Promise.resolve({ error: new Error("Supabase not configured") }),
      }),
    };
  } else {
    // Create the actual Supabase client if we have the required configuration
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.error("Error initializing Supabase client:", error);
  // Provide a fallback object to prevent the app from crashing
  supabase = {
    auth: { /* same mock implementations as above */ },
    from: () => ({ /* same mock implementations as above */ }),
  };
}

// Export the client (either real or mock)
export const supabase = supabase;

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
