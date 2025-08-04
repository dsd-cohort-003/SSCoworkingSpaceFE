import { LABELS } from '@/constants/labels';

interface PriceItem {
  label: string;
  amount: number;
  description?: string;
}

interface PriceBreakdownProps {
  items: PriceItem[];
  total: number;
  totalLabel?: string;
  className?: string;
  showBadge?: boolean;
  badgeText?: string;
}

export default function PriceBreakdown({
  items,
  total,
  totalLabel = LABELS.BOOKING.LABELS.TOTAL,
  className = '',
  showBadge = true,
  badgeText = 'All inclusive pricing',
}: PriceBreakdownProps) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200 ${className}`}
    >
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <span className="text-gray-600">{item.label}</span>
              {item.description && (
                <div className="text-sm text-gray-500">{item.description}</div>
              )}
            </div>
            <span className="text-gray-900 font-medium">
              ${item.amount.toFixed(2)}
            </span>
          </div>
        ))}

        {items.length > 1 && (
          <div className="border-t border-gray-300 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm uppercase tracking-wide font-medium">
                {totalLabel}
              </span>
              <p className="text-4xl font-light text-gray-900">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {items.length === 1 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm uppercase tracking-wide font-medium">
              {totalLabel}
            </span>
            <p className="text-4xl font-light text-gray-900">
              ${total.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {showBadge && (
        <div className="text-right mt-4">
          <div className="text-green-600 text-lg font-medium mb-1">
            ✓ {LABELS.STATUS.SUCCESS}
          </div>
          <div className="text-gray-500 text-sm">{badgeText}</div>
        </div>
      )}
    </div>
  );
}
