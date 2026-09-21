import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import InteractiveBackground from "@/components/InteractiveBackground";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://datanavigate.co.uk";

export const viewport: Viewport = {
  themeColor: "#080b11",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DataNavigate Limited | Developer-Led ServiceNow & Tech Talent Navigation",
    template: "%s | DataNavigate Limited",
  },
  description:
    "Developer-led, outcome-driven recruitment for ServiceNow and elite IT professionals. Connecting world-class enterprises with Certified Master Architects, Senior Developers, and Platform Specialists.",
  keywords: [
    "ServiceNow recruitment",
    "ServiceNow staffing agency",
    "ServiceNow architect recruitment",
    "Certified Master Architect ServiceNow",
    "CMA ServiceNow",
    "ServiceNow Senior Developer jobs",
    "ServiceNow technical consultant",
    "ITOM SecOps recruitment UK",
    "ITSM recruitment London",
    "ServiceNow HRSD CSM GRC",
    "Developer led recruitment",
    "DataNavigate Limited",
    "Tech talent navigation UK",
    "ServiceNow staffing London",
  ],
  authors: [{ name: "DataNavigate Limited", url: siteUrl }],
  creator: "DataNavigate Limited",
  publisher: "DataNavigate Limited",
  applicationName: "DataNavigate",
  category: "Recruitment & Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DataNavigate Limited | Developer-Led ServiceNow & Tech Talent Navigation",
    description:
      "Beyond your algorithm. Developer-led, outcome-driven recruitment for ServiceNow and elite IT professionals worldwide.",
    url: siteUrl,
    siteName: "DataNavigate Limited",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DataNavigate Limited | Developer-Led ServiceNow & Tech Talent Navigation",
    description:
      "Beyond your algorithm. Developer-led recruitment for Certified Master Architects, Senior ServiceNow Developers, and elite IT leaders.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "DataNavigate Limited",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      email: "contact@datanavigate.co.uk",
      description:
        "Developer-led ServiceNow and enterprise IT talent recruitment, placing verified architects, developers, and platform specialists.",
      sameAs: ["https://www.linkedin.com/company/datanavigate"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "contact@datanavigate.co.uk",
          contactType: "customer service",
          areaServed: ["GB", "US", "EU", "AE"],
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          email: "careers@datanavigate.co.uk",
          contactType: "recruiting",
          areaServed: ["GB", "US", "EU", "AE"],
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@type": "EmploymentAgency",
      "@id": `${siteUrl}/#agency`,
      name: "DataNavigate Limited",
      url: siteUrl,
      image: `${siteUrl}/logo.png`,
      description:
        "Specialist developer-led recruitment agency for ServiceNow Certified Master Architects, Technical Architects, Senior Developers, ITOM, SecOps, and IT professionals.",
      email: "contact@datanavigate.co.uk",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
      },
      priceRange: "$$",
      knowsAbout: [
        "ServiceNow IT Service Management (ITSM)",
        "ServiceNow IT Operations Management (ITOM)",
        "ServiceNow Governance, Risk & Compliance (GRC)",
        "ServiceNow HR Service Delivery (HRSD)",
        "ServiceNow Customer Service Management (CSM)",
        "ServiceNow App Engine",
        "ServiceNow IT Asset Management (ITAM)",
        "ServiceNow Configuration Management Database (CMDB)",
        "ServiceNow Common Service Data Model (CSDM 4.0)",
        "ServiceNow Security Operations (SecOps)",
        "ServiceNow Certified Master Architect (CMA)",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "DataNavigate Limited",
      description: "Developer-Led ServiceNow & Tech Talent Navigation",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <InteractiveBackground />
        {children}
      </body>
    </html>
  );
}
