import React from 'react';
import type { Desk } from './Desk';

interface DeskCardProps {
  desk: Desk;
  //onSelectOffice: (office: Office) => void;
}

const DeskCard = ({ desk }: DeskCardProps) => {
  return (
    <div className="border rounded p-4 flex gap-4 shadow-sm">
      <img
        src={desk.image}
        alt={desk.name}
        className="w-40 h-28 object-cover border"
      />
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-bold text-lg">{desk.name}</h3>
          <p>
            <strong>Dimensions:</strong> {desk.dimensions}
          </p>
          <p>
            <strong>Count:</strong> {desk.count}
          </p>
        </div>
      </div>
      <input
        className="border h-6 self-center"
        placeholder="Select count..."
      ></input>
    </div>
  );
};

export default DeskCard;
