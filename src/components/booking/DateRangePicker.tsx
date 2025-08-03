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
    <div className={`space-y-8 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group">
          <label className="block text-lg font-light text-gray-900 mb-3 tracking-wide">
            {LABELS.COMPONENTS.DATE_RANGE_PICKER.FROM_DATE_LABEL}
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 bg-white hover:border-gray-300 text-gray-900 font-medium"
              value={fromDate}
              onChange={(e) => onFromDateChange(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
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
            </div>
          </div>
        </div>

        <div className="group">
          <label className="block text-lg font-light text-gray-900 mb-3 tracking-wide">
            {LABELS.COMPONENTS.DATE_RANGE_PICKER.TO_DATE_LABEL}
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 bg-white hover:border-gray-300 text-gray-900 font-medium"
              value={toDate}
              onChange={(e) => onToDateChange(e.target.value)}
              min={fromDate}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
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
            </div>
          </div>
        </div>
      </div>

      {validationError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-700 text-sm font-medium">
              {validationError}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
