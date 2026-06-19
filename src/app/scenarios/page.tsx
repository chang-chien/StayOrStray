import Link from "next/link";
import { listScenarios } from "@/lib/scenarios/repository";
import type { Scenario } from "@/types/scenario";

export const dynamic = "force-dynamic";

function formatSalary(scenario: Scenario): string {
  if (scenario.salary_mode === "monthly" && scenario.monthly_salary != null) {
    return `${scenario.monthly_salary.toLocaleString()}/mo`;
  }
  if (scenario.annual_salary != null) {
    return `${scenario.annual_salary.toLocaleString()}/yr`;
  }
  return "—";
}

function formatCurrency(value: number): string {
  return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export default async function ScenariosPage() {
  let scenarios: Scenario[] = [];
  let error: string | null = null;

  try {
    scenarios = await listScenarios();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load scenarios";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Scenarios</h1>
          <p className="text-sm text-[var(--muted)]">Saved life-path assumptions for comparison.</p>
        </div>
        <Link
          href="/scenario/new"
          className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm text-white hover:bg-[var(--primary-hover)]"
        >
          New Scenario
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error && scenarios.length === 0 && (
        <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--card)] p-8 text-center">
          <p className="text-[var(--muted)]">No scenarios yet.</p>
          <Link href="/scenario/new" className="mt-3 inline-block text-[var(--primary)] hover:underline">
            Create your first scenario
          </Link>
        </div>
      )}

      {scenarios.length > 0 && (
        <ul className="grid gap-4">
          {scenarios.map((scenario) => (
            <li
              key={scenario.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{scenario.name}</h2>
                  <p className="text-sm text-[var(--muted)]">
                    Created {new Date(scenario.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  href={`/scenario/${scenario.id}`}
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  View
                </Link>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-[var(--muted)]">Salary</dt>
                  <dd className="font-medium">{formatSalary(scenario)}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Bonus</dt>
                  <dd className="font-medium">{formatCurrency(scenario.bonus)}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Living cost</dt>
                  <dd className="font-medium">{formatCurrency(scenario.living_cost)}/mo</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Rent</dt>
                  <dd className="font-medium">{formatCurrency(scenario.rent_cost)}/mo</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
