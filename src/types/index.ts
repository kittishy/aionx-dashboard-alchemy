
// Tipos para a autenticação
export interface User {
  id: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

// Declarações para o banco de dados Supabase
export interface Database {
  public: {
    Tables: {
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
