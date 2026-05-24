import type { ReactNode } from "react";
import { CarFront } from "lucide-react";

import { cn } from "../../lib/utils";

type BrandShellProps = {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
};

export function BrandShell({ children, className, eyebrow = "ParkPing" }: BrandShellProps) {
  return (
    <main className={cn("min-h-screen bg-background text-foreground", className)}>
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CarFront className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">{eyebrow}</p>
              <p className="mt-1 text-xs text-muted-foreground">Reach the owner, not their identity.</p>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </main>
  );
}
