import { ReactNode } from "react";

import { Command } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/config/app-config";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
        <div className="bg-primary relative order-2 hidden h-full rounded-3xl lg:flex">
          <div className="text-primary-foreground absolute top-10 space-y-1 px-10">
            <Command className="size-10" />
            <h1 className="text-2xl font-medium">{APP_CONFIG.name}</h1>
            <p className="text-sm">Build for developers, by developers....</p>
          </div>

          <div className="absolute bottom-10 flex w-full justify-between px-10">
            <div className="text-primary-foreground flex-1 space-y-1">
              <h2 className="font-medium">Click on the link below for User Login</h2>
                <p className="text-sm">
                <a
                  href="https://www.DevHubs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary-foreground/80"
                >
                  DevHubs.com
                </a>
                </p>
            </div>
            <Separator orientation="vertical" className="mx-3 !h-auto" />
            <div className="text-primary-foreground flex-1 space-y-1">
              <h2 className="font-medium">Need help?</h2>
                <p className="text-sm">
                Contact us at{" "}
                <a href="mailto:info@gleecus.com" className="underline hover:text-primary-foreground/80">
                  info@gleecus.com
                </a>.
                </p>
            </div>
          </div>
        </div>
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
