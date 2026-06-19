import { NextResponse } from "next/server";
import { listCountries } from "@/lib/scenarios/repository";

export async function GET() {
  try {
    const countries = await listCountries();
    return NextResponse.json(countries);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list countries";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
