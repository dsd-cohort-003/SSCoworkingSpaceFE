import PageTitle from '@/components/Text/PageTitle';
import { Outlet } from 'react-router';

export default function BookingLayout() {
  return (
    <>
      <PageTitle text="Book Here" />
      <Outlet />
    </>
  );
}
