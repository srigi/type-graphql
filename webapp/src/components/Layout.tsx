import type { ComponentChildren } from 'preact';

import { Navbar } from '~/components/Navbar';
import { AuthProvider } from '~/contexts/AuthContext';
import { Footer } from '~/components/Footer';

export function Layout({ children }: { children: ComponentChildren }) {
  return (
    <AuthProvider>
      <>
        <Navbar />
        <main className="container flex flex-1 flex-col gap-4 pb-8">{children}</main>
        <Footer />
      </>
    </AuthProvider>
  );
}
