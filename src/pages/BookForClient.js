import { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, MenuItem, Select,
  FormControl, InputLabel, Alert, Box, Chip
} from '@mui/material';
import { FormControlLabel, Switch } from '@mui/material';
import { db } from '../firebase';
import { ref, onValue, push } from 'firebase/database';
import { useAuth } from '../context/AuthContext';

export default function BookForClient() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    clientEmail: '',
    clientName: '',
    serviceId: '',
    date: '',
    time: '',
    priceOverride: '',
    deposit: 0,
    notes: '',
    walkIn: false,
    comp: false
  });

  useEffect(() => {
    onValue(ref(db, 'services'), (snap) => {
      const data = snap.val() || {};
      setServices(Object.entries(data).map(([id, s]) => ({ id, ...s })));
    });
    onValue(ref(db, 'clients'), (snap) => {
      const data = snap.val() || {};
      setClients(Object.entries(data).map(([id, c]) => ({ id, ...c })));
    });
  }, []);

  const selectedService = services.find(s => s.id === form.serviceId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalPrice = form.comp ? 0 : (form.priceOverride || selectedService?.price || 0);
    const booking = {
      clientEmail: form.clientEmail || 'walk-in@larenegade.ca',
      clientName: form.clientName || 'Walk-In',
      service: selectedService?.name || 'Custom Service',
      serviceId: form.serviceId,
      dateTime: `${form.date}T${form.time}`,
      amount: finalPrice,
      depositPaid: form.deposit,
      status: form.comp ? 'comp' : 'confirmed',
      bookedBy: user.email,
      staffNotes: form.notes,
      walkIn: form.walkIn,
      createdAt: new Date().toISOString()
    };

    await push(ref(db, 'bookings'), booking);
    alert(`Booking created for ${form.clientName || form.clientEmail} — ${form.comp ? 'COMPED' : `C$${finalPrice}`}`);
    // Reset form
    setForm({ ...form, clientName: '', serviceId: '', date: '', time: '', priceOverride: '', deposit: 0, notes: '', walkIn: false, comp: false });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4, fontWeight: 'bold' }}>
        Book Appointment For Client (Staff Only)
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Staff can override price, waive deposit, comp service, book walk-ins, and add internal notes.
      </Alert>

      <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: '#111', p: 4, borderRadius: 2 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ color: '#C41E3A' }}>Existing Client (optional)</InputLabel>
          <Select value={form.clientEmail} onChange={e => setForm({ ...form, clientEmail: e.target.value })}>
            <MenuItem value="">— New / Walk-In —</MenuItem>
            {clients.map(c => (
              <MenuItem key={c.id} value={c.id}>
                {c.firstName} {c.lastName} ({c.id}) — {c.phone}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Client Name (if walk-in)"
          fullWidth
          value={form.clientName}
          onChange={e => setForm({ ...form, clientName: e.target.value })}
          sx={{ mb: 3, input: { color: '#fff' } }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ color: '#C41E3A' }}>Service</InputLabel>
          <Select value={form.serviceId} onChange={e => setForm({ ...form, serviceId: e.target.value })} required>
            {services.map(s => (
              <MenuItem key={s.id} value={s.id}>
                {s.name} — C${s.price} — {s.duration} min
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedService && (
          <Box sx={{ mb: 3 }}>
            <Chip label={`Standard: C${selectedService.price}`} color="primary" sx={{ mr: 1 }} />
            <Chip label={`Duration: ${selectedService.duration} min`} sx={{ bgcolor: '#333' }} />
          </Box>
        )}

        <TextField label="Date" type="date" fullWidth required InputLabelProps={{ shrink: true }}
          value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} sx={{ mb: 3 }} />

        <TextField label="Time" type="time" fullWidth required InputLabelProps={{ shrink: true }}
          value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} sx={{ mb: 3 }} />

        <TextField
          label="Price Override (leave blank for normal)"
          type="number"
          fullWidth
          value={form.priceOverride}
          onChange={e => setForm({ ...form, priceOverride: e.target.value })}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Deposit Taken (0 = none)"
          type="number"
          fullWidth
          value={form.deposit}
          onChange={e => setForm({ ...form, deposit: e.target.value })}
          sx={{ mb: 3 }}
        />
<Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
  Announce to client 50% non-refundable retainer charged on booking, unless valid credit card is on file.<br />
  Late cancel/no-show → remaining 50% auto-charged + account suspension.
</Alert>
        <TextField
          label="Staff Notes (internal only)"
          multiline rows={3}
          fullWidth
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={<Switch checked={form.walkIn} onChange={e => setForm({ ...form, walkIn: e.target.checked })} />}
            label="Walk-In (no reminder SMS)"
          />
          <FormControlLabel
            control={<Switch checked={form.comp} onChange={e => setForm({ ...form, comp: e.target.checked })} />}
            label={<strong>COMP SERVICE (FREE)</strong>}
            sx={{ ml: 3 }}
          />
        </Box>

        <Button type="submit" variant="contained" size="large" fullWidth
          sx={{ bgcolor: '#C41E3A', py: 2, fontSize: '1.2rem', fontWeight: 'bold' }}>
          BOOK APPOINTMENT NOW
        </Button>
      </Box>
    </Container>
  );
}
