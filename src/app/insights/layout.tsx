import React from 'react';
import type { Metadata } from 'next';
import DetailLayout from '@/components/layout/DetailLayout';

export const metadata: Metadata = {
  title: 'Insights | THAZIO LABS',
  description: 'Exploring technologies, ideas, and innovations shaping the future of autonomous systems and engineering.',
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <DetailLayout>{children}</DetailLayout>;
}
