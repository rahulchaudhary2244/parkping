export type VehicleType = "car" | "bike" | "scooter" | "other";

export type Vehicle = {
  id: string;
  ownerId: string;
  name: string;
  type: VehicleType;
  number: string;
  alertsPaused: boolean;
};

export function maskVehicleNumber(vehicleNumber: string) {
  const compact = vehicleNumber.trim().replace(/\s+/g, " ").toUpperCase();
  const parts = compact.split(" ");

  if (parts.length >= 4) {
    return `${parts[0]} ${parts[1]} ** ${parts.slice(3).join(" ")}`;
  }

  if (compact.length <= 4) {
    return compact.replace(/[A-Z0-9]/g, "*");
  }

  return `${compact.slice(0, 2)} ${"*".repeat(Math.max(2, compact.length - 6))} ${compact.slice(-4)}`;
}

export function formatVehicleType(type: VehicleType) {
  const labels: Record<VehicleType, string> = {
    bike: "Bike",
    car: "Car",
    other: "Vehicle",
    scooter: "Scooter"
  };

  return labels[type];
}
