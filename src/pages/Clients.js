import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onValue(ref(db, 'bookings'), (snap) => {
      const data = snap.val() || {};
      const map = {};
      Object.values(data).forEach(b => {
        map[b.clientEmail] = { name: b.clientName, email: b.clientEmail, visits: (map[b.clientEmail]?.visits || 0) + 1 };
      });
      setClients(Object.values(map));
    });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>Clients</Typography>
      <List>
        {clients.map(c => (
          <ListItem button key={c.email} onClick={() => navigate(`/client/${c.email}`)}>
            <ListItemText primary={c.name} secondary={`${c.visits} visits • ${c.email}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
