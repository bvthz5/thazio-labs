'use client';

import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';

interface DetailLayoutProps {
  children: React.ReactNode;
}

export default function DetailLayout({ children }: DetailLayoutProps) {
  return (
    <>
      <Navbar active={true} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
