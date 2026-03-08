require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log('');
      console.log('╔════════════════════════════════════════════════╗');
      console.log('║         🚀 Portfolio CMS API Server           ║');
      console.log('╠════════════════════════════════════════════════╣');
      console.log(`║  Mode:  ${process.env.NODE_ENV || 'development'}`.padEnd(49) + '║');
      console.log(`║  Port:  ${PORT}`.padEnd(49) + '║');
      console.log(`║  API:   http://localhost:${PORT}/api`.padEnd(49) + '║');
      console.log(`║  Docs:  http://localhost:${PORT}/api-docs`.padEnd(49) + '║');
      console.log('╚════════════════════════════════════════════════╝');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
