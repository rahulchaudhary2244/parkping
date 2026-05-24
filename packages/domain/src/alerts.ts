export type AlertType = "move_vehicle" | "headlights_on" | "emergency";

export type AlertRequest = {
  slug: string;
  type: AlertType;
  senderFingerprint?: string;
};

export type AlertResult =
  | { ok: true; message: string }
  | { ok: false; reason: "paused" | "rate_limited" | "unavailable" | "invalid" };

export const alertOptions: Array<{
  type: AlertType;
  title: string;
  description: string;
  tone: "default" | "warning" | "danger";
}> = [
  {
    type: "move_vehicle",
    title: "Move vehicle",
    description: "Vehicle is blocking access or parked in the way.",
    tone: "default"
  },
  {
    type: "headlights_on",
    title: "Headlights ON",
    description: "Lights appear to be left on.",
    tone: "warning"
  },
  {
    type: "emergency",
    title: "Emergency",
    description: "Needs urgent owner attention.",
    tone: "danger"
  }
];

export function canSendAlert(lastSentAt: Date | null, now = new Date()) {
  if (!lastSentAt) {
    return true;
  }

  return now.getTime() - lastSentAt.getTime() >= 5 * 60 * 1000;
}

export function createAlertResponse(request: AlertRequest, alertsPaused: boolean): AlertResult {
  if (!request.slug || !request.type) {
    return { ok: false, reason: "invalid" };
  }

  if (alertsPaused) {
    return { ok: false, reason: "paused" };
  }

  return {
    ok: true,
    message: "Alert queued. Owner notification will be delivered through web, push, then SMS/WhatsApp fallback."
  };
}
