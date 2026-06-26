import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PolicyWise AI — Health Insurance Intelligence",
  description:
    "Understand your health insurance policy. Detect claim risks before hospitalization.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2E7D5B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
	 <div className="phone-wrapper">
    <div className="phone-frame">

      <div className="dynamic-island" />

      <div className="status-bar">
        <span>9:41</span>
        <span>📶 WiFi 🔋</span>
      </div>

      <div className="phone-screen">
{children}
 </div>
    </div>
  </div>
</body>
    </html>
  );
}
