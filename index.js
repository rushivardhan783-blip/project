const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read data file:', err);
    return { users: [], batches: [], blockchainTransactions: [], iotReadings: [], alerts: [] };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all batches
app.get('/api/batches', (req, res) => {
  const data = readData();
  res.json(data.batches || []);
});

// GET batch by id
app.get('/api/batches/:id', (req, res) => {
  const data = readData();
  const batch = (data.batches || []).find(b => b.batchId === req.params.id);
  if (!batch) return res.status(404).json({ error: 'Batch not found' });
  res.json(batch);
});

// GET all IoT readings (optionally filter by batchId)
app.get('/api/iot-readings', (req, res) => {
  const data = readData();
  const { batchId } = req.query;
  let readings = data.iotReadings || [];
  if (batchId) readings = readings.filter(r => r.batchId === batchId);
  res.json(readings);
});

// POST a new IoT reading
app.post('/api/iot-readings', (req, res) => {
  const data = readData();
  const reading = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    batchId: req.body.batchId,
    temperature: parseFloat(req.body.temperature),
    humidity: parseFloat(req.body.humidity),
    gpsLat: parseFloat(req.body.gpsLat),
    gpsLon: parseFloat(req.body.gpsLon)
  };

  data.iotReadings.push(reading);

  // update batch latest info
  const batch = (data.batches || []).find(b => b.batchId === reading.batchId);
  if (batch) {
    batch.currentTemp = reading.temperature;
    batch.currentHumidity = reading.humidity;
    batch.gpsLat = reading.gpsLat;
    batch.gpsLon = reading.gpsLon;
  }

  // create alert if out of range
  if (reading.temperature > 25 || reading.temperature < 2) {
    const alert = {
      id: Date.now() + 1,
      batchId: reading.batchId,
      type: 'Temperature Deviation',
      severity: 'high',
      message: `Temperature out of range: ${reading.temperature}°C`,
      timestamp: new Date().toISOString(),
      resolved: false
    };
    data.alerts.push(alert);
    // record a simulated sent message (SMS) for the alert
    data.sentMessages = data.sentMessages || [];
    const msg = {
      id: Date.now() + 2,
      to: '6300839249',
      text: `ALERT for batch ${reading.batchId}: ${alert.message}`,
      timestamp: new Date().toISOString(),
      batchId: reading.batchId,
      alertId: alert.id
    };
    data.sentMessages.push(msg);
  }

  writeData(data);
  res.status(201).json(reading);
});

// GET alerts
app.get('/api/alerts', (req, res) => {
  const data = readData();
  res.json(data.alerts || []);
});

// POST resolve alert
app.post('/api/alerts/:id/resolve', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id, 10);
  const alert = (data.alerts || []).find(a => Number(a.id) === id || a.id === id);
  if (!alert) return res.status(404).json({ error: 'Alert not found' });
  alert.resolved = true;
  writeData(data);
  res.json(alert);
});

// GET sent (simulated) messages
app.get('/api/sent-messages', (req, res) => {
  const data = readData();
  res.json(data.sentMessages || []);
});

// GET transactions (optionally filter by batchId)
app.get('/api/transactions', (req, res) => {
  const data = readData();
  const { batchId } = req.query;
  let txs = data.blockchainTransactions || [];
  if (batchId) txs = txs.filter(t => t.batchId === batchId);
  res.json(txs);
});

// POST a transaction
app.post('/api/transactions', (req, res) => {
  const data = readData();
  const tx = {
    txId: `TX-0x${Math.random().toString(16).substr(2, 6)}`,
    batchId: req.body.batchId,
    from: req.body.from || 'unknown',
    to: req.body.to || 'unknown',
    timestamp: new Date().toISOString(),
    location: req.body.location || '',
    blockHash: `0x${Math.random().toString(16).substr(2, 6)}...`,
    verified: true
  };
  data.blockchainTransactions.push(tx);
  writeData(data);
  res.status(201).json(tx);
});

app.listen(PORT, () => {
  console.log(`PharmaChain backend listening on http://localhost:${PORT}`);
});
