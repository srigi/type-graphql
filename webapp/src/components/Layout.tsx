import type { ComponentChildren } from 'preact';

import { Navbar } from '~/components/Navbar';
import { AuthProvider } from '~/contexts/AuthContext';

export function Layout({ children }: { children: ComponentChildren }) {
  return (
    <AuthProvider>
      <>
        <Navbar />
        <main className="container flex flex-1 flex-col gap-4">{children}</main>
        <footer className="min-h-40" />
      </>
    </AuthProvider>
  );
}
