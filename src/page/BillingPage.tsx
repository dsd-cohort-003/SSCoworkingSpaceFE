import React, { useEffect, useState } from 'react';
import NavBar from '../component/NavBar';
import {
  Button,
  Stack,
  Typography,
  Link,
  TextField,
  Alert,
} from '@mui/material';
import {
  confirmPayment,
  fetchUnpaidBillingByUser,
  processPayment,
} from '@/api/service';
import type { Billing } from '@/type/billing';
import { useNavigate } from 'react-router-dom';

const mockUserName = 'Alice';
const userId = 6;

const BillingPage: React.FC = () => {
  const navigate = useNavigate();

  const [useCardOnFile, setUseCardOnFile] = useState(true);
  const [bills, setBills] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // New card form fields
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');

  useEffect(() => {
    async function fetchUnpaidBills() {
      try {
        setLoading(true);
        // Assuming your API endpoint is: GET /api/billing/user/{userId}/unpaid and returns bills with office info
        const data = await fetchUnpaidBillingByUser(userId);
        console.log('Fetched billing data:', data);
        setBills(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(String(e)); // fallback for non-Error throws
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUnpaidBills();
  }, []);

  const totalAmount = bills.reduce((acc, bill) => acc + bill.total, 0);

  const validateCard = () => {
    if (useCardOnFile) return true;
    if (
      cardNumber.trim().length < 12 ||
      !/^\d+$/.test(cardNumber) ||
      !/^\d{2}\/\d{2}$/.test(expDate) ||
      !/^\d{3,4}$/.test(cvc)
    ) {
      setError('Please enter valid credit card details.');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    setError(null);
    if (!validateCard()) return;

    setPaymentProcessing(true);
    try {
      const billIds = bills.map((b) => b.id);
      // Mark all unpaid bills as paid in sequence (for demo)
      for (const billId of billIds) {
        // Call your backend payment processing and confirmation endpoints
        await processPayment(billId);
        await confirmPayment(billId);
      }
      setSuccess(true);
      const idsParam = billIds.join(',');
      navigate(`/payment-confirmation?billIds=${idsParam}`);
    } catch {
      setError('Payment failed. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (success) {
    return (
      <>
        <NavBar />
        <Stack padding="2rem" alignItems="center" spacing={2}>
          <Typography variant="h4" color="primary">
            Thank you, your payment has been confirmed!
          </Typography>
        </Stack>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Stack
        direction="column"
        spacing={2}
        style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}
      >
        <Typography variant="h5">{mockUserName}'s Bills</Typography>

        {bills.length === 0 ? (
          <Typography>No unpaid bills so far!</Typography>
        ) : (
          <>
            {bills.map((bill, idx) => {
              console.log(`Rendering bill[${idx}]`, bill);
              const start = new Date(
                bill.reservation.startDate,
              ).toLocaleString();
              const end = new Date(bill.reservation.endDate).toLocaleString();

              return (
                <div
                  key={bill.id}
                  style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    borderRadius: 8,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {bill.reservation.office.name}
                  </Typography>
                  <Typography>Start: {start}</Typography>
                  <Typography>End: {end}</Typography>
                  <Typography>
                    Rate: ${bill.reservation.office.price.toFixed(2)}
                  </Typography>
                  <Typography>Invoice: ${bill.total.toFixed(2)}</Typography>
                </div>
              );
            })}
            <Typography variant="h6" textAlign="right" marginTop="1rem">
              Total amount due: ${totalAmount.toFixed(2)}
            </Typography>
          </>
        )}

        <div>
          <Typography variant="h6">Payment Method</Typography>
          <label>
            <input
              type="radio"
              checked={useCardOnFile}
              onChange={() => setUseCardOnFile(true)}
            />{' '}
            Use card on file (**** **** **** 1234)
          </label>
          <br />
          <label>
            <input
              type="radio"
              checked={!useCardOnFile}
              onChange={() => setUseCardOnFile(false)}
            />{' '}
            Use new card
          </label>

          {!useCardOnFile && (
            <div style={{ marginTop: '1rem' }}>
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                margin="dense"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <TextField
                label="Expiration (MM/YY)"
                variant="outlined"
                fullWidth
                margin="dense"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
              <TextField
                label="CVC"
                variant="outlined"
                fullWidth
                margin="dense"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          )}
        </div>

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={paymentProcessing || bills.length === 0}
        >
          {paymentProcessing ? 'Processing...' : 'Pay Now'}
        </Button>

        <Link
          href="#"
          underline="hover"
          style={{ marginTop: '1rem', textAlign: 'center' }}
        >
          Browse old bills
        </Link>
      </Stack>
    </>
  );
};

export default BillingPage;
