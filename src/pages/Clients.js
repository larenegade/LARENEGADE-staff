import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'clients'), (snap) => {
      setClients(Object.entries(snap.val() || {}).map(([id, c]) => ({ id, ...c })));
    });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Clients</Typography>
      <List>
        {clients.map(c => (
          <ListItem key={c.id} sx={{ bgcolor: '#222', mb: 1, borderRadius: 1 }}>
            <ListItemText
              primary={`${c.firstName} ${c.lastName}`}
              secondary={`Age: ${c.age} • Phone: ${c.phone} • ${c.visits || 0} visits`}
            />
            <Button variant="contained" sx={{ bgcolor: '#C41E3A' }}>View Profile</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
