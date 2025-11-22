import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import BookingCalendar from '../components/BookingCalendar';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0, clients: 0, noShows: 0 });

  useEffect(() => {
    onValue(ref(db, 'bookings'), (snap) => {
      const data = snap.val() || {};
      const all = Object.values(data);
      const revenue = all.reduce((sum, b) => sum + (b.amount || 0), 0);
      const noShows = all.filter(b => b.status === 'no-show').length;
      setStats({
        bookings: all.length,
        revenue,
        clients: new Set(all.map(b => b.clientId)).size,
        noShows
      });
    });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" sx={{ color: '#C41E3A', mb: 4 }}>larenegade Dashboard</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#111', color: '#fff' }}>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{stats.bookings}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#111', color: '#fff' }}>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4">C${stats.revenue}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#111', color: '#fff' }}>
            <Typography variant="h6">Clients</Typography>
            <Typography variant="h4">{stats.clients}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#f44336', color: '#fff' }}>
            <Typography variant="h6">No-Shows</Typography>
            <Typography variant="h4">{stats.noShows}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper sx={{ p: 4, bgcolor: '#111' }}>
        <Typography variant="h5" sx={{ color: '#C41E3A', mb: 3 }}>Today's Schedule</Typography>
        <BookingCalendar />
      </Paper>
    </Container>
  );
}
