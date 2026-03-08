/**
 * Standard API response helper
 */
const apiResponse = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const paginatedResponse = (res, statusCode, data, pagination, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    count: data.length,
    pagination,
    data,
  });
};

module.exports = { apiResponse, paginatedResponse };
