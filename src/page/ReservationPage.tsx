import React, { useEffect, useState } from 'react';
import type { ReservationResponseDTO } from '@/type/reservation';
import { useAuth } from '@/contexts/AuthContext';
import {
  fetchPublicReservation,
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

  useEffect(() => {
    async function fetchAllReservations() {
      try {
        setLoading(true);
        const data = isPrivate
          ? await fetchReservationsByAuthUserId(user?.id || '')
          : await fetchPublicReservation();
        console.log('Fetched reservation data:', data);
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
    const resStart = new Date(reservation.startDate);
    const resEnd = new Date(reservation.endDate);

    if (startDate && endDate) {
      return new Date(startDate) >= resStart && new Date(endDate) <= resEnd;
    }

    const filterDate = new Date(startDate || endDate);
    return (
      (!startDate && !endDate) ||
      (filterDate >= resStart && filterDate <= resEnd)
    );
  });

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
                  onChange={(e) => {
                    if (
                      endDate &&
                      new Date(e.target.value) > new Date(endDate)
                    ) {
                      setStartDate(startDate);
                      setEndDate(e.target.value);
                    } else {
                      setStartDate(e.target.value);
                    }
                  }}
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
                  onChange={(e) => {
                    if (
                      startDate &&
                      new Date(e.target.value) < new Date(startDate)
                    ) {
                      setEndDate(startDate);
                      setStartDate(e.target.value);
                    } else {
                      setEndDate(e.target.value);
                    }
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
                />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-700 mb-1">
                  Visibility
                </span>
                <select
                  id="visibility"
                  className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                  value={isPrivate ? 'private' : 'public'}
                  onChange={(e) => setIsPrivate(e.target.value === 'private')}
                >
                  <option value="public">Public Reservations</option>
                  <option value="private">My Reservations</option>
                </select>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-10 mb-4">Reservations</h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredReservations?.length === 0 ? (
            <p className="text-gray-500 italic">No reservations available.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {filteredReservations?.map((r) => (
                <li
                  key={r?.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {r?.user?.username ?? 'Unknown'}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        r?.private
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {r?.private ? 'Private' : 'Public'}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-4 space-y-1">
                    <p>
                      <span className="font-medium">Start:</span>{' '}
                      {r?.startDate?.toString() ?? 'Unknown'}
                    </p>
                    <p>
                      <span className="font-medium">End:</span>{' '}
                      {r?.endDate?.toString() ?? 'Unknown'}
                    </p>
                  </div>

                  <div className="text-gray-700 text-sm mt-auto">
                    <p className="font-medium mb-1">Description:</p>
                    <p className="text-gray-600 line-clamp-4">
                      {r?.description ?? 'No description'}
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
