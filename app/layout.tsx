import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vale da Cascata — Chalés na Serra",
  description: "Um vale particular no interior de Guatambu, com uma cascata de 100 metros de queda. Três chalés à beira do lago e da cachoeira, haras e restaurante próprio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
