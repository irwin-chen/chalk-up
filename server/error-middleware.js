const { JsonWebTokenError } = require('jsonwebtoken');
const ClientError = require('./client-error');

function errorMiddleware(err, req, res, next) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else if (err instanceof JsonWebTokenError) {
    res.status(401).json({
      error: 'Invalid access token. Please log out and sign in again.'
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'An unexpected server error has occurred! Please try again.'
    });
  }
}

module.exports = errorMiddleware;
