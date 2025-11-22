import { Container, Grid, Paper, Typography } from '@mui/material';
import BookingCalendar from '../components/BookingCalendar';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ today: 0, week: 0, revenue: 0, clients: 0 });

  useEffect(() => {
    onValue(ref(db, 'bookings'), (snap) => {
      const bookings = Object.values(snap.val() || {});
      const now = new Date();
      const today = bookings.filter(b => new Date(b.dateTime).toDateString() === now.toDateString()).length;
      const week = bookings.filter(b => new Date(b.dateTime) > new Date(now.setDate(now.getDate() - 7)));
      const revenue = bookings.reduce((sum, b) => sum + b.amount, 0);
      setStats({ today, week: week.length, revenue, clients: new Set(bookings.map(b => b.clientEmail)).size });
    });
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4, fontWeight: 'bold' }}>Dashboard</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={3}><Paper sx={{ p: 3, bgcolor: '#222', color: '#fff' }}><Typography variant="h6">Today</Typography><Typography variant="h4">{stats.today}</Typography></Paper></Grid>
        <Grid item xs={3}><Paper sx={{ p: 3, bgcolor: '#222', color: '#fff' }}><Typography variant="h6">This Week</Typography><Typography variant="h4">{stats.week}</Typography></Paper></Grid>
        <Grid item xs={3}><Paper sx={{ p: 3, bgcolor: '#222', color: '#fff' }}><Typography variant="h6">Revenue</Typography><Typography variant="h4">${stats.revenue}</Typography></Paper></Grid>
        <Grid item xs={3}><Paper sx={{ p: 3, bgcolor: '#222', color: '#fff' }}><Typography variant="h6">Clients</Typography><Typography variant="h4">{stats.clients}</Typography></Paper></Grid>
      </Grid>
      <Paper sx={{ p: 3 }}><BookingCalendar /></Paper>
    </Container>
  );
}
