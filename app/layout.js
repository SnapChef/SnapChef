import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

import { AuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SnapChef",
  description: "Your Culinary Connection to the World!",
  icons: {
    icon: ["/faviconPackage/favicon.ico?v=4"],
    apple: ["/faviconPackage/apple-touch-icon.png"],
    chrome: ["/faviconPackage/android-chrome-192x192.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="wrapper">
            <Navbar />
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
