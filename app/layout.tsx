"use client";

import { Providers } from "./providers";
import { Navigation, ClientErrorBoundary } from "./src/components";

import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Providers>
        <ClientErrorBoundary>
          <Navigation />
          <main style={{ padding: "24px" }}>{children}</main>
        </ClientErrorBoundary>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
