/**
 * Custom logging middleware
 * Logs method, URL, status code, and response time
 */
const logger = (req, res, next) => {
  const start = Date.now();

  // Store original end method
  const originalEnd = res.end;

  res.end = function (...args) {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const statusColor =
      res.statusCode >= 500
        ? '\x1b[31m' // red
        : res.statusCode >= 400
        ? '\x1b[33m' // yellow
        : res.statusCode >= 300
        ? '\x1b[36m' // cyan
        : '\x1b[32m'; // green

    console.log(
      `${timestamp} | ${req.method.padEnd(7)} | ${statusColor}${res.statusCode}\x1b[0m | ${duration}ms | ${req.originalUrl}`
    );

    originalEnd.apply(res, args);
  };

  next();
};

module.exports = logger;
