import { QrCode } from "lucide-react";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type QrStickerCardProps = {
  scanUrl: string;
  slug: string;
  qrImage?: string | null;
};

export function QrStickerCard({ qrImage, scanUrl, slug }: QrStickerCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Sticker preview</CardTitle>
            <CardDescription>Use this QR on a vehicle sticker.</CardDescription>
          </div>
          <Badge variant="secondary">{slug}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 sm:grid-cols-[220px_1fr] sm:items-center">
          <div className="flex aspect-square w-full max-w-[220px] items-center justify-center rounded-lg border bg-white p-3 text-slate-950">
            {qrImage ? (
              <img alt={`QR code for ${slug}`} className="h-full w-full" src={qrImage} />
            ) : (
              <QrCode className="size-24" aria-hidden="true" />
            )}
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium">Scan URL</p>
              <p className="mt-1 break-all rounded-md bg-muted p-3 font-mono text-xs text-muted-foreground">
                {scanUrl}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              The QR slug stays attached to the sticker. Vehicle ownership can be changed later without reprinting.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
