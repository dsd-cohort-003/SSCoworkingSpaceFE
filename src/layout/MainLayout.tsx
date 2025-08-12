import { Outlet } from 'react-router';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
