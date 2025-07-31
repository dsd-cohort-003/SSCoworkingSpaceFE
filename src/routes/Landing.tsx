import { useNavigate } from 'react-router';
import { LABELS } from '../labels';

export default function Landing() {
  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              {LABELS.HERO.HEADLINE}{' '}
              <span className="font-medium">{LABELS.BRAND.NAME}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {LABELS.HERO.DESCRIPTION}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/booking/rooms')}
                className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium"
              >
                {LABELS.HERO.CTA_PRIMARY}
              </button>
              <button
                onClick={() => navigate('/booking/rooms')}
                className="bg-[#E4EDEC80] text-gray-900 border border-gray-400 px-6 py-2 rounded-full hover:bg-[#E4EDEC] hover:scale-105 transition-all"
              >
                {LABELS.HERO.CTA_SECONDARY}
              </button>
              
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            <div className="lg:col-span-2">
              <div className="relative h-96 lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden group">
                <img
                  src={LABELS.IMAGES.
                  
                  _WORKSPACE.SRC}
                  alt={LABELS.IMAGES.MAIN_WORKSPACE.ALT}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/30" />
                <div className="absolute inset-0 bg-amber-50/20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-all duration-300" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-white/20">
                  {LABELS.BADGES.GALLERY_TOUR}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/60 to-transparent h-32" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-medium mb-1">
                    {LABELS.IMAGES.MAIN_WORKSPACE.TITLE}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {LABELS.IMAGES.MAIN_WORKSPACE.DESCRIPTION}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-96 lg:h-[500px] gap-6">
              <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden group">
                <img
                  src={LABELS.IMAGES.MEETING_ROOM.SRC}
                  alt={LABELS.IMAGES.MEETING_ROOM.ALT}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/30" />
                <div className="absolute inset-0 bg-blue-50/25 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/60 to-transparent h-20" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-lg font-medium mb-1">
                    {LABELS.IMAGES.MEETING_ROOM.TITLE}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {LABELS.IMAGES.MEETING_ROOM.DESCRIPTION}
                  </p>
                </div>
              </div>
              <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden group">
                <img
                  src={LABELS.IMAGES.PRIVATE_OFFICE.SRC}
                  alt={LABELS.IMAGES.PRIVATE_OFFICE.ALT}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/30" />
                <div className="absolute inset-0 bg-emerald-50/25 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-all duration-300" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm border border-white/20">
                  {LABELS.BADGES.LOCATION_PLANO}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/60 to-transparent h-20" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-lg font-medium mb-1">
                    {LABELS.IMAGES.PRIVATE_OFFICE.TITLE}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {LABELS.IMAGES.PRIVATE_OFFICE.DESCRIPTION}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section
        id="amenities"
        className="py-16"
        style={{ backgroundColor: '#E4EDEC80' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              {LABELS.WORKSPACE_OPTIONS.SECTION_TITLE}
            </h2>
            <div className="w-16 h-1 bg-gray-900 mx-auto rounded-full opacity-20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                ...LABELS.WORKSPACE_OPTIONS.HOT_DESK,
                active: false,
              },
              {
                ...LABELS.WORKSPACE_OPTIONS.DEDICATED_DESK,
                active: true,
              },
              {
                ...LABELS.WORKSPACE_OPTIONS.PRIVATE_OFFICE,
                active: false,
              },
            ].map((option, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg border-2 transition-all duration-300 ${
                  option.active
                    ? 'border-gray-900 bg-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      option.active
                        ? 'border-gray-900 bg-gray-900'
                        : 'border-gray-300'
                    }`}
                  />
                  <h3 className="text-xl font-medium text-gray-900">
                    {option.TITLE}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">{option.SUBTITLE}</p>
                <p className="text-gray-900 font-medium mb-4">{option.PRICE}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {option.DESCRIPTION}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              {LABELS.LOCATIONS.SECTION_TITLE}
            </h2>
            <p className="text-xl text-gray-600">
              {LABELS.LOCATIONS.SECTION_SUBTITLE}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                id: 'dallas',
                ...LABELS.LOCATIONS.DALLAS,
              },
              {
                id: 'fortworth',
                ...LABELS.LOCATIONS.FORT_WORTH,
              },
            ].map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="h-64 flex items-center justify-center relative"
                  style={{
                    background:
                      'linear-gradient(135deg, #f8f9fa 0%, #E4EDEC80 100%)',
                  }}
                >
                  <div className="text-gray-500 text-lg">
                    {location.NAME} {LABELS.LOCATIONS.WORKSPACE_SUFFIX}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                    {LABELS.BADGES.AVAILABLE_NOW}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    {location.NAME}
                  </h3>
                  <p className="text-gray-600 mb-6">{location.ADDRESS}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-gray-500 text-sm">
                        {LABELS.LOCATIONS.SIZE_LABEL}
                      </span>
                      <p className="text-gray-900 font-medium">
                        {location.SIZE}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">
                        {LABELS.LOCATIONS.RATE_LABEL}
                      </span>
                      <p className="text-gray-900 font-medium">
                        {location.RATE}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-gray-500 text-sm">
                      {LABELS.LOCATIONS.TOTAL_INVESTMENT_LABEL}
                    </span>
                    <p className="text-2xl font-medium text-gray-900">
                      {location.TOTAL}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-gray-900 font-medium mb-3">
                      {LABELS.LOCATIONS.AMENITIES_LABEL}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {location.FEATURES.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-gray-600 text-sm"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/booking/rooms')}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium hover:shadow-lg"
                  >
                    {LABELS.LOCATIONS.RESERVE_BUTTON}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
