import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { FocusProvider } from "@/context/FocusContext"; // ✅ ADD THIS
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        {/* ✅ CONTEXT PROVIDER WRAPS THE APP */}
        <FocusProvider>
          <div className="flex h-screen w-full max-w-full overflow-hidden">
            
            {/* LEFT SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT */}
            <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-[#050505] min-w-0">
              {children}
            </main>

          </div>
        </FocusProvider>
      </body>
    </html>
  );
}
