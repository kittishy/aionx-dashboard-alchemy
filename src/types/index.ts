
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Connection {
  id: string;
  user_id: string;
  server_id: string;
  channel_id: string;
  name: string;
  active: boolean;
  created_at: string;
}

// Define additional database types to help Supabase
export type Database = {
  public: {
    Tables: {
      connections: {
        Row: Connection;
        Insert: Omit<Connection, "id" | "created_at">;
        Update: Partial<Connection>;
      };
    };
  };
};
