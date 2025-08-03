import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useSearchParams } from 'react-router';
import { fetchBillingById } from '@/api/service';
import type { Billing } from '@/type/billing';

const PaymentConfirmation: React.FC = () => {
  const [bills, setBills] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const billIdsParam = searchParams.get('billIds');

  useEffect(() => {
    if (!billIdsParam) {
      console.error('No billIds found in URL');
      setLoading(false);
      return;
    }

    const ids = billIdsParam
      .split(',')
      .map((id) => parseInt(id))
      .filter((id) => !isNaN(id));

    const fetchBills = async () => {
      try {
        const results: Billing[] = await Promise.all(
          ids.map((id) => fetchBillingById(id)),
        );
        console.log('Fetched paid bills:', results);
        setBills(results);
      } catch (err) {
        console.error('Error fetching one or more bills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [billIdsParam]);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
        <Typography>Loading your receipt(s)...</Typography>
      </Box>
    );
  }

  if (bills.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5" color="error">
          No receipts found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4} maxWidth={700} mx="auto">
      <Typography variant="h4" gutterBottom>
        Payment Confirmed!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Thank you for your payment. Below are your receipts:
      </Typography>

      {bills.map((bill, idx) => (
        <Box
          key={bill.id}
          mt={3}
          mb={4}
          p={2}
          border="1px solid #ccc"
          borderRadius={2}
        >
          <Typography variant="h6" gutterBottom>
            Receipt #{idx + 1}
          </Typography>
          <Typography>
            <strong>Office:</strong>{' '}
            {bill.reservation.office?.name ?? 'Unknown'}
          </Typography>
          <Typography>
            <strong>Start Date:</strong> {bill.reservation.startDate}
          </Typography>
          <Typography>
            <strong>End Date:</strong> {bill.reservation.endDate}
          </Typography>
          <Typography>
            <strong>Rate:</strong> ${bill.reservation.office.price.toFixed(2)}
          </Typography>
          <Typography>
            <strong>Total Paid:</strong> ${bill.total.toFixed(2)}
          </Typography>
          <Typography>
            <strong>Confirmation #:</strong> {bill.id}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PaymentConfirmation;
