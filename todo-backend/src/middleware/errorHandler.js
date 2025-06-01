const { STATUS, STATUS_MESSAGE } = require('../constants/statusCodes');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Handle specific database errors
  if (err.code === '23502') { // not-null violation
    return res.status(STATUS.BAD_REQUEST).json({
      status: STATUS.BAD_REQUEST,
      message: STATUS_MESSAGE[STATUS.BAD_REQUEST],
      error: 'Required field is missing'
    });
  }
  if (err.code === '22P02') { // invalid input syntax
    return res.status(STATUS.BAD_REQUEST).json({
      status: STATUS.BAD_REQUEST,
      message: STATUS_MESSAGE[STATUS.BAD_REQUEST],
      error: 'Invalid input data'
    });
  }

  // Default error
  res.status(STATUS.INTERNAL_SERVER_ERROR).json({
    status: STATUS.INTERNAL_SERVER_ERROR,
    message: STATUS_MESSAGE[STATUS.INTERNAL_SERVER_ERROR],
    error: 'Internal server error'
  });
};

module.exports = errorHandler; 