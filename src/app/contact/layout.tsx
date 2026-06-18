import React from 'react';
import type { Metadata } from 'next';
import DetailLayout from '@/components/layout/DetailLayout';

export const metadata: Metadata = {
  title: "Let's Connect | THAZIO LABS",
  description: "Get in touch with Thazio Labs. Let's discuss your custom software engineering, AI adoption, or cloud infrastructure objectives.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <DetailLayout>{children}</DetailLayout>;
}
