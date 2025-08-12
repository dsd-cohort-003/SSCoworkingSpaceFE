import { useNavigate } from 'react-router-dom';
import DateRangePicker from '@/components/booking/DateRangePicker';
import BookingSummary from '@/components/booking/BookingSummary';
import HeroSection from '@/components/ui/HeroSection';
import Card from '@/components/ui/card';
import { useBookingState } from '@/hooks/useBookingState';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { LABELS } from '@/constants/labels';
import { useEffect, useState } from 'react';

function ChooseDesk() {
  const navigate = useNavigate();
  const { getCurrentLocationState } = useBookingFlow();
  const {
    fromDate,
    toDate,
    selectedDate,
    setFromDate,
    setToDate,
    setSelectedDate,
    isValidBooking,
    resetBooking,
  } = useBookingState();
  const [dateDisplay, setDateDisplay] = useState(new Date());

  const locationState = getCurrentLocationState();
  const officeName = locationState?.location || 'Office';

  const handleConfirmRequest = () => {
    if (isValidBooking) {
      navigate('/booking/resources', {
        state: { location: officeName, fromDate, toDate },
      });
    }
  };

  useEffect(() => {
    resetBooking();
    setFromDate(fromDate);
    setToDate(toDate);
  }, [fromDate, toDate]);

  const getPreviousMonth = () => {
    const prevMonth = new Date(
      dateDisplay.getFullYear(),
      dateDisplay.getMonth() - 1,
      1,
    );
    setDateDisplay(prevMonth);
  };

  const getNextMonth = () => {
    const nextMonth = new Date(
      dateDisplay.getFullYear(),
      dateDisplay.getMonth() + 1,
      1,
    );
    setDateDisplay(nextMonth);
  };

  const today = new Date();
  const currentMonth = dateDisplay.toLocaleString('default', { month: 'long' });
  const currentYear = dateDisplay.getFullYear();
  const daysInMonth = new Date(
    currentYear,
    dateDisplay.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentYear,
    dateDisplay.getMonth(),
    1,
  ).getDay();

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title={LABELS.BOOKING.TITLES.SELECT_WORKSPACE}
        subtitle={LABELS.BOOKING.DESCRIPTIONS.SELECT_DATES}
        breadcrumbs={[
          { label: LABELS.NAVIGATION.HOME },
          { label: LABELS.NAVIGATION.BOOKING },
          { label: officeName },
          { label: LABELS.BOOKING.STEPS.CHOOSE_DESK, active: true },
        ]}
        stepIndicator={{
          icon: (
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          ),
          text: 'Step 2 of 3: Select Your Dates',
        }}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card
                header={{
                  title: LABELS.BOOKING.TITLES.SELECT_WORKSPACE,
                }}
                hover
                padding="lg"
              >
                <DateRangePicker
                  fromDate={fromDate}
                  toDate={toDate}
                  onFromDateChange={setFromDate}
                  onToDateChange={setToDate}
                  className="mb-12"
                />

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-light text-gray-900 tracking-wide">
                      {currentMonth} {currentYear}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 rounded-lg hover:bg-white transition-colors"
                        onClick={getPreviousMonth}
                      >
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-white transition-colors"
                        onClick={getNextMonth}
                      >
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center py-3 text-sm font-medium text-gray-500 uppercase tracking-wide"
                        >
                          {day}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: firstDayOfMonth }, (_, i) => (
                      <div key={`empty-${i}`} className="h-12"></div>
                    ))}

                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const dateString = `${currentYear}-${String(dateDisplay.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const isSelected = selectedDate === dateString;
                      const isToDate = toDate === dateString;
                      const isFromDate = fromDate === dateString;
                      const isBetween = fromDate
                        ? fromDate < dateString && toDate > dateString
                        : false;

                      const isToday =
                        dateString ===
                        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                      return (
                        <button
                          key={day}
                          className={`h-12 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                            isSelected || isToDate || isFromDate || isBetween
                              ? 'bg-gray-900 text-white shadow-lg'
                              : isToday
                                ? 'bg-white text-gray-900 border-2 border-gray-900 shadow-sm'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            setSelectedDate(dateString);
                            if (fromDate === '') {
                              setFromDate(dateString);
                            } else if (toDate === '') {
                              if (new Date(fromDate) > new Date(dateString)) {
                                setToDate(fromDate);
                                setFromDate(dateString);
                              } else {
                                setToDate(dateString);
                              }
                            } else {
                              resetBooking();
                              setFromDate(dateString);
                            }
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingSummary
                  location={officeName}
                  fromDate={fromDate}
                  toDate={toDate}
                  onConfirm={handleConfirmRequest}
                  disabled={!isValidBooking}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChooseDesk;
