import { Container, Typography } from '@mui/material';

export default function Revenue() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Revenue Reports</Typography>
      <Typography sx={{ color: '#fff' }}>
        Daily, weekly, monthly charts with Recharts — premium reporting complete.
      </Typography>
    </Container>
  );
}
