import { Container, Typography } from '@mui/material';

export default function BookingsList() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ color: '#C41E3A', mb: 3 }}>
        Full Calendar + All Bookings (drag-drop, reschedule, cancel) — premium feature complete in next 30 seconds if you want it
      </Typography>
    </Container>
  );
}
