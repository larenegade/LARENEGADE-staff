import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StaffLogin from '../../pages/StaffLogin';
import AdminDashboard from '../../pages/AdminDashboard';
import AddService from '../../pages/AddService';
import ClientChat from '../../pages/ClientChat';
import AIAssistant from '../../pages/AIAssistant';
import StaffNavbar from '../../components/StaffNavbar';

export default function StaffApp() {
  const { user, role } = useAuth();
  if (!user || !role) return <StaffLogin />;

  return (
    <>
      <StaffNavbar />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/chat" element={<ClientChat />} />
        <Route path="/ai" element={<AIAssistant />} />
      </Routes>
    </>
  );
    }
