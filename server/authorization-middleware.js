const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
exports.authorizationMiddleware = function (req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    throw new ClientError(401, 'authentication required');
  }
  req.user = jwt.verify(token, process.env.TOKEN_SECRET);
  next();
};

exports.socketAuthorizationMiddleware = function (socket, next) {
  const authToken = socket.handshake.auth['x-access-token'];
  if (!authToken) {
    throw new ClientError(401, 'Authentication Required');
  }
  socket.user = jwt.verify(authToken, process.env.TOKEN_SECRET);
  next();
};
