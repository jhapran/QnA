import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Dashboard } from './pages/dashboard';
import { Landing } from './pages/landing';
import { Toaster } from 'sonner';

export function App() {
  // Temporary auth state for demo
  const isAuthenticated = false;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header isAuthenticated={isAuthenticated} />
        <main>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}