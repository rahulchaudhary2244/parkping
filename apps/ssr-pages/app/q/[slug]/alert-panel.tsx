"use client";

import { useState, useTransition } from "react";
import type { AlertType } from "@parkping/domain";
import { AlertActionGrid, Card, CardContent } from "@parkping/ui-components";

type AlertPanelProps = {
  disabled?: boolean;
  slug: string;
};

export function AlertPanel({ disabled = false, slug }: AlertPanelProps) {
  const [message, setMessage] = useState<string | null>(disabled ? "Owner has paused alerts for now." : null);
  const [isPending, startTransition] = useTransition();

  function sendAlert(type: AlertType) {
    startTransition(async () => {
      setMessage(null);
      const response = await fetch("/api/alerts", {
        body: JSON.stringify({ slug, type }),
        headers: {
          "content-type": "application/json"
        },
        method: "POST"
      });
      const payload = (await response.json()) as { message?: string; reason?: string };

      setMessage(payload.message ?? `Could not send alert: ${payload.reason ?? "unknown error"}`);
    });
  }

  return (
    <div className="grid gap-3">
      <AlertActionGrid disabled={disabled} isPending={isPending} onSelect={sendAlert} />
      {message ? (
        <Card>
          <CardContent className="p-4 text-sm text-muted-foreground">{message}</CardContent>
        </Card>
      ) : null}
    </div>
  );
}
