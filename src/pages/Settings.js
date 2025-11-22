import { Container, Typography, Switch, FormControlLabel } from '@mui/material';

export default function Settings() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Business Settings</Typography>
      <FormControlLabel control={<Switch />} label="Require deposit (20%)" />
      <FormControlLabel control={<Switch />} label="SMS reminders 24h before" />
      <FormControlLabel control={<Switch />} label="Intake forms required" />
      <FormControlLabel control={<Switch />} label="No-show protection" />
    </Container>
  );
}
