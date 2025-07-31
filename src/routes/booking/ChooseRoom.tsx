import PageTitle from '@/components/Text/PageTitle';
import LocationCard from '@/components/booking/LocationCard';
import { useLocationData } from '@/hooks/useLocationData';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { LABELS } from '../../labels';

export default function ChooseRoom() {
  const { locations } = useLocationData();
  const { goToDeskSelection } = useBookingFlow();

  const handleReserve = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId);
    if (location) {
      goToDeskSelection(location.name);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <PageTitle text={LABELS.BOOKING.CHOOSE_ROOM.PAGE_TITLE} />
      <h2 className="text-3xl font-bold mb-8">
        {LABELS.BOOKING.CHOOSE_ROOM.SECTION_TITLE}
      </h2>

      <div className="space-y-8">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onReserve={handleReserve}
          />
        ))}
      </div>
    </div>
  );
}
