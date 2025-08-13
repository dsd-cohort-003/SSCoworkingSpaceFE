import React, { useEffect, useState } from 'react';
import type { ReservationResponseDTO } from '@/type/reservation';
import { useAuth } from '@/contexts/AuthContext';
import {
  fetchAllReservation,
  fetchReservationsByAuthUserId,
} from '@/services/reservationService';

const ReservationPage: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationResponseDTO[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    if (!user?.id) return;
    async function fetchAllReservations() {
      try {
        setLoading(true);

        const data = isPrivate
          ? await fetchReservationsByAuthUserId(user?.id || '')
          : await fetchAllReservation();
        console.log('Fetched billing data:', data);
        setReservations(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(String(e));
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchAllReservations();
  }, [user, isPrivate]);

  const filteredReservations = reservations.filter((reservation) => {
    const afterStartDate =
      !reservation.startDate ||
      new Date(startDate) >= new Date(reservation.startDate);

    const beforeEndDate =
      !reservation.endDate ||
      new Date(endDate) <= new Date(reservation.endDate);

    return afterStartDate && beforeEndDate;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative pt-20 pb-20 overflow-hidden"
        style={{ backgroundColor: '#E4EDEC80' }}
      >
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight">
              Reservations
            </h1>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Filters
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col items-center">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
                />
              </div>

              <div className="flex flex-col items-center">
                <label
                  htmlFor="endDate"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
                />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-700 mb-1">
                  Visibility
                </span>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                  onClick={() => setIsPrivate((prev) => !prev)}
                >
                  {isPrivate ? 'Private' : 'Public'}
                </button>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-10 mb-4">Reservations</h2>

          {filteredReservations?.length === 0 ? (
            <p className="text-gray-500 italic">No reservations available.</p>
          ) : (
            <ul className="space-y-3">
              {filteredReservations?.map((t) => (
                <li
                  key={t?.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium">User:</span>{' '}
                      {t?.user?.username ?? 'Unknown'}
                    </p>
                    <p>
                      <span className="font-medium">Start Date:</span>{' '}
                      {t?.createdAt.toString() ?? 'Unknown'}
                    </p>
                    <p>
                      <span className="font-medium">End Date:</span>{' '}
                      {t?.createdAt.toString() ?? 'Unknown'}
                    </p>
                    <p>
                      <span className="font-medium">Open to public</span>{' '}
                      {t?.private === true ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <span className="font-medium">Description:</span>{' '}
                      {t?.description ?? 'No description'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReservationPage;
