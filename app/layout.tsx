import type { Metadata } from "next";
import { JetBrains_Mono  } from "next/font/google";
import "./globals.css";
import {Provider} from "@/providers/provider";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ['400', '500', '700'], // regular, medium, bold strings
  subsets: ["latin"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "Frontend Mentor | FX Checker",
  description: "The app converts between currencies using live exchange rates, with a rate-history chart, " +
      "a multi-currency comparison, pinned favorite pairs, and a running log of conversions. You can use any tools you " +
      "like, so if there's something you've been wanting to practice, give it a go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dark"
      lang="en"
      className={`${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
