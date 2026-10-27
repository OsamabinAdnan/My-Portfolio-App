'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickySocialSidebar } from '@/components/ui/StickySocialSidebar';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import ChatWidget from '@/components/ui/ChatWidget';

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <WhatsAppFloat />
      <ChatWidget />
      <Header />
      <StickySocialSidebar />
      {children}
      <Footer />
    </>
  );
}
