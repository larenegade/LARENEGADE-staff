import { Container, Typography, Box } from '@mui/material';

export default function AdminDashboard() {
  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ bgcolor: '#222', p: 4, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ color: '#C41E3A', mb: 3 }}>
          Staff Dashboard
        </Typography>
        <Typography sx={{ color: '#fff' }}>
          Welcome back! All bookings and client messages appear here.
        </Typography>
      </Box>
    </Container>
  );
}
