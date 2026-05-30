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
    default: "THAZIO | The Future Neural Intelligence Platform",
    template: "%s | THAZIO"
  },
  description:
    "THAZIO (sometimes searched as tazhio) is a next-generation Artificial Intelligence, Brain-Computer Interface, Neural Intelligence, Enterprise Automation, and Emerging Technology company engineering intelligent futures.",
  applicationName: "THAZIO",
  authors: [{ name: "THAZIO", url: "https://bvthz5.github.io/thazio-labs" }],
  generator: "Next.js",
  keywords: [
    "THAZIO",
    "tazhio",
    "thazio labs",
    "Artificial Intelligence",
    "Brain-Computer Interface",
    "Neural Intelligence",
    "Enterprise Automation",
    "Emerging Technology",
    "BCI",
    "Machine Learning",
    "Deep Learning",
    "AI Engineering",
  ],
  creator: "THAZIO",
  publisher: "THAZIO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/thazio-labs',
  },
  openGraph: {
    title: "THAZIO | The Future Neural Intelligence Platform",
    description:
      "THAZIO is a next-generation Artificial Intelligence and Brain-Computer Interface company. Engineering intelligent futures through AI and enterprise automation.",
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
    title: "THAZIO | The Future Neural Intelligence Platform",
    description:
      "THAZIO is a next-generation Artificial Intelligence and Brain-Computer Interface company. Engineering intelligent futures through AI and enterprise automation.",
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
  icons: {
    icon: '/thazio-labs/images/logo_transparent.png',
    shortcut: '/thazio-labs/images/logo_transparent.png',
    apple: '/thazio-labs/images/logo_transparent.png',
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
