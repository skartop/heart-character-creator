import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heart Character Creator",
  description: "A guided character creation tool for Heart: The City Beneath."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
