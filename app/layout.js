import Link from "next/link";
import "./globals.css";
import Header from "@/components/header";

export const metadata = {
  title: { default: "Lab React + Next.js + MDX", template: "%s | Lab MDX" },
  description: "Laboratório de React, Next.js e MDX com o contrato de conteúdo do Webtech Editor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
