import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sara Crochê — Miniaturas Exclusivas de Crochê",
  description: "Ateliê de miniaturas de crochê feitas à mão com amor. Peças exclusivas para presentear quem você ama.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sara Crochê",
  },
};

export const viewport: Viewport = {
  themeColor: "#D8A09B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="bg-brand-bg antialiased">
        {children}
      </body>
    </html>
  );
}