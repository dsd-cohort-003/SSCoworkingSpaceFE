import React, { useEffect, useState } from 'react';
import {
  Button,
  Stack,
  Typography,
  // Link,
  TextField,
  Alert,
} from '@mui/material';
import {
  confirmPayment,
  fetchUnpaidBillingByUser,
  processPayment,
} from '@/services/billingService';
import type { Billing } from '@/type/billing';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!user?.id) return;
    async function fetchUnpaidBills() {
      try {
        setLoading(true);
        const data = await fetchUnpaidBillingByUser(user?.id || '');
        console.log('Fetched billing data:', data);
        setBills(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(String(e));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUnpaidBills();
  }, [user, location.key]);

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
      for (const billId of billIds) {
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
      <Stack padding="2rem" alignItems="center" spacing={2}>
        <Typography variant="h4" color="primary">
          Thank you, your payment has been confirmed!
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}
    >
      <Typography variant="h5">{user?.name}'s Bills</Typography>

      {bills.length === 0 ? (
        <Typography>No unpaid bills so far!</Typography>
      ) : (
        <>
          {bills.map((bill, idx) => {
            console.log(`Rendering bill[${idx}]`, bill);

            // Desk reservation info
            const deskRes = bill.reservation.deskReservation;
            const deskStart = new Date(deskRes.startDate).toLocaleString();
            const deskEnd = new Date(deskRes.endDate).toLocaleString();
            const startDate = new Date(deskRes.startDate);
            const endDate = new Date(deskRes.endDate);
            const hours =
              (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
            const deskTotal = deskRes.desk.price * hours;

            // Resource reservations info
            const resourceDetails = bill.reservation.resourceReservations.map(
              (rr) => {
                const start = new Date(rr.startDate).toLocaleString();
                const end = new Date(rr.endDate).toLocaleString();
                const startDate = new Date(rr.startDate);
                const endDate = new Date(rr.endDate);
                const hours =
                  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
                const resourceTotal = rr.resource.price * hours;
                return (
                  <div key={rr.id} style={{ marginLeft: 16 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {rr.resource.name}
                    </Typography>
                    <Typography>Start: {start}</Typography>
                    <Typography>End: {end}</Typography>
                    <Typography>
                      Price: ${rr.resource.price.toFixed(2)}
                    </Typography>
                    <Typography>
                      Total: ${resourceTotal.toFixed(2)} ({hours.toFixed(2)}{' '}
                      hours × ${rr.resource.price.toFixed(2)}/hr)
                    </Typography>
                  </div>
                );
              },
            );

            return (
              <div
                key={bill.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: 8,
                  marginBottom: '1rem',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Desk Reservation:
                </Typography>
                <Typography>Desk: {deskRes.desk.description}</Typography>
                <Typography>Start: {deskStart}</Typography>
                <Typography>End: {deskEnd}</Typography>
                <Typography>Price: ${deskRes.desk.price.toFixed(2)}</Typography>
                <Typography>
                  Total: ${deskTotal.toFixed(2)} ({hours.toFixed(2)} hours × $
                  {deskRes.desk.price.toFixed(2)}/hr)
                </Typography>

                {resourceDetails.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      marginTop="1rem"
                    >
                      Resource Reservations:
                    </Typography>
                    {resourceDetails}
                  </>
                )}

                <Typography variant="body1" marginTop="1rem">
                  Invoice Total: ${bill.total.toFixed(2)}
                </Typography>
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

      {/* <Link
        href="#"
        underline="hover"
        style={{ marginTop: '1rem', textAlign: 'center' }}
      >
        Browse old bills
      </Link> */}
    </Stack>
  );
};

export default BillingPage;
