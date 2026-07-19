import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
export const metadata: Metadata = {
  title: "My Society — Smart Society Management",
  description: "Billing, complaints, visitors and governance for residential communities.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&display=swap" rel="stylesheet" />
      </head>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
