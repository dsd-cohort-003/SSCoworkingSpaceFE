import { useMemo } from 'react';
import { LABELS } from '../labels';

export interface LocationData {
  id: string;
  name: string;
  size: string;
  rate: string;
  available: string | null;
}

export const useLocationData = () => {
  const locations = useMemo<LocationData[]>(
    () => [
      {
        id: 'dallas',
        name: LABELS.BOOKING.CHOOSE_ROOM.DALLAS.NAME,
        size: LABELS.BOOKING.CHOOSE_ROOM.DALLAS.SIZE,
        rate: LABELS.BOOKING.CHOOSE_ROOM.DALLAS.RATE,
        available: LABELS.BOOKING.CHOOSE_ROOM.AVAILABLE_NOW,
      },
      {
        id: 'fortworth',
        name: LABELS.BOOKING.CHOOSE_ROOM.FORT_WORTH.NAME,
        size: LABELS.BOOKING.CHOOSE_ROOM.FORT_WORTH.SIZE,
        rate: LABELS.BOOKING.CHOOSE_ROOM.FORT_WORTH.RATE,
        available: null,
      },
    ],
    [],
  );

  const getLocationById = (id: string): LocationData | undefined => {
    return locations.find((location) => location.id === id);
  };

  const getLocationByName = (name: string): LocationData | undefined => {
    return locations.find((location) => location.name === name);
  };

  const getAvailableLocations = (): LocationData[] => {
    return locations.filter((location) => location.available !== null);
  };

  return {
    locations,
    getLocationById,
    getLocationByName,
    getAvailableLocations,
  };
};
