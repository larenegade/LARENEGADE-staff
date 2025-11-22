import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, remove, update } from 'firebase/database';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'bookings'), (snap) => {
      const data = snap.val() || {};
      setBookings(Object.entries(data).map(([id, b]) => ({ id, ...b })));
    });
  }, []);

  const cancelBooking = (id) => {
    if (window.confirm('Cancel this booking?')) remove(ref(db, `bookings/${id}`));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>All Bookings</Typography>
      <Table sx={{ bgcolor: '#222', color: '#fff' }}>
        <TableHead><TableRow><TableCell>Client</TableCell><TableCell>Service</TableCell><TableCell>Date</TableCell><TableCell>Amount</TableCell><TableCell>Actions</TableCell></TableRow></TableHead>
        <TableBody>
          {bookings.map(b => (
            <TableRow key={b.id}>
              <TableCell sx={{ color: '#fff' }}>{b.clientName}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{b.service}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{new Date(b.dateTime).toLocaleString()}</TableCell>
              <TableCell sx={{ color: '#fff' }}>${b.amount}</TableCell>
              <TableCell>
                <Button size="small" color="error" onClick={() => cancelBooking(b.id)}>Cancel</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
