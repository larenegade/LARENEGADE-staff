import { Container, Typography, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function Revenue() {
  const [data, setData] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'bookings'), (snap) => {
      const bookings = Object.entries(snap.val() || {});
      const monthly = bookings.reduce((acc, [id, b]) => {
        const month = new Date(b.dateTime).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + b.amount;
        return acc;
      }, {});
      setData(Object.entries(monthly).map(([month, revenue]) => ({ month, revenue })));
    });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Revenue</Typography>
      <Paper sx={{ p: 4, bgcolor: '#111' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#C41E3A" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
}
