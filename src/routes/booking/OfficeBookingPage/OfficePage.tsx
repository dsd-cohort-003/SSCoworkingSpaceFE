import React, { useEffect, useState } from 'react';
import OfficeCard from './OfficeCard';
import { type Office } from './Offices';
import { desksMock } from '../DeskBooking/Desk';
import OfficeFilters from './OfficeFilters';
import DeskCard from '../DeskBooking/DeskCard';

function OfficePage() {
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [desks, setDesks] = useState(desksMock);
  const [offices, setOffices] = useState([]);
  const [search, setSearch] = useState('');

  const showOffices = !!selectedOffice;

  useEffect(() => {
    const getOffices = async () => {
      const response = await fetch('http://localhost:8080/offices');
      if (response.ok) {
        setOffices(await response.json());
      }
    };
    getOffices();
  }, []);

  useEffect(() => {
    if (selectedOffice) {
      //search for desks
      setDesks(desksMock);
    }
  }, [selectedOffice]);

  return (
    <>
      {!showOffices ? (
        <div className="flex bg-gray-100  min-w-screen p-4">
          <OfficeFilters />

          <div className="flex-grow ml-6">
            <div>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border rounded w-64"
              />
            </div>

            <h1 className="text-2xl font-bold mb-4">Rent Office Space</h1>
            <div className="space-y-4">
              {offices.map((office: Office) => (
                <OfficeCard
                  key={office.officeId}
                  office={office}
                  onSelectOffice={setSelectedOffice}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-row bg-gray-100 min-w-screen p-4">
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white m-2 px-4 py-2 rounded self-center hover:bg-blue-600"
              onClick={() => {
                setSelectedOffice(null);
              }}
            >
              Back
            </button>
            <h1 className="text-2xl font-bold m-4">Rent Office Space</h1>
          </div>
          <div className="flex justify-between m-6">
            <div>
              <img
                src={'image'}
                alt={selectedOffice.name}
                className="w-100 h-80 object-cover border"
              />
            </div>
            <div className="flex-row justify-left px-4 my-4">
              <h1 className="text-xl font-bold my-4">{selectedOffice.name}</h1>
              <div className="bg-green-500 text-white px-4 py-2 my-2 rounded self-center max-w-fit">
                Total Invoice
              </div>
              <h1 className="text-2xl my-2 font-bold">
                {selectedOffice.price}
              </h1>
              <p className="my-2">{selectedOffice.price}</p>
              <div className="flex">
                <div className="block">
                  <p>From</p>
                  <input type="date"></input>
                </div>
                <div>
                  <p>To</p>
                  <input type="date"></input>
                </div>
              </div>
            </div>
          </div>
          <h1>Desks</h1>
          <div className="space-y-4">
            {desks.map((desk) => (
              <DeskCard key={desk.deskId} desk={desk} />
            ))}
          </div>
          <button className="bg-blue-500 text-white m-2 px-4 py-2 rounded self-center hover:bg-blue-600">
            Confirm Request
          </button>
        </div>
      )}
    </>
  );
}

export default OfficePage;
