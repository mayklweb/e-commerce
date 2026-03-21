import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./Providers";
import { AppHeader } from "./widgets/AppHeader";
import { AppFooter } from "./widgets/AppFooter";

const instrumentSans = Instrument_Sans({
  variable: "--font-Instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bunyod Optom distribyutorlik firmasi",
  description:
    "Bunyod Optom - Eng yaxshi narxlar, keng assortiment, tez yetkazib berish",
  icons: { icon: "/logo1.svg" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bunyod Optom",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} antialiased`}>
        <QueryProvider>
          <div className="w-full h-full flex flex-col">
            <AppHeader />
            <main className="w-full h-full flex flex-col flex-auto">
              <div className="w-full h-full">{children}</div>
            </main>
            <AppFooter />
          </div>
        </QueryProvider>
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
