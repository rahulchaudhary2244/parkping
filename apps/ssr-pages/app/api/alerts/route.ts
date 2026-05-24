import { createAlertResponse, getQrLandingState, type AlertRequest } from "@parkping/domain";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json()) as AlertRequest;
  const state = getQrLandingState(payload.slug);

  if (state.kind !== "active") {
    return NextResponse.json({ reason: "unavailable" }, { status: 404 });
  }

  const result = createAlertResponse(payload, state.vehicle.alertsPaused);

  if (!result.ok) {
    return NextResponse.json(result, { status: result.reason === "paused" ? 423 : 400 });
  }

  return NextResponse.json(result);
}
