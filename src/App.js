import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaffApp from './apps/StaffApp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<StaffApp />} />
      </Routes>
    </Router>
  );
}
