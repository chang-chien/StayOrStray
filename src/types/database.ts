export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      scenarios: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          country_id: string;
          salary_mode: string;
          annual_salary: number | null;
          monthly_salary: number | null;
          bonus: number;
          raise_rate: number;
          insurance_rate: number;
          pension_rate: number;
          living_cost: number;
          rent_cost: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          country_id: string;
          salary_mode?: string;
          annual_salary?: number | null;
          monthly_salary?: number | null;
          bonus?: number;
          raise_rate?: number;
          insurance_rate?: number;
          pension_rate?: number;
          living_cost: number;
          rent_cost: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          country_id?: string;
          salary_mode?: string;
          annual_salary?: number | null;
          monthly_salary?: number | null;
          bonus?: number;
          raise_rate?: number;
          insurance_rate?: number;
          pension_rate?: number;
          living_cost?: number;
          rent_cost?: number;
          created_at?: string;
        };
      };
      countries: {
        Row: {
          id: string;
          name: string;
          currency_code: string;
        };
        Insert: {
          id?: string;
          name: string;
          currency_code: string;
        };
        Update: {
          id?: string;
          name?: string;
          currency_code?: string;
        };
      };
    };
  };
}
