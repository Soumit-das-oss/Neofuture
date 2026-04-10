import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import AIEnginePage from './pages/AIEnginePage';
import LogsPage from './pages/LogsPage';
import AIAssistantPage from './pages/AIAssistantPage';

function App() {
  return (
    <div className="min-h-screen bg-navy text-slate-300">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="engine" element={<AIEnginePage />} />
          <Route path="logs" element={<LogsPage />} />
          <Route path="assistant" element={<AIAssistantPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
