import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

type THindSiliguri = Parameters<typeof Hind_Siliguri>[0];

const fontOptions: THindSiliguri = {
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
};

const hindSiliguri = Hind_Siliguri(fontOptions);

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মশলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সবনিম-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
