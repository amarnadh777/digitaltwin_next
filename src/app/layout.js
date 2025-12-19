import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar"; 
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "SYSTEM_NEXUS",
  description: "Advanced Dashboard OS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 1. Added overflow-x-hidden to body to catch any leaks */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}>
        
        {/* 2. Ensured the flex container is exactly screen width */}
        <div className="flex h-screen w-full max-w-full overflow-hidden">
          
          {/* PERSISTENT LEFT SIDEBAR */}
          <Sidebar />

          {/* MAIN PAGE CONTENT */}
          {/* 3. Added min-w-0 to allow the container to shrink/stay inside flex bounds */}
          <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-[#050505] min-w-0">
             {children}
          </main>

        </div>
      </body>
    </html>
  );
}