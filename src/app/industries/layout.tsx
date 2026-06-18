import React from 'react';
import type { Metadata } from 'next';
import DetailLayout from '@/components/layout/DetailLayout';

export const metadata: Metadata = {
  title: 'Industries | THAZIO LABS',
  description: 'Intelligent solutions across education, government, enterprise, retail, manufacturing, finance, media, research, and community organizations.',
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <DetailLayout>{children}</DetailLayout>;
}
