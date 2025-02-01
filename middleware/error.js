module.exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
};

module.exports.notFound = (req, res) => {
  res.status(404).json({
    error: {
      message: 'Not Found',
      status: 404
    }
  });
};