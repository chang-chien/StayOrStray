import { DEMO_USER_ID } from "@/lib/constants";
import { createSupabaseClient } from "@/lib/supabase/client";
import type { CreateScenarioInput, Scenario } from "@/types/scenario";

function mapRow(row: Record<string, unknown>): Scenario {
  return {
    id: row.id as string,
    user_id: row.user_id as string,
    name: row.name as string,
    country_id: row.country_id as string,
    salary_mode: row.salary_mode as Scenario["salary_mode"],
    annual_salary: row.annual_salary as number | null,
    monthly_salary: row.monthly_salary as number | null,
    bonus: Number(row.bonus),
    raise_rate: Number(row.raise_rate),
    insurance_rate: Number(row.insurance_rate),
    pension_rate: Number(row.pension_rate),
    living_cost: Number(row.living_cost),
    rent_cost: Number(row.rent_cost),
    created_at: row.created_at as string,
  };
}

export async function createScenario(input: CreateScenarioInput): Promise<Scenario> {
  const supabase = createSupabaseClient();

  const payload = {
    user_id: DEMO_USER_ID,
    name: input.name.trim(),
    country_id: input.country_id,
    salary_mode: input.salary_mode ?? "annual",
    annual_salary: input.annual_salary ?? null,
    monthly_salary: input.monthly_salary ?? null,
    bonus: input.bonus ?? 0,
    raise_rate: input.raise_rate ?? 0,
    insurance_rate: input.insurance_rate ?? 0,
    pension_rate: input.pension_rate ?? 0,
    living_cost: input.living_cost,
    rent_cost: input.rent_cost,
  };

  const { data, error } = await supabase.from("scenarios").insert(payload).select().single();

  if (error) {
    throw new Error(error.message);
  }

  return mapRow(data);
}

export async function getScenarioById(id: string): Promise<Scenario | null> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("scenarios")
    .select("*")
    .eq("id", id)
    .eq("user_id", DEMO_USER_ID)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapRow(data) : null;
}

export async function listScenarios(): Promise<Scenario[]> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("scenarios")
    .select("*")
    .eq("user_id", DEMO_USER_ID)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapRow);
}

export async function listCountries(): Promise<{ id: string; name: string; currency_code: string }[]> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("countries").select("id, name, currency_code").order("name");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
