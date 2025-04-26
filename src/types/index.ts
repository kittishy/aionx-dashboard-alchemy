
// Tipos para a autenticação
export interface User {
  id: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

// Tipo para conexões
export interface Connection {
  id: string;
  user_id: string;
  name: string;
  server_id: string;
  channel_id: string;
  token?: string;
  active: boolean;
  created_at?: string;
}

// Declarações para o banco de dados Supabase
export interface Database {
  public: {
    Tables: {
      connections: {
        Row: Connection;
        Insert: Omit<Connection, 'id' | 'created_at'>;
        Update: Partial<Omit<Connection, 'id' | 'created_at'>>;
      };
      profiles: {
        Row: {
          id: string;
          username: string;
        };
        Insert: {
          id: string;
          username: string;
        };
        Update: Partial<{
          username: string;
        }>;
      };
    };
  };
}
