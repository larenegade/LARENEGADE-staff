import { AppBar, Toolbar, Typography, Button, Avatar, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function StaffNavbar() {
  const { user , logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: '#0f0f0f', mb: 4 }}>
      <Toolbar>
        <Avatar src="/larenegade-logo.png" sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#C41E3A', fontWeight: 'bold' }}>
          larenegade staff
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/calendar')}>Calendar</Button>
          <Button color="inherit" onClick={() => navigate('/bookings')}>Bookings</Button>
          <Button color="inherit" onClick={() => navigate('/clients')}>Clients</Button>
          <Button color="inherit" onClick={() => navigate('/revenue')}>Revenue</Button>
          <Button color="inherit" onClick={logout}>Logout</Button>
            <Button color="inherit" onClick={() => navigate('/book-for-client')}>
  Book For Client
</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
