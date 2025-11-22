import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StaffLogin from '../../pages/StaffLogin';
import AdminDashboard from '../../pages/AdminDashboard';
import AddService from '../../pages/AddService';
import Bookings from '../../pages/Bookings';
import Clients from '../../pages/Clients';
import ClientProfile from '../../pages/ClientProfile';
import Revenue from '../../pages/Revenue';
import Settings from '../../pages/Settings';
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
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/client/:id" element={<ClientProfile />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/settings" element={<Settings />} />
  <Route path="/book-for-client" element={<BookForClient />} />
      </Routes>
    </>
  );
}
