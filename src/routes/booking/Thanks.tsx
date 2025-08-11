import { LABELS } from '@/constants/labels';

export default function Thanks() {
  return (
    <section
      className="min-h-screen pt-20 pb-16 flex flex-col justify-center"
      style={{ backgroundColor: '#E4EDEC80' }}
    >
      <div className="text-center my-12">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
          {LABELS.BOOKING.TITLES.BOOKING_THANKS}
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto pt-6">
          {LABELS.BOOKING.DESCRIPTIONS.THANKS_MESSAGE}
        </p>
      </div>
    </section>
  );
}
