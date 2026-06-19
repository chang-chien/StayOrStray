"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import type { SalaryMode } from "@/types/scenario";

interface Country {
  id: string;
  name: string;
  currency_code: string;
}

export default function NewScenarioPage() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [salaryMode, setSalaryMode] = useState<SalaryMode>("annual");

  useEffect(() => {
    async function loadCountries() {
      try {
        const response = await fetch("/api/countries");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error ?? "Failed to load countries");
        }
        setCountries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load countries");
      } finally {
        setLoadingCountries(false);
      }
    }

    loadCountries();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      country_id: form.get("country_id"),
      salary_mode: salaryMode,
      annual_salary: salaryMode === "annual" ? form.get("annual_salary") : null,
      monthly_salary: salaryMode === "monthly" ? form.get("monthly_salary") : null,
      bonus: form.get("bonus") || 0,
      raise_rate: form.get("raise_rate") || 0,
      pension_rate: form.get("pension_rate") || 0,
      living_cost: form.get("living_cost"),
      rent_cost: form.get("rent_cost"),
    };

    try {
      const response = await fetch("/api/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        const message = Array.isArray(data.error) ? data.error.join(", ") : data.error;
        throw new Error(message ?? "Failed to create scenario");
      }

      router.push("/scenarios");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create scenario");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Scenario</h1>
        <p className="text-sm text-[var(--muted)]">
          Define salary, costs, and assumptions for a life path comparison.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1 sm:col-span-2">
            <span className="text-sm font-medium">Scenario name</span>
            <input
              name="name"
              required
              placeholder="e.g. Stay in UK - London"
              className="w-full rounded-md border border-[var(--border)] px-3 py-2"
            />
          </label>

          <label className="block space-y-1 sm:col-span-2">
            <span className="text-sm font-medium">Country</span>
            <select
              name="country_id"
              required
              disabled={loadingCountries}
              className="w-full rounded-md border border-[var(--border)] px-3 py-2"
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name} ({country.currency_code})
                </option>
              ))}
            </select>
          </label>

          <fieldset className="space-y-2 sm:col-span-2">
            <legend className="text-sm font-medium">Salary mode</legend>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="salary_mode_radio"
                  checked={salaryMode === "annual"}
                  onChange={() => setSalaryMode("annual")}
                />
                Annual salary
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="salary_mode_radio"
                  checked={salaryMode === "monthly"}
                  onChange={() => setSalaryMode("monthly")}
                />
                Monthly salary
              </label>
            </div>
          </fieldset>

          {salaryMode === "annual" ? (
            <label className="block space-y-1">
              <span className="text-sm font-medium">Annual salary</span>
              <input
                name="annual_salary"
                type="number"
                min="0"
                step="0.01"
                required
                className="w-full rounded-md border border-[var(--border)] px-3 py-2"
              />
            </label>
          ) : (
            <label className="block space-y-1">
              <span className="text-sm font-medium">Monthly salary</span>
              <input
                name="monthly_salary"
                type="number"
                min="0"
                step="0.01"
                required
                className="w-full rounded-md border border-[var(--border)] px-3 py-2"
              />
            </label>
          )}

          <label className="block space-y-1">
            <span className="text-sm font-medium">Bonus (annual)</span>
            <input
              name="bonus"
              type="number"
              min="0"
              step="0.01"
              defaultValue="0"
              className="w-full rounded-md border border-[var(--border)] px-3 py-2"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Raise rate (%)</span>
            <input
              name="raise_rate"
              type="number"
              min="0"
              step="0.01"
              defaultValue="0"
              className="w-full rounded-md border border-[var(--border)] px-3 py-2"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Pension rate (%)</span>
            <input
              name="pension_rate"
              type="number"
              min="0"
              step="0.01"
              defaultValue="0"
              className="w-full rounded-md border border-[var(--border)] px-3 py-2"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Living cost (monthly)</span>
            <input
              name="living_cost"
              type="number"
              min="0"
              step="0.01"
              required
              className="w-full rounded-md border border-[var(--border)] px-3 py-2"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Rent cost (monthly)</span>
            <input
              name="rent_cost"
              type="number"
              min="0"
              step="0.01"
              required
              className="w-full rounded-md border border-[var(--border)] px-3 py-2"
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting || loadingCountries}
            className="rounded-md bg-[var(--primary)] px-4 py-2 text-white hover:bg-[var(--primary-hover)] disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create Scenario"}
          </button>
          <a
            href="/scenarios"
            className="rounded-md border border-[var(--border)] px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
