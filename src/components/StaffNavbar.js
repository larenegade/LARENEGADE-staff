import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function StaffNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: '#111' }}>
      <Toolbar>
        <Avatar src="/logo.png" sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#C41E3A' }}>
          larenegade staff
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Dashboard</Button>
        <Button color="inherit" onClick={() => navigate('/add-service')}>Services</Button>
        <Button color="inherit" onClick={() => navigate('/bookings')}>Calendar</Button>
        <Button color="inherit" onClick={() => navigate('/chat')}>Messages</Button>
        <Button color="inherit" onClick={logout}>Logout ({user?.email})</Button>
      </Toolbar>
    </AppBar>
  );
}
