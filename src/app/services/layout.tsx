import React from 'react';
import type { Metadata } from 'next';
import DetailLayout from '@/components/layout/DetailLayout';

export const metadata: Metadata = {
  title: 'Services | THAZIO LABS',
  description: 'Comprehensive technology services including software engineering, AI, data analytics, automation, cloud infrastructure, and research.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <DetailLayout>{children}</DetailLayout>;
}
