import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

const geistSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Simple task management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex items-center justify-center ${geistSans.variable} antialiased`}
      >
         <div className="w-3xl">
            <AppHeader/>
            {children}
         </div>
      </body>
    </html>
  );
}
