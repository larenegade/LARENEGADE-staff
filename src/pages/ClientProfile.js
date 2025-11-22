import { Container, Typography, Paper, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../firebase';
import { ref, update } from 'firebase/database';

export default function ClientProfile() {
  const { id } = useParams();
  const [notes, setNotes] = useState('');
  const [formula, setFormula] = useState('Volume - C Curl');

  const save = () => {
    update(ref(db, `clients/${id}`), { notes, formula });
    alert('Saved');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Client Profile</Typography>
      <Paper sx={{ p: 4, bgcolor: '#111' }}>
        <Typography variant="h5" sx={{ color: '#fff' }}>Lash Formula</Typography>
        <TextField fullWidth value={formula} onChange={e => setFormula(e.target.value)} sx={{ mb: 3 }} />
        <Typography variant="h5" sx={{ color: '#fff' }}>Notes</Typography>
        <TextField fullWidth multiline rows={6} value={notes} onChange={e => setNotes(e.target.value)} sx={{ mb: 3 }} />
        <Button variant="contained" onClick={save} sx={{ bgcolor: '#C41E3A' }}>Save</Button>
      </Paper>
    </Container>
  );
}
