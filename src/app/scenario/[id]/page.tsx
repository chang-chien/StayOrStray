import Link from "next/link";
import { notFound } from "next/navigation";
import { getScenarioById } from "@/lib/scenarios/repository";
import type { Scenario } from "@/types/scenario";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { id: string };
};

function formatSalary(scenario: Scenario): string {
  if (scenario.salary_mode === "monthly" && scenario.monthly_salary != null) {
    return `${scenario.monthly_salary.toLocaleString()} / month`;
  }
  if (scenario.annual_salary != null) {
    return `${scenario.annual_salary.toLocaleString()} / year`;
  }
  return "—";
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[var(--border)] py-3 text-sm last:border-0">
      <dt className="text-[var(--muted)]">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

export default async function ScenarioDetailPage({ params }: PageProps) {
  const { id } = params;

  let scenario: Scenario | null = null;
  let error: string | null = null;

  try {
    scenario = await getScenarioById(id);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load scenario";
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!scenario) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{scenario.name}</h1>
          <p className="text-sm text-[var(--muted)]">
            Created {new Date(scenario.created_at).toLocaleString()}
          </p>
        </div>
        <Link href="/scenarios" className="text-sm text-[var(--primary)] hover:underline">
          Back to list
        </Link>
      </div>

      <section className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-2 text-lg font-semibold">Assumptions</h2>
        <dl>
          <DetailRow label="Salary mode" value={scenario.salary_mode} />
          <DetailRow label="Salary" value={formatSalary(scenario)} />
          <DetailRow label="Bonus (annual)" value={scenario.bonus.toLocaleString()} />
          <DetailRow label="Raise rate" value={`${scenario.raise_rate}%`} />
          <DetailRow label="Pension rate" value={`${scenario.pension_rate}%`} />
          <DetailRow label="Living cost (monthly)" value={scenario.living_cost.toLocaleString()} />
          <DetailRow label="Rent (monthly)" value={scenario.rent_cost.toLocaleString()} />
        </dl>
      </section>
    </div>
  );
}
