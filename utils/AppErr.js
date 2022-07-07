"use strict";
class AppErr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.isoperational = true;
    this.status = statusCode;
    Error.captureStackTrace(this);
  }
}

module.exports = AppErr;
