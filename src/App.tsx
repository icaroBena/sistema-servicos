
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import Login from "./pages/login/login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* qualquer rota desconhecida volta pro login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}