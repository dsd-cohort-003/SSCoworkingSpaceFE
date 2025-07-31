import { LABELS } from '../../labels';

interface DateRangePickerProps {
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  className?: string;
  error?: string;
}

export default function DateRangePicker({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  className = '',
  error,
}: DateRangePickerProps) {
  const validateDateRange = () => {
    if (!fromDate || !toDate) return null;
    if (new Date(toDate) < new Date(fromDate)) {
      return LABELS.COMPONENTS.DATE_RANGE_PICKER.INVALID_RANGE_ERROR;
    }
    return null;
  };

  const validationError = error || validateDateRange();

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium mb-2">
            {LABELS.COMPONENTS.DATE_RANGE_PICKER.FROM_DATE_LABEL}
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={fromDate}
              onChange={(e) => onFromDateChange(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">
            {LABELS.COMPONENTS.DATE_RANGE_PICKER.TO_DATE_LABEL}
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={toDate}
              onChange={(e) => onToDateChange(e.target.value)}
              min={fromDate}
            />
          </div>
        </div>
      </div>

      {validationError && (
        <div className="text-red-600 text-sm mt-2">{validationError}</div>
      )}
    </div>
  );
}
