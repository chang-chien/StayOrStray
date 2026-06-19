export type SalaryMode = "annual" | "monthly";

export interface ScenarioRow {
  id: string;
  user_id: string;
  name: string;
  country_id: string;
  salary_mode: SalaryMode;
  annual_salary: number | null;
  monthly_salary: number | null;
  bonus: number;
  raise_rate: number;
  insurance_rate: number;
  pension_rate: number;
  living_cost: number;
  rent_cost: number;
  created_at: string;
}

export interface CreateScenarioInput {
  name: string;
  country_id: string;
  salary_mode?: SalaryMode;
  annual_salary?: number | null;
  monthly_salary?: number | null;
  bonus?: number;
  raise_rate?: number;
  insurance_rate?: number;
  pension_rate?: number;
  living_cost: number;
  rent_cost: number;
}

export type Scenario = ScenarioRow;

