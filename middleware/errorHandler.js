const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = statusCode === 500 ? "Internal Server Error" : err.message;

  // Handle duplicate key error (MongoDB E11000)
  if (err.code === 11000) {
    err.type = "ConflictError";
    statusCode = 409;
    message = "The resource already exists.";
  }

  console.log("error.message >>> ", err.message);

  res.status(statusCode).json({
    error: {
      type: err.type || "ServerError",
      message,
    },
  });
};

export default errorHandler;
