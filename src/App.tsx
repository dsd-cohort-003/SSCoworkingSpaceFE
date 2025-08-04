import MaintenanceTicketing from './page/MaintenanceSubmit.tsx';
import { Routes, Route } from 'react-router';
import BookingLayout from './routes/booking/BookingLayout.tsx';
import ChooseRoom from './routes/booking/ChooseRoom.tsx';
import ChooseDesk from './routes/booking/ChooseDesk.tsx';
import ChooseResources from './routes/booking/ChooseResources.tsx';
import BookingConfirmation from './routes/booking/BookingConfirmation.tsx';
import Landing from './routes/Landing.tsx';
import Resources from './routes/Resources.tsx';
import MainLayout from './layout/MainLayout.tsx';
import BillingPage from './page/BillingPage.tsx';
import PaymentConfirmation from './page/PaymentConfirmation.tsx';
import { AuthProvider } from './contexts/AuthContext';
import MaintenanceDashboard from './page/MaintenanceDashboard.tsx';
import MaintenanceEdit from './page/MaintenanceEdit.tsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="booking" element={<BookingLayout />}>
            <Route path="rooms" element={<ChooseRoom />} />
            <Route path="desks" element={<ChooseDesk />} />
            <Route path="resources" element={<ChooseResources />} />
            <Route path="confirmation" element={<BookingConfirmation />} />
          </Route>
          <Route path="maintenance" element={<MaintenanceTicketing />} />
          <Route path="/maintenance/edit/:id" element={<MaintenanceEdit />} />
          <Route
            path="/maintenance/dashboard"
            element={<MaintenanceDashboard />}
          />
          <Route path="resources" element={<Resources />} />
          <Route path="billing" element={<BillingPage />} />
          <Route
            path="payment-confirmation"
            element={<PaymentConfirmation />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
