import type { ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  pulse?: boolean;
  className?: string;
}

const variantStyles = {
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
  neutral: 'bg-white/95 text-gray-700 border-white/30',
};

const sizeStyles = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  pulse = false,
  className = '',
}: BadgeProps) {
  return (
    <div
      className={`
        inline-flex items-center rounded-full font-medium backdrop-blur-sm shadow-sm border
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      {icon && (
        <div className={`mr-2 ${pulse ? 'animate-pulse' : ''}`}>{icon}</div>
      )}
      {children}
    </div>
  );
}

export function AvailableBadge() {
  return (
    <Badge
      variant="success"
      icon={<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
    >
      Available Now
    </Badge>
  );
}

export function UnavailableBadge() {
  return <Badge variant="error">Unavailable</Badge>;
}

export function StepBadge({
  step,
  total,
  text,
}: {
  step: number;
  total: number;
  text: string;
}) {
  return (
    <Badge
      variant="neutral"
      size="md"
      icon={
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
    >
      Step {step} of {total}: {text}
    </Badge>
  );
}
