import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { I18nProvider } from "@/lib/i18n/I18nContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SaaS Campaign Manager",
  description: "B2B Multi-channel Messaging System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        style={{ background: '#f8fafc' }} // Pale Slate background
      >
        <StyledComponentsRegistry>
          <I18nProvider>
            {children}
          </I18nProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
