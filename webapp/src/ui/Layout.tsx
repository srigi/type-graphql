import { Outlet } from 'react-router-dom';

import { Navbar } from './Navbar';

export function Layout() {
  return (
    <>
      <Navbar />
      <main className="container flex flex-1 flex-col gap-4">
        <Outlet />
      </main>
      <footer className="min-h-40"></footer>
    </>
  );
}
