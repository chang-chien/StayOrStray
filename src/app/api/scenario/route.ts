import { NextResponse } from "next/server";
import { createScenario } from "@/lib/scenarios/repository";
import { validateCreateScenarioInput } from "@/lib/scenarios/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateCreateScenarioInput(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json({ error: validation.errors }, { status: 400 });
    }

    const scenario = await createScenario(validation.data);
    return NextResponse.json(scenario, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create scenario";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
