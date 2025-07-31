
import PageTitle from '@/components/Text/PageTitle';
import DateRangePicker from '@/components/booking/DateRangePicker';
import BookingSummary from '@/components/booking/BookingSummary';
import { useBookingState } from '@/hooks/useBookingState';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { LABELS } from '../../labels';

function ChooseDesk() {
  const { getCurrentLocationState, goToConfirmation } = useBookingFlow();
  const {
    fromDate,
    toDate,
    selectedDate,
    setFromDate,
    setToDate,
    setSelectedDate,
    isValidBooking,
  } = useBookingState();

  const locationState = getCurrentLocationState();
  const officeName = locationState?.location || 'Office';

  const handleConfirmRequest = () => {
    if (isValidBooking) {
      goToConfirmation({ location: officeName, fromDate, toDate });
      console.log('selectedDate', selectedDate);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <PageTitle
        text={`${LABELS.BOOKING.CHOOSE_DESK.PAGE_TITLE} at ${officeName}`}
      />
      <h2 className="text-3xl font-bold mb-8">
        {LABELS.BOOKING.CHOOSE_DESK.SECTION_TITLE}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DateRangePicker
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
        />

        <BookingSummary
          location={officeName}
          fromDate={fromDate}
          toDate={toDate}
          onConfirm={handleConfirmRequest}
          disabled={!isValidBooking}
        />
      </div>

      <div className="mt-12 p-6 bg-purple-100 rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          {LABELS.BOOKING.CHOOSE_DESK.CALENDAR.MONTH_YEAR}
        </h3>
        <div className="grid grid-cols-7 gap-2 text-center">
          <div className="font-medium">
            {LABELS.BOOKING.CHOOSE_DESK.CALENDAR.DAYS.SUNDAY}
          </div>
          <div className="font-medium">
            {LABELS.BOOKING.CHOOSE_DESK.CALENDAR.DAYS.MONDAY}
          </div>
          <div className="font-medium">
            {LABELS.BOOKING.CHOOSE_DESK.CALENDAR.DAYS.TUESDAY}
          </div>
          <div className="font-medium">
            {LABELS.BOOKING.CHOOSE_DESK.CALENDAR.DAYS.WEDNESDAY}
          </div>
          <div className="font-medium">
            {LABELS.BOOKING.CHOOSE_DESK.CALENDAR.DAYS.THURSDAY}
          </div>
          <div className="font-medium">
            {LABELS.BOOKING.CHOOSE_DESK.CALENDAR.DAYS.FRIDAY}
          </div>
          <div className="font-medium">
            {LABELS.BOOKING.CHOOSE_DESK.CALENDAR.DAYS.SATURDAY}
          </div>

          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`p-2 rounded-full cursor-pointer hover:bg-purple-200 ${day === 26 ? 'bg-purple-500 text-white' : ''}`}
              onClick={() => setSelectedDate(`2022-10-${day}`)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default ChooseDesk;
