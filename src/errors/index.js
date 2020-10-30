const errorhandler = require('errorhandler')

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).json({ error: "Something failed!" });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
}

function configureErrorHandlers(app) {
  if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorhandler());
  }

  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);
}

module.exports = configureErrorHandlers;
