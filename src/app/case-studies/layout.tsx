import React from 'react';
import type { Metadata } from 'next';
import DetailLayout from '@/components/layout/DetailLayout';

export const metadata: Metadata = {
  title: 'Case Studies | THAZIO LABS',
  description: 'Real-world projects and solutions built by Thazio Labs — SeatSync, NeuroLens, VideoTrans, and more.',
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <DetailLayout>{children}</DetailLayout>;
}
