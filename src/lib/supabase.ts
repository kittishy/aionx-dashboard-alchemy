
import { createClient } from "@supabase/supabase-js";
import { Connection } from "@/types";

// Substitua estas variáveis pelos seus valores do Supabase
// Você deve utilizar a integração do Supabase no Lovable para configurar estas variáveis
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Initialize a Supabase client
const initSupabaseClient = () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(
        "Supabase URL and Anon Key are required. Please set them using the Supabase integration."
      );
      
      // Return mock client with helpful error messages
      return {
        auth: {
          signUp: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
          signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
          signOut: () => Promise.resolve({ error: new Error("Supabase not configured") }),
          getUser: () => Promise.resolve({ data: { user: null }, error: new Error("Supabase not configured") }),
          onAuthStateChange: () => ({ 
            subscription: { unsubscribe: () => {} }, 
            data: { subscription: { unsubscribe: () => {} } } 
          })
        },
        from: () => ({
          select: () => ({ eq: () => Promise.resolve({ data: [], error: new Error("Supabase not configured") }) }),
          insert: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
          update: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
          delete: () => Promise.resolve({ error: new Error("Supabase not configured") }),
        }),
      };
    } else {
      // Return actual Supabase client
      return createClient(supabaseUrl, supabaseAnonKey);
    }
  } catch (error) {
    console.error("Error initializing Supabase client:", error);
    
    // Return fallback mock client
    return {
      auth: {
        signUp: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        signOut: () => Promise.resolve({ error: new Error("Supabase initialization failed") }),
        getUser: () => Promise.resolve({ data: { user: null }, error: new Error("Supabase initialization failed") }),
        onAuthStateChange: () => ({ 
          subscription: { unsubscribe: () => {} }, 
          data: { subscription: { unsubscribe: () => {} } } 
        })
      },
      from: () => ({
        select: () => ({ eq: () => Promise.resolve({ data: [], error: new Error("Supabase initialization failed") }) }),
        insert: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        update: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        delete: () => Promise.resolve({ error: new Error("Supabase initialization failed") }),
      }),
    };
  }
};

// Export the client (either real or mock)
export const supabase = initSupabaseClient();

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
