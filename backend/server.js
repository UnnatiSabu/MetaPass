const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

// Route imports
const riskRoutes = require('./routes/risk');
const logRoutes = require('./routes/log');
const scoreRoutes = require('./routes/score');
const malwareRoutes = require('./routes/malware');
const adminRoutes = require('./routes/admin');
const feedbackRoutes = require('./routes/feedback');
const privacyRoutes = require('./routes/privacy');
const statsRoutes = require('./routes/statsRoutes'); // Optional: Android Stats

// Utils
const cleanupOldData = require('./utils/cleanup');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/metapass';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));


// Serve static files (e.g., dashboard)
app.use(express.static('public'));

// Routes
app.use('/api/risk', riskRoutes);
app.use('/api/log', logRoutes);
app.use('/api/score', scoreRoutes);
app.use('/api/malware', malwareRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/stats', statsRoutes); // Optional route

// Health check
app.get('/', (req, res) => {
  res.send('🌐 Privacy Monitoring Backend is Live with 🧠 Mistral-powered Features!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Uncaught Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});
// pseudo code
let summaryData = {};

app.post('/summary', (req, res) => {
  summaryData = req.body;
  res.status(200).send({ message: 'Summary updated' });
});

app.get('/summary', (req, res) => {
  res.json(summaryData);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Schedule cleanup task every 24 hours
setInterval(cleanupOldData, 24 * 60 * 60 * 1000);

// Export app for testing or integration
module.exports = app;