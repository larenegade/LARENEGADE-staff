import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlockedProvider } from './context/BlockedContext';
import StaffApp from './apps/StaffApp';

export default function App() {
  return (
    <AuthProvider>
      <BlockedProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<StaffApp />} />
          </Routes>
        </Router>
      </BlockedProvider>
    </AuthProvider>
  );
}
