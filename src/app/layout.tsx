import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DataNavigate Limited | Developer-Led ServiceNow & Tech Talent Navigation",
  description:
    "Beyond your algorithm. Developer-led, outcome-driven recruitment for ServiceNow and elite IT professionals worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body>
        <div className="fluid-mint-background">
          <div className="mint-wave-blob"></div>
          <div className="mint-wave-inner"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
