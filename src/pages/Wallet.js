// src/pages/Wallet.js — FINAL: STRIPE CONNECT PAYOUT (stylist pays fee)
import { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Box, Alert } from '@mui/material';
import { db, auth } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      onValue(ref(db, `staffWallets/${uid}`), (snap) => {
        setBalance(snap.val() || 0);
      });
    }
  }, []);

  const payoutToBank = async () => {
    const requested = parseFloat(amount);
    if (!requested || requested <= 0) return alert('Enter amount');

    const stripeFee = requested * 0.01 + 0.25;  // 1% + $0.25
    const totalDeduction = requested + stripeFee;

    if (totalDeduction > balance) {
      return alert(`Not enough balance. You need an extra C$${stripeFee.toFixed(2)} for the payout fee.`);
    }

    try {
      const res = await fetch('/.netlify/functions/stripe-payout', {
        method: 'POST',
        body: JSON.stringify({ amount: requested * 100 }) // in cents
      });

      if (res.ok) {
        alert(`C$${requested} paid out instantly to your bank!\nC$${stripeFee.toFixed(2)} fee deducted from your wallet.`);
        setAmount('');
      } else {
        alert('Payout failed');
      }
    } catch (e) {
      alert('Error');
    }
  };

  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>
        Stylist Wallet
      </Typography>

      <Box sx={{ bgcolor: '#111', p: 5, borderRadius: 3, mb: 4 }}>
        <Typography sx={{ color: '#fff', fontSize: '2.5rem', mb: 3 }}>
          C${balance.toFixed(2)}
        </Typography>

        <TextField
          label="Amount to withdraw"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          type="number"
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          size="large"
          onClick={payoutToBank}
          sx={{ bgcolor: '#C41E3A', py: 2, px: 6 }}
        >
          Withdraw to Bank (you pay ~1% + $0.25 fee)
        </Button>

        <Alert severity="info" sx={{ mt: 3 }}>
          Instant payout via Stripe · Arrives in your bank in 1–2 business days<br />
          The small fee is deducted from your wallet (you pay it, not the salon)
        </Alert>
      </Box>
    </Container>
  );
}
