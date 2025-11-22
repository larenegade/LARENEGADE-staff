import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0, clients: 0, today: 0 });

  useEffect(() => {
    onValue(ref(db, 'bookings'), (snap) => {
      const data = snap.val() || {};
      const all = Object.values(data);
      const revenue = all.reduce((sum, b) => sum + (b.amount || 0), 0);
      const today = all.filter(b => new Date(b.date).toDateString() === new Date().toDateString()).length;
      setStats({
        bookings: all.length,
        revenue,
        clients: new Set(all.map(b => b.clientEmail)).size,
        today
      });
    });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>larenegade Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#222', color: '#fff' }}>
            <Typography variant="h6">Today’s Bookings</Typography>
            <Typography variant="h3">{stats.today}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#222', color: '#fff' }}>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h3">{stats.bookings}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#222', color: '#fff' }}>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h3">${stats.revenue}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#222', color: '#fff' }}>
            <Typography variant="h6">Clients</Typography>
            <Typography variant="h3">{stats.clients}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
