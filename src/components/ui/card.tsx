import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  header?: {
    title: string;
    subtitle?: string;
  };
}

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  header,
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover
    ? 'hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
    : '';

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm ${hoverClasses} ${className}`}
    >
      {header && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-light text-gray-900 tracking-wide">
            {header.title}
          </h3>
          {header.subtitle && (
            <p className="text-gray-600 mt-2">{header.subtitle}</p>
          )}
          <div className="w-12 h-0.5 bg-gray-900 mt-3 opacity-20"></div>
        </div>
      )}
      <div className={paddingClasses[padding]}>{children}</div>
    </div>
  );
}
