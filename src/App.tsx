import { Routes, Route } from 'react-router';
import BookingLayout from './routes/booking/BookingLayout.tsx';
import ChooseRoom from './routes/booking/ChooseRoom.tsx';
import ChooseDesk from './routes/booking/ChooseDesk.tsx';
import BookingConfirmation from './routes/booking/BookingConfirmation.tsx';
import Landing from './routes/Landing.tsx';
import Maintenance from './routes/Maintenance.tsx';
import Resources from './routes/Resources.tsx';
import MainLayout from './layout/MainLayout.tsx';
import LogIn from './routes/LogIn.tsx';
import BillingPage from './page/BillingPage.tsx';
import PaymentConfirmation from './page/PaymentConfirmation.tsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="Login" element={<LogIn />} />
        <Route path="booking" element={<BookingLayout />}>
          <Route path="rooms" element={<ChooseRoom />} />
          <Route path="desks" element={<ChooseDesk />} />
          <Route path="confirmation" element={<BookingConfirmation />} />
        </Route>
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="resources" element={<Resources />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="payment-confirmation" element={<PaymentConfirmation />} />
      </Route>
    </Routes>
  );
}

export default App;
