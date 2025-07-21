import { Outlet } from 'react-router';
import Header from './Header.tsx';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
