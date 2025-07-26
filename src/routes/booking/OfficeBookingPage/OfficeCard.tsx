import React from 'react';
import type { Office } from './Offices';

interface OfficeCardProps {
  office: Office;
  onSelectOffice: (office: Office) => void;
}

const OfficeCard = ({ office, onSelectOffice }: OfficeCardProps) => {
  return (
    <div className="border rounded p-4 flex gap-4 shadow-sm">
      <img
        src={'office.image'}
        alt={office.name}
        className="w-40 h-28 object-cover border"
      />
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-bold text-lg">{office.name}</h3>
          <p>
            <strong>Size:</strong> {office.size}
          </p>
          <p>
            <strong>Available:</strong> {'office.available'}
          </p>
          <p>
            <strong>Lease Rate:</strong> {office.price}
          </p>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded self-center hover:bg-blue-600"
        onClick={() => {
          onSelectOffice(office);
        }}
      >
        Reserve
      </button>
    </div>
  );
};

export default OfficeCard;
