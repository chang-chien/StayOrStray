import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Scenario Comparison</h1>
      <p className="text-[var(--muted)]">
        Compare life paths between staying in the UK and returning home. Create scenarios with
        salary, costs, and assumptions to explore your options.
      </p>
      <div className="flex gap-3">
        <Link
          href="/scenario/new"
          className="rounded-md bg-[var(--primary)] px-4 py-2 text-white hover:bg-[var(--primary-hover)]"
        >
          Create Scenario
        </Link>
        <Link
          href="/scenarios"
          className="rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-2 hover:bg-gray-50"
        >
          View Scenarios
        </Link>
      </div>
    </div>
  );
}
