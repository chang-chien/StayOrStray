import { NextResponse } from "next/server";
import { getScenarioById } from "@/lib/scenarios/repository";

type RouteContext = {
  params: { id: string };
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = context.params;
    const scenario = await getScenarioById(id);

    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }

    return NextResponse.json(scenario);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch scenario";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
