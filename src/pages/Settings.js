import { Container, Typography, FormControlLabel, Switch, Paper, Button } from '@mui/material';
import { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({ deposits: true, sms: true, forms: true, loyalty: true });

  const toggle = (key) => setSettings({ ...settings, [key]: !settings[key] });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Settings</Typography>
      <Paper sx={{ p: 4, bgcolor: '#111' }}>
        <FormControlLabel control={<Switch checked={settings.deposits} onChange={() => toggle('deposits')} />} label="Require deposits (20%)" />
        <FormControlLabel control={<Switch checked={settings.sms} onChange={() => toggle('sms')} />} label="SMS reminders 24h before" />
        <FormControlLabel control={<Switch checked={settings.forms} onChange={() => toggle('forms')} />} label="Intake forms required" />
        <FormControlLabel control={<Switch checked={settings.loyalty} onChange={() => toggle('loyalty')} />} label="Loyalty program active" />
        <Button variant="contained" sx={{ mt: 3, bgcolor: '#C41E3A' }}>Save Settings</Button>
      </Paper>
    </Container>
  );
}
