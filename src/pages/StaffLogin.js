import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) await signup(email, password);
      else await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Login failed — check email/password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 15, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#C41E3A', mb: 4 }}>
          Staff {isSignup ? 'Sign Up' : 'Login'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth required value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Password" type="password" fullWidth required value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 3 }} />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#C41E3A', py: 2 }}>
            {isSignup ? 'CREATE STAFF ACCOUNT' : 'LOGIN'}
          </Button>
        </form>
        <Button onClick={() => setIsSignup(!isSignup)} sx={{ mt: 2, color: '#C41E3A' }}>
          {isSignup ? 'Already have account? Login' : 'Need account? Sign up'}
        </Button>
      </Box>
    </Container>
  );
            }
