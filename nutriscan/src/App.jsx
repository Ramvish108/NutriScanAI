import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash    from './pages/Splash';
import Landing   from './pages/Landing';
import Dashboard from './pages/Dashboard';
import './styles/index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Splash />}    />
        <Route path="/landing"   element={<Landing />}   />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
