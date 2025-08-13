import LocationCard from '@/components/booking/LocationCard';
import { useLocationQuery } from '@/hooks/useLocationQuery';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { LABELS } from '../../labels';

export default function ChooseRoom() {
  const { locations, isLoading, isError } = useLocationQuery();
  const { goToDeskSelection } = useBookingFlow();
  const handleReserve = (locationId: number) => {
    const location = locations.find((loc) => loc.id === locationId);

    if (location) {
      goToDeskSelection(location.name);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative pt-20 pb-20 overflow-hidden"
        style={{ backgroundColor: '#E4EDEC80' }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8 text-sm text-gray-500">
              <span>{LABELS.BOOKING.CHOOSE_ROOM.BREADCRUMB_HOME}</span>
              <svg
                className="w-4 h-4 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span>{LABELS.BOOKING.CHOOSE_ROOM.BREADCRUMB_BOOKING}</span>
              <svg
                className="w-4 h-4 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-gray-900 font-medium">
                {LABELS.BOOKING.CHOOSE_ROOM.BREADCRUMB_CHOOSE_LOCATION}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight">
              {LABELS.BOOKING.CHOOSE_ROOM.PAGE_TITLE}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {LABELS.BOOKING.CHOOSE_ROOM.HERO_DESCRIPTION}
            </p>

            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900">
                  {LABELS.BOOKING.CHOOSE_ROOM.STATS_LOCATIONS}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  {LABELS.BOOKING.CHOOSE_ROOM.STATS_LOCATIONS_LABEL}
                </div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900">
                  {LABELS.BOOKING.CHOOSE_ROOM.STATS_SQFT}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  {LABELS.BOOKING.CHOOSE_ROOM.STATS_SQFT_LABEL}
                </div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900">
                  {LABELS.BOOKING.CHOOSE_ROOM.STATS_ACCESS}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  {LABELS.BOOKING.CHOOSE_ROOM.STATS_ACCESS_LABEL}
                </div>
              </div>
            </div>

            <div className="w-16 h-1 bg-gray-900 mx-auto rounded-full opacity-20"></div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {LABELS.BOOKING.CHOOSE_ROOM.STEP_INDICATOR}
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-wide">
              {LABELS.BOOKING.CHOOSE_ROOM.SECTION_TITLE}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {LABELS.BOOKING.CHOOSE_ROOM.SECTION_DESCRIPTION}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {isLoading ? (
              <div>loading offices...</div>
            ) : isError ? (
              <div>Issue loading offices, please try again later.</div>
            ) : (
              locations.map((location, index) => (
                <div
                  key={location.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <LocationCard location={location} onReserve={handleReserve} />
                </div>
              ))
            )}
          </div>

          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                {LABELS.BOOKING.CHOOSE_ROOM.HELP_SECTION_TITLE}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {LABELS.BOOKING.CHOOSE_ROOM.HELP_SECTION_DESCRIPTION}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium">
                  {LABELS.BOOKING.CHOOSE_ROOM.SCHEDULE_TOUR_BUTTON}
                </button>
                <button className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors font-medium">
                  {LABELS.BOOKING.CHOOSE_ROOM.CONTACT_US_BUTTON}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
