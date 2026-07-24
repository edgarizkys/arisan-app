const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const { initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Mount API Routes
app.use('/api', apiRoutes);

// Fallback index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

initializeDatabase().then(() => {
    app.listen(PORT, () => console.log(`🚀 Enterprise Suite Arisan running on port ${PORT}`));
});

module.exports = app;
