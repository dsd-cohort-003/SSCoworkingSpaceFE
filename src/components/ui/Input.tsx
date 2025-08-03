import type { ReactNode } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'search' | 'date' | 'number';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  icon,
  iconPosition = 'right',
  error,
  disabled = false,
  required = false,
  className = '',
}: InputProps) {
  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full p-3 border rounded-lg transition-all duration-300 bg-white
            ${iconPosition === 'left' && icon ? 'pl-10' : ''}
            ${iconPosition === 'right' && icon ? 'pr-10' : ''}
            ${
              hasError
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-200 focus:ring-gray-900 focus:border-gray-900 hover:border-gray-300'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
          `
            .trim()
            .replace(/\s+/g, ' ')}
        />

        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-red-500 mr-2"
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
            <span className="text-red-700 text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <Input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      icon={
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
      className={className}
    />
  );
}

export function DateInput({
  label,
  value,
  onChange,
  min,
  className,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-lg font-light text-gray-900 mb-3 tracking-wide">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 bg-white hover:border-gray-300 text-gray-900 font-medium"
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
  );
}
