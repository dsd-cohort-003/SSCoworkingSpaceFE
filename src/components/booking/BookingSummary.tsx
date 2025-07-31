import Button from '../global/Button';
import { LABELS } from '../../labels';

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

  return (
    <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">
          {LABELS.COMPONENTS.BOOKING_SUMMARY.TITLE}
        </h3>
        <div className="space-y-2 text-gray-600">
          <p>
            {LABELS.COMPONENTS.BOOKING_SUMMARY.LOCATION_PREFIX} {location}
          </p>
          {fromDate && (
            <p>
              {LABELS.COMPONENTS.BOOKING_SUMMARY.FROM_DATE_PREFIX}{' '}
              {new Date(fromDate).toLocaleDateString()}
            </p>
          )}
          {toDate && (
            <p>
              {LABELS.COMPONENTS.BOOKING_SUMMARY.TO_DATE_PREFIX}{' '}
              {new Date(toDate).toLocaleDateString()}
            </p>
          )}
          {duration > 0 && (
            <p>
              {LABELS.COMPONENTS.BOOKING_SUMMARY.DURATION_PREFIX} {duration}{' '}
              {LABELS.COMPONENTS.BOOKING_SUMMARY.DAYS_SUFFIX}
            </p>
          )}
        </div>
      </div>

      <Button
        text={LABELS.COMPONENTS.BOOKING_SUMMARY.CONFIRM_BUTTON}
        onClick={onConfirm}
        disabled={disabled || !fromDate || !toDate}
        color="indigo"
      />
    </div>
  );
}
