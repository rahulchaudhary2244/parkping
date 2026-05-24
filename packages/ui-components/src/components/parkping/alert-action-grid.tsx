"use client";

import type { AlertType } from "@parkping/domain";
import { alertOptions } from "@parkping/domain";
import { AlertTriangle, CarFront, Lightbulb } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const icons: Record<AlertType, typeof CarFront> = {
  emergency: AlertTriangle,
  headlights_on: Lightbulb,
  move_vehicle: CarFront
};

type AlertActionGridProps = {
  disabled?: boolean;
  isPending?: boolean;
  onSelect: (type: AlertType) => void;
};

export function AlertActionGrid({ disabled = false, isPending = false, onSelect }: AlertActionGridProps) {
  return (
    <div className="grid gap-3">
      {alertOptions.map((option) => {
        const Icon = icons[option.type];
        const variant = option.tone === "danger" ? "destructive" : option.tone === "warning" ? "warning" : "default";

        return (
          <Card key={option.type} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-9 items-center justify-center rounded-md bg-muted">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-base">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <Button
                className="w-full"
                disabled={disabled || isPending}
                onClick={() => onSelect(option.type)}
                type="button"
                variant={variant}
              >
                {isPending ? `Sending ${option.title}` : `Send ${option.title} alert`}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
