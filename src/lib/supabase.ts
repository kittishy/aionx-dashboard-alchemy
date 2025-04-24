
import { createClient } from "@supabase/supabase-js";
import { Connection } from "@/types";

// Use the environment variables or the values from the integrated Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Initialize a Supabase client
const initSupabaseClient = () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(
        "Supabase URL and Anon Key are required. Please set them using the Supabase integration."
      );
      
      // Create proper mock implementations for the chained methods
      const mockFilterBuilder = {
        eq: () => Promise.resolve({ data: [], error: new Error("Supabase not configured") }),
        select: () => mockFilterBuilder,
      };
      
      // Create a mock insert builder that supports select()
      const mockInsertBuilder = {
        select: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      };
      
      // Create a mock update builder that properly supports both eq() and select() chaining
      const mockUpdateBuilder = {
        eq: () => ({
          select: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        }),
        select: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      };
      
      // Return mock client with improved error messages and proper method chaining
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
          select: () => mockFilterBuilder,
          insert: () => mockInsertBuilder,
          update: () => mockUpdateBuilder,
          delete: () => mockFilterBuilder,
        }),
      };
    } else {
      // Return actual Supabase client
      return createClient(supabaseUrl, supabaseAnonKey);
    }
  } catch (error) {
    console.error("Error initializing Supabase client:", error);
    
    // Create proper mock implementations for the chained methods in the fallback
    const mockFilterBuilder = {
      eq: () => Promise.resolve({ data: [], error: new Error("Supabase initialization failed") }),
      select: () => mockFilterBuilder,
    };
    
    // Create a mock insert builder that supports select()
    const mockInsertBuilder = {
      select: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
    };
    
    // Create a mock update builder that properly supports both eq() and select() chaining
    const mockUpdateBuilder = {
      eq: () => ({
        select: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
      }),
      select: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
    };
    
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
        select: () => mockFilterBuilder,
        insert: () => mockInsertBuilder,
        update: () => mockUpdateBuilder,
        delete: () => mockFilterBuilder,
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
