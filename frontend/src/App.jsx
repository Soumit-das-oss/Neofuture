import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/DashboardLayoutNew';
import DashboardHome from './pages/DashboardHomeNew';
import AIEnginePage from './pages/AIEnginePageNew';
import LogsPage from './pages/LogsPageNew';
import AIAssistantPage from './pages/AIAssistantPageNew';

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
