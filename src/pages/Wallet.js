import { Container, Typography, Button, TextField, Box } from '@mui/material';
import { useState } from 'react';

export default function Wallet() {
  const [transferAmount, setTransferAmount] = useState('');

  const transferToBank = async () => {
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0) return alert('Enter valid amount');

    try {
      // Direct Interac e-Transfer via your bank (RBC/TD/Scotia API or Plooto)
      const response = await fetch('/.netlify/functions/direct-bank-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'CAD',
          memo: 'Staff payout from LARENEgADE',
          bankAccount: process.env.STAFF_BANK_ACCOUNT // your bank details in env vars
        })
      });

      if (response.ok) {
        alert(`C$${amount} transferred to your bank via Interac e-Transfer (1-2 business days)`);
        setTransferAmount('');
      } else {
        alert('Transfer failed — check your bank connection');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Staff Wallet</Typography>
      <Box sx={{ bgcolor: '#111', p: 4, borderRadius: 2, mb: 4 }}>
        <Typography sx={{ color: '#fff', mb: 3 }}>Transfer Earnings to Bank</Typography>
        <TextField
          label="Amount (CAD)"
          type="number"
          value={transferAmount}
          onChange={e => setTransferAmount(e.target.value)}
          sx={{ mr: 2 }}
          InputProps={{ style: { backgroundColor: '#222', color: '#fff' } }}
        />
        <Button variant="contained" onClick={transferToBank} sx={{ bgcolor: '#4CAF50' }}>
          Send Interac e-Transfer
        </Button>
        <Typography sx={{ mt: 2, color: '#aaa' }}>
          Funds go directly to your Canadian bank account (no Stripe fees).
        </Typography>
      </Box>
    </Container>
  );
}
