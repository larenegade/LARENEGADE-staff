import { useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';
import emailjs from '@emailjs/browser';

export default function GiftCards() {
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [code, setCode] = useState('');
  const [giftCards, setGiftCards] = useState([]);

  const generateCode = () => {
    const newCode = 'GIFT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setCode(newCode);
  };

  const createGiftCard = async () => {
    if (!value || !code) return alert('Enter value and generate code');
    const giftRef = await push(ref(db, 'giftCards'), {
      code,
      value: Number(value),
      recipient,
      createdAt: new Date().toISOString(),
      redeemed: false,
      activated: false
    });
    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      { to_name: recipient || 'Gift Recipient', to_email: '', giftCode: code, value: `C$${value}` }
    );
    alert('Gift card created and emailed!');
    setValue(''); setRecipient(''); setCode('');
  };

  // Load existing gift cards
  useEffect(() => {
    onValue(ref(db, 'giftCards'), (snap) => {
      setGiftCards(Object.entries(snap.val() || {}).map(([id, g]) => ({ id, ...g })));
    });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Gift Cards</Typography>
      <Box sx={{ mb: 4, p: 3, bgcolor: '#111', borderRadius: 2 }}>
        <Typography sx={{ color: '#fff', mb: 2 }}>Create E-Gift Card</Typography>
        <TextField label="Value (CAD)" type="number" value={value} onChange={e => setValue(e.target.value)} sx={{ mr: 2 }} />
        <TextField label="Recipient Name" value={recipient} onChange={e => setRecipient(e.target.value)} sx={{ mr: 2 }} />
        <Button onClick={generateCode} variant="outlined" sx={{ mr: 2 }}>Generate Code</Button>
        {code && <Typography sx={{ color: '#C41E3A' }}>Code: {code}</Typography>}
        <Button onClick={createGiftCard} variant="contained" sx={{ mt: 2, bgcolor: '#C41E3A' }}>Create & Email</Button>
      </Box>

      <Typography sx={{ color: '#fff', mb: 2 }}>All Gift Cards</Typography>
      <Table sx={{ bgcolor: '#222' }}>
        <TableHead><TableRow><TableCell sx={{ color: '#fff' }}>Code</TableCell><TableCell sx={{ color: '#fff' }}>Value</TableCell><TableCell sx={{ color: '#fff' }}>Recipient</TableCell><TableCell sx={{ color: '#fff' }}>Status</TableCell></TableRow></TableHead>
        <TableBody>
          {giftCards.map(g => (
            <TableRow key={g.id}>
              <TableCell sx={{ color: '#fff' }}>{g.code}</TableCell>
              <TableCell sx={{ color: '#fff' }}>C${g.value}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{g.recipient}</TableCell>
              <TableCell sx={{ color: g.redeemed ? 'green' : 'orange' }}>{g.redeemed ? 'Redeemed' : 'Active'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
