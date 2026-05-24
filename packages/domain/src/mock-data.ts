import type { QrLandingState, QrSticker } from "./qr";
import type { Vehicle } from "./vehicles";

export const mockVehicles: Vehicle[] = [
  {
    id: "veh_001",
    ownerId: "usr_001",
    name: "Rahul's City Car",
    type: "car",
    number: "MH 12 AB 1234",
    alertsPaused: false
  },
  {
    id: "veh_002",
    ownerId: "usr_002",
    name: "Basement Scooter",
    type: "scooter",
    number: "KA 05 ZX 8821",
    alertsPaused: true
  }
];

export const mockStickers: QrSticker[] = [
  {
    id: "qr_001",
    slug: "pp-demo01",
    vehicleId: "veh_001",
    status: "active",
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z"
  },
  {
    id: "qr_002",
    slug: "pp-paused",
    vehicleId: "veh_002",
    status: "active",
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z"
  },
  {
    id: "qr_003",
    slug: "pp-free01",
    vehicleId: null,
    status: "unlinked",
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z"
  }
];

export function getQrLandingState(slug: string): QrLandingState {
  const sticker = mockStickers.find((item) => item.slug === slug);

  if (!sticker) {
    return { kind: "missing", slug };
  }

  if (sticker.status === "suspended") {
    return { kind: "suspended", sticker };
  }

  if (!sticker.vehicleId || sticker.status === "unlinked") {
    return { kind: "unlinked", sticker };
  }

  const vehicle = mockVehicles.find((item) => item.id === sticker.vehicleId);

  if (!vehicle) {
    return { kind: "unlinked", sticker };
  }

  return { kind: "active", sticker, vehicle };
}
