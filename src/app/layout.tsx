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
  title: "THAZIO — The Future Neural Intelligence Platform",
  description:
    "THAZIO is a next-generation Artificial Intelligence, Brain-Computer Interface, Neural Intelligence, Enterprise Automation, and Emerging Technology company engineering intelligent futures.",
  icons: {
    icon: '/images/logo_transparent.png',
  },
  keywords: [
    "Artificial Intelligence",
    "Brain-Computer Interface",
    "Neural Intelligence",
    "Enterprise Automation",
    "Emerging Technology",
    "BCI",
    "Machine Learning",
    "Deep Learning",
    "AI Engineering",
    "THAZIO",
  ],
  authors: [{ name: "THAZIO" }],
  openGraph: {
    title: "THAZIO — The Future Neural Intelligence Platform",
    description:
      "Engineering intelligent futures through AI, Brain-Computer Interfaces, and enterprise automation.",
    type: "website",
    locale: "en_US",
    siteName: "THAZIO",
  },
  twitter: {
    card: "summary_large_image",
    title: "THAZIO — The Future Neural Intelligence Platform",
    description:
      "Engineering intelligent futures through AI, Brain-Computer Interfaces, and enterprise automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
