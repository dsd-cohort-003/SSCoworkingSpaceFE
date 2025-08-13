import type { BookingData } from '@/hooks/useBookingFlow';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import Card from '@/components/ui/card';
import PriceBreakdown from '@/components/ui/PriceBreakdown';
import { useLocation } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

export default function ConfirmBooking() {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const { goToConfirmation, goToHomepage } = useBookingFlow();

  const bookingData = (location.state as BookingData) || {
    location: 'Office',
    fromDate: '',
    toDate: '',
    resources: [],
  };

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      setUsername(session?.user.user_metadata.full_name);
    };

    getSession();
  }, []);

  const officeName = bookingData.location;
  const fromDate = bookingData.fromDate;
  const toDate = bookingData.toDate;
  const resources = bookingData.resources;

  resources?.forEach((resource) => console.log(resource));

  const bookingDetails = {
    ...bookingData,
    /* confirmationNumber: `SS${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`, */
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

  /* const handleConfirmRequest = (data: ) => {
    goToConfirmation({
      location: officeName,
      fromDate,
      toDate,
      resources,
      confirmationNumber: data.confirmationNumber,
    });
  }; */

  const handleCancelConfirm = () => {
    if (window.confirm('Would you like to cancel reservation?')) {
      bookingData.location = '';
      bookingData.toDate = '';
      bookingData.fromDate = '';
      bookingData.resources = [];
      goToHomepage();
    }
  };

  interface NewReservation {
    username: string;
    totalPrice: number;
    deskId: number;
    startDate: string;
    endDate: string;
    resourceIds: number[];
  }

  interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    createdAt: string;
  }

  interface Reservation {
    id: number;
    user: User;
    totalPrice: number;
    createdAt: string;
    confirmationNumber: string;
    reservationStatus: string;
  }

  const createReservation = async (
    newReservation: NewReservation,
  ): Promise<Reservation> => {
    const response = await fetch('http://localhost:8080/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReservation),
    });

    if (!response.ok) {
      throw new Error('Failed to create reservation');
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createReservation,
    onSuccess: (data) => {
      goToConfirmation({
        location: officeName,
        fromDate,
        toDate,
        resources,
        confirmationNumber: data.confirmationNumber,
        reservationStatus: data.reservationStatus,
      });
    },
  });

  return (
    <div>
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
              showBadge={false}
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  mutation.mutate({
                    username,
                    totalPrice: totalCost,
                    deskId: 4,
                    startDate: fromDate,
                    endDate: toDate,
                    // resourceIds: (resources || []).map(resource => parseInt(resource.id)),
                    resourceIds: [1],
                  })
                }
                className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium"
              >
                Confirm Reservation
              </button>
              <button
                onClick={handleCancelConfirm}
                className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel Confirmation
              </button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
