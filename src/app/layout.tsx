import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import PremiumBackground from "@/components/animations/PremiumBackground";
import SiteChrome from "@/components/SiteChrome";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "NexGen IT Solutions | Premium Digital Agency",
  description: "Transform your business with cutting-edge web development, mobile apps, UI/UX design, and digital marketing solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <PremiumBackground />
        <SiteChrome>{children}</SiteChrome>
        <Toaster position="top-right" toastOptions={{
          style: { background: "#1E293B", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }
        }} />
      </body>
    </html>
  );
}