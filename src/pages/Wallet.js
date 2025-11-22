import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, update } from 'firebase/database';

export default function Wallet() {
  const [wallets, setWallets] = useState({ business: 0, staff: 0, clientTotal: 0 });
  const [transfer, setTransfer] = useState({ from: 'business', to: 'staff', amount: '' });

  useEffect(() => {
    onValue(ref(db, 'wallets'), (snap) => setWallets(snap.val() || { business: 0, staff: 0, clientTotal: 0 }));
  }, []);

  const doTransfer = () => {
    update(ref(db, 'wallets'), {
      [transfer.from]: wallets[transfer.from] - Number(transfer.amount),
      [transfer.to]: wallets[transfer.to] + Number(transfer.amount),
      transferLog: { from: transfer.from, to: transfer.to, amount: transfer.amount, date: new Date().toISOString() }
    });
    setTransfer({ from: 'business', to: 'staff', amount: '' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Wallets & Transfers</Typography>
      <Table sx={{ bgcolor: '#222' }}>
        <TableHead><TableRow><TableCell sx={{ color: '#fff' }}>Wallet</TableCell><TableCell sx={{ color: '#fff' }}>Balance</TableCell></TableRow></TableHead>
        <TableBody>
          <TableRow><TableCell sx={{ color: '#fff' }}>Business</TableCell><TableCell sx={{ color: '#fff' }}>C${wallets.business}</TableCell></TableRow>
          <TableRow><TableCell sx={{ color: '#fff' }}>Staff Payroll</TableCell><TableCell sx={{ color: '#fff' }}>C${wallets.staff}</TableCell></TableRow>
          <TableRow><TableCell sx={{ color: '#fff' }}>Client Loyalty Total</TableCell><TableCell sx={{ color: '#fff' }}>C${wallets.clientTotal}</TableCell></TableRow>
        </TableBody>
      </Table>

      <Box sx={{ mt: 4, p: 3, bgcolor: '#111', borderRadius: 2 }}>
        <Typography sx={{ color: '#C41E3A', mb: 2 }}>Transfer Funds</Typography>
        <TextField select label="From" value={transfer.from} onChange={e => setTransfer({ ...transfer, from: e.target.value })} sx={{ mr: 2 }}>
          <MenuItem value="business">Business Wallet</MenuItem>
          <MenuItem value="staff">Staff Wallet</MenuItem>
        </TextField>
        <TextField select label="To" value={transfer.to} onChange={e => setTransfer({ ...transfer, to: e.target.value })} sx={{ mr: 2 }}>
          <MenuItem value="staff">Staff Payroll</MenuItem>
          <MenuItem value="business">Business Wallet</MenuItem>
        </TextField>
        <TextField label="Amount" type="number" value={transfer.amount} onChange={e => setTransfer({ ...transfer, amount: e.target.value })} sx={{ mr: 2 }} />
        <Button variant="contained" onClick={doTransfer} sx={{ bgcolor: '#C41E3A' }}>Transfer</Button>
      </Box>
    </Container>
  );
}
