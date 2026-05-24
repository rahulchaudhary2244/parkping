import { BrandShell } from "@parkping/ui-components";

import { QrCreator } from "../components/qr-creator";

export default function Page() {
  return (
    <BrandShell eyebrow="ParkPing QR Studio">
      <section className="grid flex-1 gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-4">
          <div className="inline-flex rounded-md border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Static QR creator
          </div>
          <div className="space-y-3">
            <h1 className="max-w-xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Create a vehicle QR sticker without exposing phone numbers.
            </h1>
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              Generate a unique QR slug, preview the scan URL, and prepare a sticker that can later be linked or
              transferred between vehicles.
            </p>
          </div>
        </div>
        <QrCreator />
      </section>
    </BrandShell>
  );
}
