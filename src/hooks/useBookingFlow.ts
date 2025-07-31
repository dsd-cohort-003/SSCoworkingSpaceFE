import { useNavigate, useLocation } from 'react-router-dom';

export interface BookingData {
  location: string;
  fromDate: string;
  toDate: string;
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

  const goToConfirmation = (bookingData: BookingData) => {
    navigate('/booking/confirmation', {
      state: bookingData,
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
    goToConfirmation,
    goToHomepage,
    goBack,
  };
};
