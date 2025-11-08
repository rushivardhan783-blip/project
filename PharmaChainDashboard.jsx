import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
    { id: 5, role: 'Patient', name: 'John Doe', email: 'patient@email.com' }
  ],

  batches: [
    {
      batchId: 'BTCH-2024-001',
      drugName: 'Amoxicillin 500mg',
      manufacturer: 'PharmaCorp Inc',
      manufactureDate: '2024-10-15',
      expiryDate: '2026-10-15',
      quantity: 10000,
      currentLocation: 'HealthPlus Pharmacy',
      status: 'Delivered',
      currentTemp: 22.5,
      currentHumidity: 45.0,
      gpsLat: 28.6139,
      gpsLon: 77.2090
    },
    {
      batchId: 'BTCH-2024-002',
      drugName: 'Lisinopril 10mg',
      manufacturer: 'PharmaCorp Inc',
      manufactureDate: '2024-10-20',
      expiryDate: '2026-10-20',
      quantity: 5000,
      currentLocation: 'MedLog Distributors',
      status: 'In Transit',
      currentTemp: 25.8,
      currentHumidity: 50.0,
      gpsLat: 19.0760,
      gpsLon: 72.8777
    },
    {
      batchId: 'BTCH-2024-003',
      drugName: 'Metformin 850mg',
      manufacturer: 'PharmaCorp Inc',
      manufactureDate: '2024-11-01',
      expiryDate: '2026-11-01',
      quantity: 8000,
      currentLocation: 'PharmaCorp Inc',
      status: 'Manufacturing',
      currentTemp: 20.2,
      currentHumidity: 40.0,
      gpsLat: 12.9716,
      gpsLon: 77.5946
    }
    ,
    {
      batchId: 'BTCH-2024-004',
      drugName: 'Fever 500mg',
      manufacturer: 'HealthPharma Ltd',
      manufactureDate: '2024-11-05',
      expiryDate: '2026-11-05',
      quantity: 6000,
      currentLocation: 'HealthPharma Ltd',
      status: 'Manufacturing',
      currentTemp: 21.0,
      currentHumidity: 43.0,
      gpsLat: 13.0827,
      gpsLon: 80.2707
    },
    {
      batchId: 'BTCH-2024-005',
      drugName: 'Aspirin 500mg',
      manufacturer: 'Wellness Labs',
      manufactureDate: '2024-10-28',
      expiryDate: '2026-10-28',
      quantity: 12000,
      currentLocation: 'Wellness Warehouse',
      status: 'In Transit',
      currentTemp: 23.4,
      currentHumidity: 48.0,
      gpsLat: 22.5726,
      gpsLon: 88.3639
    },
    {
      batchId: 'BTCH-2024-006',
      drugName: 'Naproxen 220mg',
      manufacturer: 'Relief Pharmaceuticals',
      manufactureDate: '2024-11-02',
      expiryDate: '2026-11-02',
      quantity: 7000,
      currentLocation: 'Relief Distribution',
      status: 'Delivered',
      currentTemp: 22.0,
      currentHumidity: 46.0,
      gpsLat: 28.7041,
      gpsLon: 77.1025
    }
  ],

  blockchainTransactions: [
    {
      txId: 'TX-0x1a2b3c',
      batchId: 'BTCH-2024-001',
      from: 'Ingredient Supplier',
      to: 'PharmaCorp Inc',
      timestamp: '2024-10-15T08:30:00',
      location: 'Bangalore, India',
      blockHash: '0x7f8e9d...',
      verified: true
    },
    {
      txId: 'TX-0x2b3c4d',
      batchId: 'BTCH-2024-001',
      from: 'PharmaCorp Inc',
      to: 'MedLog Distributors',
      timestamp: '2024-10-18T14:20:00',
      location: 'Bangalore, India',
      blockHash: '0x8g9f0e...',
      verified: true
    },
    {
      txId: 'TX-0x3c4d5e',
      batchId: 'BTCH-2024-001',
      from: 'MedLog Distributors',
      to: 'HealthPlus Pharmacy',
      timestamp: '2024-10-22T10:15:00',
      location: 'Mumbai, India',
      blockHash: '0x9h0g1f...',
      verified: true
    },
    {
      txId: 'TX-0x4d5e6f',
      batchId: 'BTCH-2024-002',
      from: 'Ingredient Supplier',
      to: 'PharmaCorp Inc',
      timestamp: '2024-10-20T09:00:00',
      location: 'Bangalore, India',
      blockHash: '0xa1b2c3...',
      verified: true
    },
    {
      txId: 'TX-0x5e6f7g',
      batchId: 'BTCH-2024-002',
      from: 'PharmaCorp Inc',
      to: 'MedLog Distributors',
      timestamp: '2024-10-25T15:30:00',
      location: 'Bangalore, India',
      blockHash: '0xb2c3d4...',
      verified: true
    }
  ],

  iotReadings: [],

  alerts: [
    {
      id: 1,
      batchId: 'BTCH-2024-002',
      type: 'Temperature Deviation',
      severity: 'high',
      message: 'Temperature exceeded safe range: 25.8°C (Max: 25°C)',
      timestamp: '2024-11-05T14:23:00',
      resolved: false
    },
    {
      id: 2,
      batchId: 'BTCH-2024-001',
      type: 'Normal',
      severity: 'low',
      message: 'Delivery completed successfully',
      timestamp: '2024-10-22T16:45:00',
      resolved: true
    }
  ],

  addIoTReading: function (reading) {
    this.iotReadings.push({
      ...reading,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });

    if (reading.temperature > 25 || reading.temperature < 2) {
      this.alerts.push({
        id: Date.now(),
        batchId: reading.batchId,
        type: 'Temperature Deviation',
        severity: 'high',
        message: `Temperature out of range: ${reading.temperature}°C`,
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    const batch = this.batches.find(b => b.batchId === reading.batchId);
    if (batch) {
      batch.currentTemp = reading.temperature;
      batch.currentHumidity = reading.humidity;
      batch.gpsLat = reading.gpsLat;
      batch.gpsLon = reading.gpsLon;
    }
  },

  addTransaction: function (tx) {
    this.blockchainTransactions.push({
      ...tx,
      txId: `TX-0x${Math.random().toString(16).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      blockHash: `0x${Math.random().toString(16).substr(2, 6)}...`,
      verified: true
    });
  }
};

for (let i = 0; i < 24; i++) {
  DataStore.iotReadings.push({
    id: i,
    batchId: 'BTCH-2024-001',
    temperature: 20 + Math.random() * 5,
    humidity: 40 + Math.random() * 20,
    gpsLat: 28.6139,
    gpsLon: 77.2090,
    timestamp: new Date(Date.now() - (24 - i) * 3600000).toISOString()
  });
}

const PharmaChainDashboard = ({ initialUser, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(initialUser || DataStore.users[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(DataStore.batches[0].batchId);
  const [iotData, setIotData] = useState(DataStore.iotReadings);
  const [alerts, setAlerts] = useState(DataStore.alerts);
  const [showIoTInput, setShowIoTInput] = useState(false);
  const [newIoTReading, setNewIoTReading] = useState({
    batchId: 'BTCH-2024-001',
    temperature: 22,
    humidity: 50,
    gpsLat: 28.6139,
    gpsLon: 77.2090
  });

  useEffect(() => {
    // helper: refresh data from server if available
    const refreshFromServer = async (batchId) => {
      try {
        const base = 'http://localhost:4000/api';
        const [batchesRes, readingsRes, alertsRes] = await Promise.all([
          fetch(`${base}/batches`),
          fetch(`${base}/iot-readings${batchId ? `?batchId=${batchId}` : ''}`),
          fetch(`${base}/alerts`)
        ]);

        if (batchesRes.ok) {
          const batches = await batchesRes.json();
          DataStore.batches = batches;
        }

        if (readingsRes.ok) {
          const readings = await readingsRes.json();
          setIotData(readings);
        }

        if (alertsRes.ok) {
          const alertsData = await alertsRes.json();
          setAlerts(alertsData);
        }
      } catch (err) {
        // server not available — keep using local DataStore
        // console.warn('Could not refresh from server', err);
      }
    };

    // helper: send reading to backend which will create alerts + sentMessages
    const sendReadingToServer = async (reading) => {
      try {
        const res = await fetch('http://localhost:4000/api/iot-readings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reading)
        });
        if (res.ok || res.status === 201) {
          // refresh latest data
          await refreshFromServer(reading.batchId);
        } else {
          // if server rejected, fall back to local store
          DataStore.addIoTReading(reading);
          setIotData([...DataStore.iotReadings]);
          setAlerts([...DataStore.alerts]);
        }
      } catch (err) {
        // offline fallback
        DataStore.addIoTReading(reading);
        setIotData([...DataStore.iotReadings]);
        setAlerts([...DataStore.alerts]);
      }
    };

    // initial refresh attempt
    refreshFromServer(selectedBatch);

    const interval = setInterval(() => {
      const randomBatch = DataStore.batches[Math.floor(Math.random() * DataStore.batches.length)];
      const newReading = {
        batchId: randomBatch.batchId,
        temperature: 20 + Math.random() * 6,
        humidity: 40 + Math.random() * 20,
        // use the batch's reported coordinates for exact/live location
        gpsLat: randomBatch.gpsLat,
        gpsLon: randomBatch.gpsLon
      };

      // send to server (or fall back internally)
      sendReadingToServer(newReading);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleManualIoTInput = () => {
    // try to send to backend which will create alerts and sentMessages
    (async () => {
      try {
        const res = await fetch('http://localhost:4000/api/iot-readings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newIoTReading)
        });
        if (res.ok || res.status === 201) {
          // refresh readings/alerts from server
          const alertsRes = await fetch('http://localhost:4000/api/alerts');
          const readingsRes = await fetch(`http://localhost:4000/api/iot-readings?batchId=${newIoTReading.batchId}`);
          if (alertsRes.ok) setAlerts(await alertsRes.json());
          if (readingsRes.ok) setIotData(await readingsRes.json());
        } else {
          // fallback
          DataStore.addIoTReading(newIoTReading);
          setIotData([...DataStore.iotReadings]);
          setAlerts([...DataStore.alerts]);
        }
      } catch (err) {
        DataStore.addIoTReading(newIoTReading);
        setIotData([...DataStore.iotReadings]);
        setAlerts([...DataStore.alerts]);
      }
      setShowIoTInput(false);
    })();
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setNewIoTReading(r => ({ ...r, gpsLat: latitude, gpsLon: longitude }));
      },
      (err) => {
        alert('Unable to retrieve your location: ' + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const resolveAlert = async (alertId) => {
    // optimistically update UI
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
    try {
      const res = await fetch(`http://localhost:4000/api/alerts/${alertId}/resolve`, { method: 'POST' });
      if (res.ok) {
        const updated = await res.json();
        // refresh alerts from server to keep in sync
        const alertsRes = await fetch('http://localhost:4000/api/alerts');
        if (alertsRes.ok) setAlerts(await alertsRes.json());
      } else {
        // server rejected, fallback: revert or keep optimistic change
        // we'll try to read server alerts
        const alertsRes = await fetch('http://localhost:4000/api/alerts');
        if (alertsRes.ok) setAlerts(await alertsRes.json());
      }
    } catch (err) {
      // server unreachable: apply to local DataStore
      const idx = DataStore.alerts.findIndex(a => a.id === alertId);
      if (idx >= 0) DataStore.alerts[idx].resolved = true;
      setAlerts([...DataStore.alerts]);
    }
  };

  const filteredBatches = DataStore.batches.filter(batch =>
    batch.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedBatchData = DataStore.batches.find(b => b.batchId === selectedBatch);
  const batchIoTData = iotData.filter(r => r.batchId === selectedBatch).slice(-24);
  const batchTransactions = DataStore.blockchainTransactions.filter(t => t.batchId === selectedBatch);

  // use the latest IoT reading for live location if available
  const latestReading = batchIoTData.length ? batchIoTData[batchIoTData.length - 1] : null;

  const chartData = batchIoTData.map(reading => ({
    time: new Date(reading.timestamp).toLocaleTimeString(),
    temperature: parseFloat(reading.temperature.toFixed(1)),
    humidity: parseFloat(reading.humidity.toFixed(1))
  }));

  const statusData = DataStore.batches.reduce((acc, batch) => {
    acc[batch.status] = (acc[batch.status] || 0) + 1;
    return acc;
  }, {});

  const statusChartData = Object.keys(statusData).map(status => ({
    status,
    count: statusData[status]
  }));

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];
  const deliveredCount = statusData['Delivered'] || 0;
  const totalBatches = DataStore.batches.length || 1;
  const deliveredPercent = Math.round((deliveredCount / totalBatches) * 100);

  const avgTemp = batchIoTData.length ? (batchIoTData.reduce((sum, r) => sum + r.temperature, 0) / batchIoTData.length).toFixed(1) : '—';
  const avgHumidity = batchIoTData.length ? (batchIoTData.reduce((sum, r) => sum + r.humidity, 0) / batchIoTData.length).toFixed(1) : '—';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">PharmaChain</h1>
                <p className="text-sm text-blue-100">IoT & Blockchain Supply Chain</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold">{currentUser.name}</p>
                <p className="text-xs text-blue-100">{currentUser.role}</p>
              </div>
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const u = DataStore.users.find(u => u.id === parseInt(e.target.value));
                  if (u) setCurrentUser(u);
                }}
                className="bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
              >
                {DataStore.users.map(user => (
                  <option key={user.id} value={user.id}>{user.role}</option>
                ))}
              </select>
              <button
                onClick={() => onLogout && onLogout()}
                className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {['overview', 'iot-monitoring', 'blockchain', 'alerts', 'analytics'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Batches</p>
                    <p className="text-3xl font-bold text-gray-800">{DataStore.batches.length}</p>
                  </div>
                  <Package className="w-12 h-12 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Alerts</p>
                    <p className="text-3xl font-bold text-red-600">{alerts.filter(a => !a.resolved).length}</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">In Transit</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {DataStore.batches.filter(b => b.status === 'In Transit').length}
                    </p>
                  </div>
                  <Activity className="w-12 h-12 text-orange-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Blockchain TXs</p>
                    <p className="text-3xl font-bold text-green-600">{DataStore.blockchainTransactions.length}</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Batch ID, Drug Name, Manufacturer, or Status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Drug Batches</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Batch ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Drug Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Manufacturer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Current Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Temp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBatches.map(batch => (
                      <tr
                        key={batch.batchId}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedBatch(batch.batchId);
                          setActiveTab('iot-monitoring');
                        }}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{batch.batchId}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{batch.drugName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{batch.manufacturer}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{batch.currentLocation}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            batch.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            batch.status === 'In Transit' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {batch.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${
                            batch.currentTemp > 25 || batch.currentTemp < 2 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {batch.currentTemp.toFixed(1)}°C
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'iot-monitoring' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">IoT Sensor Monitoring</h2>
                <button
                  onClick={() => setShowIoTInput(!showIoTInput)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Manual Input
                </button>
              </div>

              {showIoTInput && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-semibold mb-3">Simulate IoT Reading</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <select
                      value={newIoTReading.batchId}
                      onChange={(e) => setNewIoTReading({...newIoTReading, batchId: e.target.value})}
                      className="px-3 py-2 border rounded"
                    >
                      {DataStore.batches.map(b => (
                        <option key={b.batchId} value={b.batchId}>{b.batchId}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Temp (°C)"
                      value={newIoTReading.temperature}
                      onChange={(e) => setNewIoTReading({...newIoTReading, temperature: parseFloat(e.target.value)})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Humidity (%)"
                      value={newIoTReading.humidity}
                      onChange={(e) => setNewIoTReading({...newIoTReading, humidity: parseFloat(e.target.value)})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Latitude"
                      value={newIoTReading.gpsLat}
                      onChange={(e) => setNewIoTReading({...newIoTReading, gpsLat: parseFloat(e.target.value)})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Longitude"
                      value={newIoTReading.gpsLon}
                      onChange={(e) => setNewIoTReading({...newIoTReading, gpsLon: parseFloat(e.target.value)})}
                      className="px-3 py-2 border rounded"
                    />
                    <button
                      onClick={useMyLocation}
                      className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 mr-2"
                      title="Use browser geolocation"
                    >
                      Use my location
                    </button>
                    <button
                      onClick={handleManualIoTInput}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Batch</label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full md:w-auto"
                >
                  {DataStore.batches.map(batch => (
                    <option key={batch.batchId} value={batch.batchId}>
                      {batch.batchId} - {batch.drugName}
                    </option>
                  ))}
                </select>
              </div>

              {selectedBatchData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Thermometer className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Temperature</p>
                        <p className={`text-2xl font-bold ${
                          selectedBatchData.currentTemp > 25 || selectedBatchData.currentTemp < 2
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}>
                          {selectedBatchData.currentTemp.toFixed(1)}°C
                        </p>
                        <p className="text-xs text-gray-500">Range: 2-25°C</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Humidity</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {selectedBatchData.currentHumidity.toFixed(1)} %
                        </p>
                        <p className="text-xs text-gray-500">Normal: 40-60 %</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">GPS Location</p>
                        <p className="text-sm font-bold text-green-600">
                          {/* show live location if we have a recent reading */}
                          {latestReading ? (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${parseFloat(latestReading.gpsLat)},${parseFloat(latestReading.gpsLon)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open location in Google Maps (live)"
                              className="hover:underline"
                            >
                              {parseFloat(latestReading.gpsLat).toFixed(6)}, {parseFloat(latestReading.gpsLon).toFixed(6)}
                              <span className="ml-2 text-xs text-gray-500">(live)</span>
                            </a>
                          ) : (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${selectedBatchData.gpsLat},${selectedBatchData.gpsLon}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open location in Google Maps"
                              className="hover:underline"
                            >
                              {selectedBatchData.gpsLat.toFixed(6)}, {selectedBatchData.gpsLon.toFixed(6)}
                            </a>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">{selectedBatchData.currentLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Real-time Sensor Data</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left">Timestamp</th>
                        <th className="px-4 py-2 text-left">Temperature</th>
                        <th className="px-4 py-2 text-left">Humidity</th>
                        <th className="px-4 py-2 text-left">GPS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batchIoTData.slice(-10).reverse().map(reading => (
                        <tr key={reading.id} className="border-b">
                          <td className="px-4 py-2">{new Date(reading.timestamp).toLocaleString()}</td>
                          <td className={`px-4 py-2 font-medium ${
                            reading.temperature > 25 || reading.temperature < 2 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {reading.temperature.toFixed(1)}°C
                          </td>
                          <td className="px-4 py-2">{reading.humidity.toFixed(1)} %</td>
                          <td className="px-4 py-2 text-xs">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${reading.gpsLat},${reading.gpsLon}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open reading location in Google Maps"
                              className="text-xs hover:underline"
                            >
                              {reading.gpsLat.toFixed(6)}, {reading.gpsLon.toFixed(6)}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Blockchain Transaction Ledger</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Batch</label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full md:w-auto"
                >
                  {DataStore.batches.map(batch => (
                    <option key={batch.batchId} value={batch.batchId}>
                      {batch.batchId} - {batch.drugName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">Supply Chain Journey</h3>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-300"></div>
                  {batchTransactions.map((tx, index) => (
                    <div key={tx.txId} className="relative pl-16 pb-8">
                      <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-gray-800">{tx.from}</span>
                              <span className="text-gray-400">→</span>
                              <span className="font-semibold text-blue-600">{tx.to}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(tx.timestamp).toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{tx.location}</span>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              <div>TX: {tx.txId}</div>
                              <div>Block: {tx.blockHash}</div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              ✓ Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">All Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left">TX ID</th>
                        <th className="px-4 py-2 text-left">From</th>
                        <th className="px-4 py-2 text-left">To</th>
                        <th className="px-4 py-2 text-left">Timestamp</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batchTransactions.map(tx => (
                        <tr key={tx.txId} className="border-b">
                          <td className="px-4 py-2 font-mono text-xs text-blue-600">{tx.txId}</td>
                          <td className="px-4 py-2">{tx.from}</td>
                          <td className="px-4 py-2">{tx.to}</td>
                          <td className="px-4 py-2">{new Date(tx.timestamp).toLocaleString()}</td>
                          <td className="px-4 py-2">{tx.location}</td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              Verified
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Alerts</h2>

              <div className="space-y-3">
                {alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high'
                        ? 'bg-red-50 border-red-500'
                        : alert.severity === 'medium'
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-green-50 border-green-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle
                            className={`w-5 h-5 ${
                              alert.severity === 'high'
                                ? 'text-red-600'
                                : alert.severity === 'medium'
                                ? 'text-yellow-600'
                                : 'text-green-600'
                            }`}
                          />
                          <span className="font-semibold text-gray-800">{alert.type}</span>
                          <span className="text-xs text-gray-500">({alert.batchId})</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        {alert.resolved ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Resolved
                          </span>
                        ) : (
                          <button
                            onClick={() => resolveAlert(alert.id)}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium cursor-pointer hover:bg-red-200"
                            title="Mark alert as resolved"
                          >
                            Active
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Critical Alerts</h3>
                <p className="text-3xl font-bold text-red-600">
                  {alerts.filter(a => a.severity === 'high' && !a.resolved).length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Warnings</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {alerts.filter(a => a.severity === 'medium' && !a.resolved).length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Resolved</h3>
                <p className="text-3xl font-bold text-green-600">
                  {alerts.filter(a => a.resolved).length}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Temperature Trends</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Batch</label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full md:w-auto"
                >
                  {DataStore.batches.map(batch => (
                    <option key={batch.batchId} value={batch.batchId}>
                      {batch.batchId} - {batch.drugName}
                    </option>
                  ))}
                </select>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temperature" stroke="#3b82f6" name="Temperature (°C)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Humidity Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="humidity" stroke="#8b5cf6" name="Humidity (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Status Distribution</h2>
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4">
                <div className="flex-1 flex items-center justify-center p-4">
                  {/* Analog semicircle gauge showing Delivered % */}
                  <div className="w-full max-w-xs">
                    <svg viewBox="0 0 200 120" className="w-full h-auto">
                      {/* background semicircle */}
                      <path d="M10 110 A90 90 0 0 1 190 110" stroke="#e5e7eb" strokeWidth="14" fill="none" strokeLinecap="round" />
                      {/* needle */}
                      {
                        (() => {
                          const angle = -90 + (deliveredPercent * 1.8); // -90..90
                          return (
                            <g transform={`rotate(${angle} 100 110)`}>
                              <line x1="100" y1="110" x2="100" y2="38" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                              <circle cx="100" cy="110" r="6" fill="#111827" />
                            </g>
                          );
                        })()
                      }
                    </svg>
                    <div className="text-center mt-2">
                      <p className="text-sm text-gray-600">Delivered</p>
                      <p className="text-2xl font-bold text-green-600">{deliveredPercent}%</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-2">
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={statusChartData} dataKey="count" nameKey="status" innerRadius={60} outerRadius={100} label>
                        {statusChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Avg Temperature</h3>
                <p className="text-3xl font-bold text-blue-600">{avgTemp}°C</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Avg Humidity</h3>
                <p className="text-3xl font-bold text-purple-600">{avgHumidity} %</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Data Points</h3>
                <p className="text-3xl font-bold text-green-600">{batchIoTData.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmaChainDashboard;
