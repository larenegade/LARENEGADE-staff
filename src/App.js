import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import StaffApp from './apps/StaffApp';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<StaffApp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
