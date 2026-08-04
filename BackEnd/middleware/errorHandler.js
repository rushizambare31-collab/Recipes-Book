const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Something went wrong on the server"
  });
};

module.exports = errorHandler;