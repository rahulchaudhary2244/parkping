import type { Vehicle } from "./vehicles";

export type StickerStatus = "unlinked" | "active" | "suspended";

export type QrSticker = {
  id: string;
  slug: string;
  vehicleId: string | null;
  status: StickerStatus;
  createdAt: string;
  updatedAt: string;
};

export type QrLandingState =
  | { kind: "active"; sticker: QrSticker; vehicle: Vehicle }
  | { kind: "unlinked"; sticker: QrSticker }
  | { kind: "suspended"; sticker: QrSticker }
  | { kind: "missing"; slug: string };

export function createStickerSlug(seed = cryptoSafeSeed()) {
  return `pp-${seed.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8)}`;
}

export function buildScanUrl(origin: string, slug: string) {
  return `${origin.replace(/\/$/, "")}/q/${encodeURIComponent(slug)}`;
}

function cryptoSafeSeed() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "");
  }

  return Math.random().toString(36).slice(2, 10);
}
