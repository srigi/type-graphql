import { Outlet } from 'react-router-dom';

import { Navbar } from './Navbar';

export function Layout() {
  return (
    <>
      <Navbar />
      <main className="container flex flex-col gap-4 mb-32">
        <Outlet />
      </main>
    </>
  );
}
