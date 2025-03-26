import { Outlet } from 'react-router-dom';

import { Navbar } from '~/components/Navbar';
import { AuthProvider } from '~/contexts/AuthContext';

export function Layout() {
  return (
    <AuthProvider>
      <>
        <Navbar />
        <main className="container flex flex-1 flex-col gap-4">
          <Outlet />
        </main>
        <footer className="min-h-40"></footer>
      </>
    </AuthProvider>
  );
}
