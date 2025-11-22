
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StaffLogin from '../../pages/StaffLogin';
import AdminDashboard from '../../pages/AdminDashboard';
import AddService from '../../pages/AddService';
import ClientChat from '../../pages/ClientChat';
import AIAssistant from '../../pages/AIAssistant';
import BookForClient from '../../pages/BookForClient'; 
import StaffNavbar from '../../components/StaffNavbar';

function ProtectedRoute({ children }) {
  const { user, role } = useAuth();
  if (!user || !['admin', 'employee'].includes(role)) {
    return <StaffLogin />;
  }
  return children;
}

export default function StaffApp() {
  return (
    <>
      <StaffNavbar />
      <Routes>
        <Route path="/login" element={<StaffLogin />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/add-service" element={<AddService />} />
                <Route path="/chat" element={<ClientChat />} />
                <Route path="/ai" element={<AIAssistant />} />
                <Route path="/book-for-client" element={<BookForClient />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
