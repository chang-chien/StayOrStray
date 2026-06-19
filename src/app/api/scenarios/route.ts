import { NextResponse } from "next/server";
import { listScenarios } from "@/lib/scenarios/repository";

export async function GET() {
  try {
    const scenarios = await listScenarios();
    return NextResponse.json(scenarios);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list scenarios";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
