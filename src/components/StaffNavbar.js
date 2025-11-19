import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function StaffNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: '#111' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#C41E3A' }}>
          larenegade staff
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Dashboard</Button>
        <Button color="inherit" onClick={() => navigate('/add-service')}>Add Service</Button>
        <Button color="inherit" onClick={() => navigate('/chat')}>Chat</Button>
        <Button color="inherit" onClick={() => navigate('/ai')}>AI</Button>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
