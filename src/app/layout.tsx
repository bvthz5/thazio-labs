// Absolute top of module execution to patch and silence console warnings before any dependencies load
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (args[0] && typeof args[0] === 'string' && args[0].indexOf('THREE.Clock') !== -1) {
      return;
    }
    originalWarn(...args);
  };
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bvthz5.github.io'),
  title: {
    default: "THAZIO",
    template: "%s | THAZIO"
  },
  description:
    "THAZIO Labs is an AI-first engineering company building intelligent software, autonomous systems, and data-driven solutions for businesses, institutions, and governments worldwide.",
  applicationName: "THAZIO",
  authors: [{ name: "THAZIO", url: "https://bvthz5.github.io/thazio-labs" }],
  generator: "Next.js",
  keywords: [
    "THAZIO",
    "thazio labs",
    "AI-first engineering",
    "autonomous systems",
    "software engineering",
    "artificial intelligence",
    "data analytics",
    "automation solutions",
    "cloud infrastructure",
    "AI agents",
    "intelligent systems",
    "custom software development",
  ],
  creator: "THAZIO",
  publisher: "THAZIO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/logo_transparent.png`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/logo_transparent.png`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/logo_transparent.png`,
  },
  alternates: {
    canonical: '/thazio-labs',
  },
  openGraph: {
    title: "THAZIO LABS | AI-First Engineering & Autonomous Systems",
    description:
      "AI-first engineering company building intelligent software, autonomous systems, and data-driven solutions for businesses, institutions, and governments.",
    url: "https://bvthz5.github.io/thazio-labs",
    siteName: "THAZIO",
    images: [
      {
        url: "/thazio-labs/images/logo_transparent.png",
        width: 1200,
        height: 630,
        alt: "THAZIO Neural Intelligence Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THAZIO",
    description:
      "AI-first engineering company building intelligent software, autonomous systems, and data-driven solutions for businesses, institutions, and governments.",
    images: ["/thazio-labs/images/logo_transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
