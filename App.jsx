import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Activity, Package, AlertTriangle, TrendingUp, Search, Thermometer, MapPin, Clock, Shield } from 'lucide-react';

// Simulated Backend Data Store
const DataStore = {
  users: [
    { id: 1, role: 'FDA', name: 'FDA Inspector', email: 'fda@gov.com' },
    { id: 2, role: 'Manufacturer', name: 'PharmaCorp Inc', email: 'mfg@pharmacorp.com' },
    { id: 3, role: 'Distributor', name: 'MedLog Distributors', email: 'dist@medlog.com' },
    { id: 4, role: 'Pharmacy', name: 'HealthPlus Pharmacy', email: 'pharmacy@healthplus.com' },
    import React, { useState, useEffect } from 'react';
    import PharmaChainDashboard from './PharmaChainDashboard';

    // Simple login/register wrapper
    const App = () => {
      const [user, setUser] = useState(() => {
        try {
          const raw = localStorage.getItem('pc_current_user');
          return raw ? JSON.parse(raw) : null;
        } catch (e) {
          return null;
        }
      });

      useEffect(() => {
        if (user) localStorage.setItem('pc_current_user', JSON.stringify(user));
        else localStorage.removeItem('pc_current_user');
      }, [user]);

      import React, { useState, useEffect } from 'react';
      import PharmaChainDashboard from './PharmaChainDashboard';

      // Simple login/register wrapper
      const App = () => {
        const [user, setUser] = useState(() => {
          try {
            const raw = localStorage.getItem('pc_current_user');
            return raw ? JSON.parse(raw) : null;
          } catch (e) {
            return null;
          }
        });

        useEffect(() => {
          if (user) localStorage.setItem('pc_current_user', JSON.stringify(user));
          else localStorage.removeItem('pc_current_user');
        }, [user]);

        if (!user) return <Auth onLogin={setUser} />;

        return <PharmaChainDashboard initialUser={user} onLogout={() => setUser(null)} />;
      };

      const Auth = ({ onLogin }) => {
        const [mode, setMode] = useState('login'); // login | register
        const [email, setEmail] = useState('');
        const [name, setName] = useState('');
        const [role, setRole] = useState('Patient');
        const [error, setError] = useState(null);

        // load users from localStorage or provide default
        const getUsers = () => {
          try {
            const raw = localStorage.getItem('pc_users');
            if (raw) return JSON.parse(raw);
          } catch (e) {}
          const defaults = [{ id: 1, role: 'Admin', name: 'Admin', email: 'admin@local' }];
          localStorage.setItem('pc_users', JSON.stringify(defaults));
          return defaults;
        };

        const saveUsers = (users) => localStorage.setItem('pc_users', JSON.stringify(users));

        const handleRegister = () => {
          setError(null);
          if (!email || !name) return setError('Name and email are required');
          const users = getUsers();
          if (users.find(u => u.email === email)) return setError('Email already registered');
          const newUser = { id: Date.now(), name, email, role };
          users.push(newUser);
          saveUsers(users);
          onLogin(newUser);
        };

        const handleLogin = () => {
          setError(null);
          if (!email) return setError('Email is required');
          const users = getUsers();
          const u = users.find(x => x.email === email);
          if (!u) return setError('No account found for that email');
          onLogin(u);
        };

        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">PharmaChain</h2>
              <p className="text-sm text-gray-500 mb-6">A demo IoT + Blockchain supply chain dashboard</p>

              <div className="mb-4">
                <div className="flex space-x-2 mb-3">
                  <button className={`px-3 py-1 rounded ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => setMode('login')}>Login</button>
                  <button className={`px-3 py-1 rounded ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => setMode('register')}>Create account</button>
                </div>

                {mode === 'register' && (
                  <>
                    <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
                    <select className="w-full mb-2 px-3 py-2 border rounded" value={role} onChange={e => setRole(e.target.value)}>
                      <option>Patient</option>
                      <option>Pharmacy</option>
                      <option>Distributor</option>
                      <option>Manufacturer</option>
                      <option>FDA</option>
                    </select>
                  </>
                )}

                <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

                {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

                <div className="flex items-center justify-between">
                  {mode === 'login' ? (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
                  ) : (
                    <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleRegister}>Create account</button>
                  )}
                  <div className="text-xs text-gray-500">Demo accounts stored in localStorage</div>
                </div>
              </div>
            </div>
          </div>
        );
      };

      export default App;
