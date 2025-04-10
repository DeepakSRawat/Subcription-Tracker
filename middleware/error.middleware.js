const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error(err);
    // mongoose bad object id
    if (err.name === "CastError") {
      let message = `Resource not found with id of ${err.value}`;
      error = new Error(message);
      error.statusCode = 404;
    }
    // mongoose duplicate key
    if (err.code === 11000) {
      let message = `Duplicate field value entered`;
      error = new Error(message);
      error.statusCode = 400;
    }
    // mongoose validation error
    if (err.name === "ValidationError") {
      let message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
