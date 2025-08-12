import { LABELS } from '../../labels';
import { useDispatch } from 'react-redux';
// import type { RootState } from '@/store/store';
import { setOfficeTotal } from '@/store/slices/officeSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

interface BookingSummaryProps {
  location: string;
  fromDate: string;
  toDate: string;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
}

export default function BookingSummary({
  location,
  fromDate,
  toDate,
  onConfirm,
  disabled = false,
  className = '',
}: BookingSummaryProps) {
  const getDurationInDays = () => {
    if (!fromDate || !toDate) return 0;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const duration = getDurationInDays();
  const dispatch = useDispatch();
  const officePrice = useSelector(
    (state: RootState) => state.officeReservation.resInfo.officeTotal,
  ).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  useEffect(() => {
    if (duration !== 0) {
      dispatch(setOfficeTotal({ duration }));
    }
  }, [duration, dispatch]);
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
        <h3 className="text-2xl font-light text-gray-900 tracking-wide">
          {LABELS.COMPONENTS.BOOKING_SUMMARY.TITLE}
        </h3>
        <div className="w-12 h-0.5 bg-gray-900 mt-3 opacity-20"></div>
      </div>

      <div className="p-8">
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Location</span>
            <span className="text-gray-900 font-medium">{location}</span>
          </div>

          {fromDate && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Check-in</span>
              <span className="text-gray-900 font-medium">
                {new Date(fromDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}

          {toDate && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Check-out</span>
              <span className="text-gray-900 font-medium">
                {new Date(toDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}

          {duration > 0 && (
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-500 font-medium">Duration</span>
              <span className="text-gray-900 font-medium">
                {duration} {duration === 1 ? 'day' : 'days'}
              </span>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500 text-sm uppercase tracking-wide font-medium">
                Total Investment
              </span>
              <p className="text-2xl font-light text-gray-900 mt-1">
                {duration !== 0 ? <span>{officePrice}</span> : '$0.00'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-green-600 text-sm font-medium">
                ✓ All Inclusive
              </div>
              <div className="text-gray-500 text-xs">No hidden fees</div>
            </div>
          </div>
        </div>

        <button
          onClick={onConfirm}
          disabled={disabled || !fromDate || !toDate}
          className={`w-full py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${
            disabled || !fromDate || !toDate
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl'
          }`}
        >
          <div className="flex items-center justify-center">
            <span className="mr-2">
              {LABELS.COMPONENTS.BOOKING_SUMMARY.CONFIRM_BUTTON}
            </span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
