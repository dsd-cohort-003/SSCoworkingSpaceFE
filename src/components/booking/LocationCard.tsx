import { LABELS } from '../../labels';
import type { LocationData } from '../../type/office';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOffice } from '@/store/slices/officeSlice';
interface LocationCardProps {
  location: LocationData;
  onReserve: (locationId: number) => void;
  className?: string;
}

export default function LocationCard({
  location,
  className = '',
}: LocationCardProps) {
  const {
    id,
    name,
    // description,
    size,
    streetAddress,
    city,
    state,
    zipCode,
    price,
  } = location;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationData =
    city === 'Dallas' ? LABELS.LOCATIONS.DALLAS : LABELS.LOCATIONS.FORT_WORTH;
  const workspaceImage =
    city === 'Dallas'
      ? LABELS.IMAGES.MAIN_WORKSPACE
      : LABELS.IMAGES.PRIVATE_OFFICE;
  const handleReserve = (id: number) => {
    dispatch(setOffice(location));
    navigate(`/booking/office/${id}/desks`);
  };
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group ${className}`}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={workspaceImage.SRC}
          alt={workspaceImage.ALT}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        <div className="floatingBadges absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-white/30 shadow-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            {LABELS.BADGES.AVAILABLE_NOW}
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-lg border border-white/30">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            {LABELS.COMPONENTS.LOCATION_CARD.PREMIUM_WORKSPACE_BADGE}
          </div>
        </div>
        <div className="titleOverlay absolute bottom-0 left-0 right-0 p-6">
          <div className="text-white">
            <h3 className="text-3xl font-light mb-2 tracking-wide">
              {name} {LABELS.LOCATIONS.WORKSPACE_SUFFIX}
            </h3>
            <p className="text-white/90 text-lg font-light">
              {workspaceImage.DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="locationHeader mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-light text-gray-900 tracking-wide">
              {location.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-1"
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
              {LABELS.COMPONENTS.LOCATION_CARD.DALLAS_FORT_WORTH_AREA}
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {`${streetAddress}, ${city}, ${state} ${zipCode}`}
          </p>
          <div className="w-12 h-0.5 bg-gray-900 mt-4 opacity-20"></div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-light text-gray-900 mb-1">{size}</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">
              {locationData.SIZE.split(' ').slice(1).join(' ')}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-light text-gray-900 mb-1">
              {locationData.RATE.split('/')[0]}
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">
              {LABELS.COMPONENTS.LOCATION_CARD.PER_MONTH_LABEL}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-light text-gray-900 mb-1">24/7</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">
              {LABELS.COMPONENTS.LOCATION_CARD.ACCESS_LABEL}
            </div>
          </div>
        </div>

        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500 text-sm uppercase tracking-wide font-medium">
                {LABELS.LOCATIONS.TOTAL_INVESTMENT_LABEL}
              </span>
              <p className="text-3xl font-light text-gray-900 mt-1">
                {price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-green-600 text-sm font-medium">
                ✓ {LABELS.COMPONENTS.LOCATION_CARD.ALL_INCLUSIVE_BADGE}
              </div>
              <div className="text-gray-500 text-xs">
                {LABELS.COMPONENTS.LOCATION_CARD.NO_HIDDEN_FEES}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-gray-900 font-medium mb-4 text-lg">
            {LABELS.LOCATIONS.AMENITIES_LABEL}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {locationData.FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center text-gray-600 text-sm py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleReserve(id)}
          className="w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium hover:shadow-xl transform hover:scale-[1.02] group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center">
            <span className="mr-2">{LABELS.LOCATIONS.RESERVE_BUTTON}</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
