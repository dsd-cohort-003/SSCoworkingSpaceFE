import { useNavigate, useLocation } from 'react-router-dom';

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface BookingData {
  location: string;
  fromDate: string;
  toDate: string;
  resources?: CartItem[];
}

export interface BookingDetails {
  location: string;
  fromDate: string;
  toDate: string;
  resources?: CartItem[];
  confirmationNumber: string;
  reservationStatus: string;
}

export interface LocationState {
  location: string;
}

export const useBookingFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentLocationState = (): LocationState | null => {
    return (location.state as LocationState) || null;
  };

  const goToRoomSelection = () => {
    navigate('/booking/rooms');
  };

  const goToDeskSelection = (locationName: string) => {
    navigate('/booking/desks', {
      state: { location: locationName },
    });
  };

  const goToConfirmReservation = (bookingData: BookingData) => {
    navigate('/booking/confirm-reservation', {
      state: bookingData,
    });
  };

  const goToConfirmation = (bookingDetails: BookingDetails) => {
    navigate('/booking/confirmation', {
      state: bookingDetails,
    });
  };

  const goToHomepage = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    getCurrentLocationState,
    goToRoomSelection,
    goToDeskSelection,
    goToConfirmReservation,
    goToConfirmation,
    goToHomepage,
    goBack,
  };
};
