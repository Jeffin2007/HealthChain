require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

let isDbConnected = false;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'HealthChain API', data: { status: 'ok' } });
});

app.get('/health', (req, res) => {
  const statusCode = isDbConnected ? 200 : 503;

  res.status(statusCode).json({
    success: isDbConnected,
    message: isDbConnected
      ? 'HealthChain API healthy'
      : 'HealthChain API running with database unavailable',
    data: {
      api: 'up',
      database: isDbConnected ? 'connected' : 'disconnected',
    },
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'HealthChain API', data: { status: 'ok' } });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || mongoUri.includes('<db_password>')) {
    console.warn(
      'MongoDB URI is missing or still using <db_password> placeholder. Update backend/.env to enable database connectivity.'
    );
  } else {
    mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
      })
      .then(() => {
        isDbConnected = true;
        console.log('MongoDB connected');
      })
      .catch((err) => {
        isDbConnected = false;
        console.error('MongoDB connection error (server still running):', err.message);
      });
  }

  mongoose.connection.on('connected', () => {
    isDbConnected = true;
  });

  mongoose.connection.on('disconnected', () => {
    isDbConnected = false;
    console.warn('MongoDB disconnected');
  });

  mongoose.connection.on('error', (err) => {
    isDbConnected = false;
    console.error('MongoDB runtime error:', err.message);
  });
});
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
