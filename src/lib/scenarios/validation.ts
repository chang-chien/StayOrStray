import type { CreateScenarioInput, SalaryMode } from "@/types/scenario";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseOptionalNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function parseRequiredNumber(value: unknown, field: string, errors: string[]): number | null {
  const num = parseOptionalNumber(value);
  if (num === null) {
    errors.push(`${field} is required and must be a number`);
    return null;
  }
  if (num < 0) {
    errors.push(`${field} must be zero or greater`);
  }
  return num;
}

export function validateCreateScenarioInput(body: unknown): ValidationResult & { data?: CreateScenarioInput } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be a JSON object"] };
  }

  const input = body as Record<string, unknown>;

  if (!isNonEmptyString(input.name)) {
    errors.push("name is required");
  }

  if (!isNonEmptyString(input.country_id)) {
    errors.push("country_id is required");
  }

  const salaryMode = (input.salary_mode as SalaryMode | undefined) ?? "annual";
  if (salaryMode !== "annual" && salaryMode !== "monthly") {
    errors.push("salary_mode must be 'annual' or 'monthly'");
  }

  const annualSalary = parseOptionalNumber(input.annual_salary);
  const monthlySalary = parseOptionalNumber(input.monthly_salary);
  const livingCost = parseRequiredNumber(input.living_cost, "living_cost", errors);
  const rentCost = parseRequiredNumber(input.rent_cost, "rent_cost", errors);

  if (salaryMode === "annual" && annualSalary === null) {
    errors.push("annual_salary is required when salary_mode is annual");
  }

  if (salaryMode === "monthly" && monthlySalary === null) {
    errors.push("monthly_salary is required when salary_mode is monthly");
  }

  const bonus = parseOptionalNumber(input.bonus) ?? 0;
  const raiseRate = parseOptionalNumber(input.raise_rate) ?? 0;
  const insuranceRate = parseOptionalNumber(input.insurance_rate) ?? 0;
  const pensionRate = parseOptionalNumber(input.pension_rate) ?? 0;

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      name: (input.name as string).trim(),
      country_id: input.country_id as string,
      salary_mode: salaryMode,
      annual_salary: annualSalary,
      monthly_salary: monthlySalary,
      bonus,
      raise_rate: raiseRate,
      insurance_rate: insuranceRate,
      pension_rate: pensionRate,
      living_cost: livingCost!,
      rent_cost: rentCost!,
    },
  };
}
