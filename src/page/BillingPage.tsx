import { useState } from 'react';
import NavBar from '../component/NavBar';
import { Button, Stack } from '@mui/material';

const BillingPage: React.FC = () => {
  const [useCardOnFile, setUseCardOnFile] = useState(true);
  const [checkedIn, setCheckedIn] = useState(false);

  const handlePayment = () => {
    alert('Payment processed!');
  };

  const handleCheckInOut = () => {
    setCheckedIn(!checkedIn);
  };

  return (
    <>
      <NavBar />
      <Stack
        direction="row"
        spacing={2}
        style={{ padding: '2rem' }}
        alignContent="center"
        justifyContent="center"
      >
        <div style={{ padding: '2rem', minWidth: 300 }}>
          <div>First Name</div>
          <input
            type="text"
            placeholder="First Name..."
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
          <div>Last Name</div>
          <input
            type="text"
            placeholder="Last Name..."
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
          <div>Confirmation number</div>
          <input
            type="text"
            placeholder="Enter Confirmation Number..."
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
          <Stack direction="column" spacing={2} style={{ marginTop: '1rem' }}>
            <Button onClick={() => alert('Search')}>Search</Button>
            <Button onClick={() => alert('Check In')}>Check In</Button>
            <Button onClick={() => alert('Check Out')}>Check Out</Button>
          </Stack>
        </div>

        <div style={{ padding: '2rem', minWidth: 350 }}>
          <h2>Billing Details</h2>
          <div style={{ marginBottom: '1rem' }}>
            <p>
              <strong>Check-in Date:</strong> 2025-07-20
            </p>
            <p>
              <strong>Check-out Date:</strong> 2025-07-22
            </p>
            <p>
              <strong>Estimated Price:</strong> $120.00
            </p>
            <p>
              <strong>Actual Price:</strong> $140.00
            </p>
            <p>
              <strong>Hours Booked:</strong> 18 hrs
            </p>
            <p>
              <strong>Confirmation Number:</strong> ABC123456
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h3>Payment Method</h3>
            <label>
              <input
                type="radio"
                checked={useCardOnFile}
                onChange={() => setUseCardOnFile(true)}
              />
              Use card on file (**** **** **** 1234)
            </label>
            <br />
            <label>
              <input
                type="radio"
                checked={!useCardOnFile}
                onChange={() => setUseCardOnFile(false)}
              />
              Use new card
            </label>

            {!useCardOnFile && (
              <div style={{ marginTop: '1rem' }}>
                <input
                  type="text"
                  placeholder="Card Number"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    width: '100%',
                  }}
                />
                <input
                  type="text"
                  placeholder="Expiration (MM/YY)"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    width: '100%',
                  }}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    width: '100%',
                  }}
                />
              </div>
            )}
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            style={{ marginRight: '1rem' }}
          >
            Pay Now
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCheckInOut}
          >
            {checkedIn ? 'Check Out' : 'Check In'}
          </Button>
        </div>
      </Stack>
    </>
  );
};

export default BillingPage;
