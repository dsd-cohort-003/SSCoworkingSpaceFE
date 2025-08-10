import { useLocation } from 'react-router-dom';
import type { BookingData } from '@/hooks/useBookingFlow';
import Card from '@/components/ui/card';
import PriceBreakdown from '@/components/ui/PriceBreakdown';

export default function BookingConfirmation() {
  const location = useLocation();
  const bookingData = (location.state as BookingData) || {
    location: 'Office',
    fromDate: '',
    toDate: '',
    resources: [],
  };

  const bookingDetails = {
    ...bookingData,
    //confirmationNumber: `SS${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    confirmationNumber: location.state.confirmationNumber,
  };

  const getDurationInDays = () => {
    if (!bookingDetails.fromDate || !bookingDetails.toDate) return 0;
    const start = new Date(bookingDetails.fromDate);
    const end = new Date(bookingDetails.toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const duration = getDurationInDays();
  const workspaceCost = duration * 25;
  const resourcesCost = (bookingDetails.resources || []).reduce(
    (total, resource) => total + resource.price * resource.quantity * duration,
    0,
  );
  const totalCost = workspaceCost + resourcesCost;

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative pt-20 pb-16 overflow-hidden"
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
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              Booking Confirmed
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Your workspace reservation has been successfully confirmed. We're
              excited to welcome you!
            </p>

            <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-lg font-medium text-gray-900 border border-white/30 shadow-sm">
              Confirmation #{bookingDetails.confirmationNumber}
            </div>

            <div className="w-16 h-1 bg-gray-900 mx-auto rounded-full opacity-20 mt-8"></div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Card
            header={{
              title: 'Reservation Details',
            }}
            padding="lg"
            className="shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Location Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Workspace</span>
                      <span className="text-gray-900 font-medium">
                        {bookingDetails.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Type</span>
                      <span className="text-gray-900 font-medium">
                        Dedicated Desk
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-500">Access</span>
                      <span className="text-gray-900 font-medium">24/7</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Booking Information
                  </h3>
                  <div className="space-y-3">
                    {bookingDetails.fromDate && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Check-in</span>
                        <span className="text-gray-900 font-medium">
                          {new Date(bookingDetails.fromDate).toLocaleDateString(
                            'en-US',
                            {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            },
                          )}
                        </span>
                      </div>
                    )}
                    {bookingDetails.toDate && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Check-out</span>
                        <span className="text-gray-900 font-medium">
                          {new Date(bookingDetails.toDate).toLocaleDateString(
                            'en-US',
                            {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            },
                          )}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-500">Duration</span>
                      <span className="text-gray-900 font-medium">
                        {duration} {duration === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {bookingDetails.resources &&
              bookingDetails.resources.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Selected Resources
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="space-y-4">
                      {bookingDetails.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {resource.name}
                            </h4>
                            <p className="text-sm text-gray-600 capitalize">
                              {resource.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {resource.quantity} × ${resource.price}/day ×{' '}
                              {duration} days
                            </div>
                            <div className="font-medium text-gray-900">
                              $
                              {(
                                resource.price *
                                resource.quantity *
                                duration
                              ).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            <PriceBreakdown
              items={[
                {
                  label: `Workspace (${duration} days)`,
                  amount: workspaceCost,
                },
                ...(resourcesCost > 0
                  ? [
                      {
                        label: `Resources (${duration} days)`,
                        amount: resourcesCost,
                      },
                    ]
                  : []),
              ]}
              total={totalCost}
              className="mb-8"
            />

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-medium text-blue-900 mb-3">
                What's Next?
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  You'll receive a confirmation email with access details
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Your access card will be ready for pickup
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Welcome orientation will be scheduled
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = '/')}
                className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium"
              >
                Return to Home
              </button>
              <button
                onClick={() => window.print()}
                className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors font-medium"
              >
                Print Confirmation
              </button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
