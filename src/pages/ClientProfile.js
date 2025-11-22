import { Container, Typography, Paper, TextField, Button, Switch, FormControlLabel, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, update } from 'firebase/database';

export default function ClientProfile() {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [notes, setNotes] = useState('');
  const [formula, setFormula] = useState('');
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    onValue(ref(db, `clients/${id}`), (snap) => {
      const data = snap.val();
      if (data) {
        setClient(data);
        setNotes(data.notes || '');
        setFormula(data.formula || '');
        setBlocked(data.blocked || false);
      }
    });
  }, [id]);

  const save = async () => {
    await update(ref(db, `clients/${id}`), { notes, formula, blocked });
    alert('Profile saved');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 3 }}>
        {client.firstName} {client.lastName}
      </Typography>

      <Alert severity={blocked ? "error" : "success"} sx={{ mb: 3 }}>
        {blocked ? "BLOCKED — Cannot book or chat" : "Active — Can book normally"}
      </Alert>

      <Paper sx={{ p: 4, bgcolor: '#111', color: '#fff' }}>
        <FormControlLabel
          control={<Switch checked={blocked} onChange={() => setBlocked(!blocked)} />}
          label="Block from online booking & chat"
        />

        <Typography variant="h6" sx={{ mt: 3, color: '#C41E3A' }}>Lash Formula</Typography>
        <TextField fullWidth multiline value={formula} onChange={e => setFormula(e.target.value)} sx={{ mb: 3 }} />

        <Typography variant="h6" sx={{ color: '#C41E3A' }}>Staff Notes</Typography>
        <TextField fullWidth multiline rows={6} value={notes} onChange={e => setNotes(e.target.value)} sx={{ mb: 3 }} />

        <Button onClick={save} variant="contained" fullWidth sx={{ bgcolor: '#C41E3A' }}>
          SAVE PROFILE
        </Button>
      </Paper>
    </Container>
  );
}
