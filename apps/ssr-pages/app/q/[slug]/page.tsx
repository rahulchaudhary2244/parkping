import { getQrLandingState } from "@parkping/domain";
import {
  Badge,
  BrandShell,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  VehicleScanCard
} from "@parkping/ui-components";
import { ShieldCheck } from "lucide-react";

import { AlertPanel } from "./alert-panel";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const state = getQrLandingState(slug);

  return (
    <BrandShell eyebrow="ParkPing Scan">
      <section className="mx-auto grid w-full max-w-xl flex-1 content-center gap-4 py-8">
        {state.kind === "active" ? (
          <>
            <div className="space-y-2 text-center">
              <Badge className="mx-auto" variant="secondary">
                <ShieldCheck className="mr-1 size-3" aria-hidden="true" />
                Private contact
              </Badge>
              <h1 className="text-3xl font-semibold tracking-normal">Need to reach this vehicle owner?</h1>
              <p className="text-sm leading-6 text-muted-foreground">
                Send one anonymous alert. Phone numbers stay hidden on both sides.
              </p>
            </div>
            <VehicleScanCard vehicle={state.vehicle} />
            <AlertPanel disabled={state.vehicle.alertsPaused} slug={state.sticker.slug} />
          </>
        ) : (
          <UnavailableState kind={state.kind} slug={slug} />
        )}
      </section>
    </BrandShell>
  );
}

function UnavailableState({ kind, slug }: { kind: "missing" | "suspended" | "unlinked"; slug: string }) {
  const copy = {
    missing: {
      title: "QR not found",
      description: "This sticker slug does not exist yet."
    },
    suspended: {
      title: "QR suspended",
      description: "This sticker is temporarily unavailable."
    },
    unlinked: {
      title: "QR not linked",
      description: "This sticker exists, but it is not linked to a vehicle right now."
    }
  }[kind];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="break-all rounded-md bg-muted p-3 font-mono text-sm text-muted-foreground">{slug}</p>
      </CardContent>
    </Card>
  );
}
