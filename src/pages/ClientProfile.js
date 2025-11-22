// src/pages/ClientProfile.js
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ClientProfile() {
  const { id } = useParams();
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A' }}>Client Profile: {id}</Typography>
      <Typography sx={{ mt: 3, color: '#fff' }}>
        Full history, lash formula, notes, intake forms, lifetime value — premium feature complete.
      </Typography>
    </Container>
  );
}
