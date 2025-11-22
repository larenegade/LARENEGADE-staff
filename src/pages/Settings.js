import { Container, Typography, TextField, Button, List, ListItem } from '@mui/material';
import { MenuItem } from '@mui/material';  
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, update, onValue } from 'firebase/database';

export default function Settings() {
  const [blockedEmails, setBlockedEmails] = useState([]);
  const [newBlock, setNewBlock] = useState({ type: 'email', value: '' });

  useEffect(() => {
    onValue(ref(db, 'blockedList/email'), (snap) => {
      const data = snap.val() || {};
      setBlockedEmails(Object.keys(data));
    });
  }, []);

  const addBlock = () => {
    update(ref(db, `blockedList/${newBlock.type}/${newBlock.value}`), true);
    setNewBlock({ type: 'email', value: '' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Block List</Typography>
      <TextField select label="Block by" value={newBlock.type} onChange={e => setNewBlock({ ...newBlock, type: e.target.value })} sx={{ mb: 2 }}>
        <MenuItem value="email">Email</MenuItem>
        <MenuItem value="phone">Phone</MenuItem>
        <MenuItem value="name">Full Name</MenuItem>
      </TextField>
      <TextField label="Value" fullWidth value={newBlock.value} onChange={e => setNewBlock({ ...newBlock, value: e.target.value })} sx={{ mb: 2 }} />
      <Button onClick={addBlock} variant="contained" sx={{ bgcolor: '#C41E3A' }}>Add to Block List</Button>
      <List sx={{ mt: 4 }}>
        {blockedEmails.map(e => <ListItem key={e} sx={{ bgcolor: '#222' }}>{e} <Button size="small" color="error">Remove</Button></ListItem>)}
      </List>
    </Container>
  );
}
