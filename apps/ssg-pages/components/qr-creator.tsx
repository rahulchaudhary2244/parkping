"use client";

import { useEffect, useMemo, useState } from "react";
import { buildScanUrl, createStickerSlug } from "@parkping/domain";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, QrStickerCard } from "@parkping/ui-components";
import { Download, RefreshCw } from "lucide-react";
import QRCode from "qrcode";

type FormState = {
  vehicleName: string;
  vehicleNumber: string;
  vehicleType: string;
};

const initialForm: FormState = {
  vehicleName: "My City Car",
  vehicleNumber: "MH 12 AB 1234",
  vehicleType: "car"
};

export function QrCreator() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [slug, setSlug] = useState("pp-demo01");
  const scanBaseUrl = process.env.NEXT_PUBLIC_SCAN_BASE_URL ?? "http://localhost:3001";
  const scanUrl = useMemo(() => buildScanUrl(scanBaseUrl, slug), [scanBaseUrl, slug]);

  useEffect(() => {
    let alive = true;

    QRCode.toDataURL(scanUrl, {
      color: {
        dark: "#111827",
        light: "#ffffff"
      },
      errorCorrectionLevel: "M",
      margin: 1,
      width: 512
    }).then((dataUrl) => {
      if (alive) {
        setQrImage(dataUrl);
      }
    });

    return () => {
      alive = false;
    };
  }, [scanUrl]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Vehicle basics</CardTitle>
          <CardDescription>Mock owner flow for the MVP sticker creation screen.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Vehicle nickname
            <Input value={form.vehicleName} onChange={(event) => updateField("vehicleName", event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Vehicle number
            <Input value={form.vehicleNumber} onChange={(event) => updateField("vehicleNumber", event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Vehicle type
            <Input value={form.vehicleType} onChange={(event) => updateField("vehicleType", event.target.value)} />
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" onClick={() => setSlug(createStickerSlug())} type="button" variant="secondary">
              <RefreshCw aria-hidden="true" />
              New slug
            </Button>
            <Button asChild className="w-full sm:w-auto" disabled={!qrImage}>
              <a download={`${slug}.png`} href={qrImage ?? "#"}>
                <Download aria-hidden="true" />
                Download PNG
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
      <QrStickerCard qrImage={qrImage} scanUrl={scanUrl} slug={slug} />
    </div>
  );
}
