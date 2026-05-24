import type { Vehicle } from "@parkping/domain";
import { formatVehicleType, maskVehicleNumber } from "@parkping/domain";
import { CarFront, PauseCircle } from "lucide-react";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type VehicleScanCardProps = {
  vehicle: Vehicle;
};

export function VehicleScanCard({ vehicle }: VehicleScanCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CarFront className="size-5" aria-hidden="true" />
            </div>
            <div>
              <CardTitle>{vehicle.name}</CardTitle>
              <CardDescription>{formatVehicleType(vehicle.type)}</CardDescription>
            </div>
          </div>
          {vehicle.alertsPaused ? (
            <Badge variant="warning">
              <PauseCircle className="mr-1 size-3" aria-hidden="true" />
              Paused
            </Badge>
          ) : (
            <Badge variant="success">Active</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-xs font-medium uppercase text-muted-foreground">Masked plate</p>
          <p className="mt-2 font-mono text-2xl font-semibold tracking-normal">{maskVehicleNumber(vehicle.number)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
