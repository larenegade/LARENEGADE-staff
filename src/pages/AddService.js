import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';

export default function AddService() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    push(ref(db, 'services'), {
      name,
      price: Number(price),
      duration: Number(duration),
      createdAt: new Date().toISOString()
    });
    setName(''); setPrice(''); setDuration('');
    alert('Service added!');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ bgcolor: '#222', p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: '#C41E3A', mb: 3 }}>Add New Service</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Service Name" fullWidth required value={name} onChange={e=>setName(e.target.value)} sx={{ mb: 2, input:{color:'#fff'} }} />
          <TextField label="Price (CAD)" type="number" fullWidth required value={price} onChange={e=>setPrice(e.target.value)} sx={{ mb: 2, input:{color:'#fff'} }} />
          <TextField label="Duration (minutes)" type="number" fullWidth required value={duration} onChange={e=>setDuration(e.target.value)} sx={{ mb: 3, input:{color:'#fff'} }} />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#C41E3A' }}>ADD SERVICE</Button>
        </form>
      </Box>
    </Container>
  );
}
