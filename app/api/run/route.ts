import { NextRequest, NextResponse } from "next/server";

const BACKEND_RUN_URL =
  process.env.BACKEND_RUN_URL ?? "http://127.0.0.1:8000/run";

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  try {
    const backendResponse = await fetch(BACKEND_RUN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await backendResponse.text();

    return new NextResponse(text, {
      status: backendResponse.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Backend request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
