import { useState } from 'react';

export interface BookingState {
  fromDate: string;
  toDate: string;
  selectedDate: string;
}

export const useBookingState = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const isValidBooking =
    fromDate && toDate && new Date(fromDate) < new Date(toDate);
  const isValidDateRange = () => {
    if (!fromDate || !toDate) return false;
    return new Date(toDate) >= new Date(fromDate);
  };

  const getDurationInDays = () => {
    if (!fromDate || !toDate) return 0;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const resetBooking = () => {
    setFromDate('');
    setToDate('');
    setSelectedDate('');
  };

  const getBookingData = (): BookingState => ({
    fromDate,
    toDate,
    selectedDate,
  });

  return {
    fromDate,
    toDate,
    selectedDate,
    setFromDate,
    setToDate,
    setSelectedDate,
    isValidBooking,
    isValidDateRange,
    getDurationInDays,
    resetBooking,
    getBookingData,
  };
};
