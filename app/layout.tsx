import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";
import { AppFooter } from "./widgets/AppFooter";
import { AppHeader } from "./widgets/AppHeader";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bunyod Optom distribyutorlik firmasi",
  description:
    "Bunyod Optom - Eng yaxshi narxlar, keng assortiment, tez yetkazib berish",
  icons: { icon: "/favicon.svg" },
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
      <ReduxProvider>
        <body className={`${nunito.variable} `}>
          <AppHeader />
          <main className="w-full h-full flex flex-col flex-auto mt-18">{children}</main>
          <AppFooter />
        </body>
      </ReduxProvider>
    </html>
  );
}
