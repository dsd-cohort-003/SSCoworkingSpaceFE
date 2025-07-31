import { Card } from '../ui/card';
import Button from '../global/Button';
import { LABELS } from '../../labels';

interface LocationData {
  id: string;
  name: string;
  size: string;
  rate: string;
  available: string | null;
}

interface LocationCardProps {
  location: LocationData;
  onReserve: (locationId: string) => void;
  className?: string;
}

export default function LocationCard({
  location,
  onReserve,
  className = '',
}: LocationCardProps) {
  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <div className="bg-gray-100 rounded-lg h-48 md:h-auto flex items-center justify-center">
          <span className="text-gray-500">
            {LABELS.COMPONENTS.LOCATION_CARD.FLOOR_PLAN_PLACEHOLDER}
          </span>
        </div>
        <div className="md:col-span-3 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">
                  {LABELS.COMPONENTS.LOCATION_CARD.SIZE_LABEL}
                </span>
                <p>{location.size}</p>
              </div>
              {location.available && (
                <div>
                  <span className="font-semibold">
                    {LABELS.COMPONENTS.LOCATION_CARD.AVAILABLE_LABEL}
                  </span>
                  <p>{location.available}</p>
                </div>
              )}
              <div>
                <span className="font-semibold">
                  {LABELS.COMPONENTS.LOCATION_CARD.RATE_LABEL}
                </span>
                <p>{location.rate}</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button
              text={LABELS.COMPONENTS.LOCATION_CARD.RESERVE_BUTTON}
              onClick={() => onReserve(location.id)}
              color="indigo"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
