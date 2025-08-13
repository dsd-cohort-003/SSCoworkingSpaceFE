import MaintenanceTicketing from './page/MaintenanceSubmit.tsx';
import { Routes, Route } from 'react-router';
import BookingLayout from './routes/booking/BookingLayout.tsx';
import ChooseRoom from './routes/booking/ChooseRoom.tsx';
import ChooseDesk from './routes/booking/ChooseDesk.tsx';
import ChooseResources from './routes/booking/ChooseResources.tsx';
import BookingConfirmation from './routes/booking/BookingConfirmation.tsx';
import Landing from './routes/Landing.tsx';
import MainLayout from './layout/MainLayout.tsx';
import BillingPage from './page/BillingPage.tsx';
import PaymentConfirmation from './page/PaymentConfirmation.tsx';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MaintenanceDashboard from './page/MaintenanceDashboard.tsx';
import MaintenanceEdit from './page/MaintenanceEdit.tsx';
import Thanks from './routes/booking/Thanks.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { fetchUserByAuthId } from './services/userService.tsx';
import { useEffect, useState } from 'react';
import ConfirmBooking from './routes/booking/ConfirmBooking.tsx';
import ReservationPage from './page/reservationPage.tsx';

import { store } from './store/store.ts';
import { Provider } from 'react-redux';
function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!user?.id) return;
      try {
        const data = await fetchUserByAuthId(user.id);
        setRole(data?.role || null);
      } catch (error) {
        console.error('Failed to fetch user role', error);
        setRole(null);
      }
    };
    loadUser();
  }, [user]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="booking" element={<BookingLayout />}>
          <Route path="rooms" element={<ChooseRoom />} />
          <Route path="office/:officeId/desks" element={<ChooseDesk />} />
          <Route path="desks" element={<ChooseDesk />} />
          <Route path="resources" element={<ChooseResources />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="confirmation" element={<BookingConfirmation />} />
          <Route path="confirm-reservation" element={<ConfirmBooking />} />
          <Route path="thanks" element={<Thanks />} />
        </Route>
        <Route path="maintenance" element={<MaintenanceTicketing />} />
        <Route path="/maintenance/edit/:id" element={<MaintenanceEdit />} />
        <Route path="reservations" element={<ReservationPage />} />
        <Route
          path="/maintenance/dashboard"
          element={
            <ProtectedRoute
              condition={role == 'admin'}
              redirectTo={'/maintenance'}
            >
              <MaintenanceDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="payment-confirmation" element={<PaymentConfirmation />} />
      </Route>
    </Routes>
  );
}

export default App;
