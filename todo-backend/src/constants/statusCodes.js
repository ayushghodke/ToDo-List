const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

const STATUS_MESSAGE = {
  200: 'Success',
  201: 'Created Successfully',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized Access',
  403: 'Forbidden Access',
  404: 'Resource Not Found',
  405: 'Method Not Allowed',
  409: 'Resource Conflict',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  503: 'Service Unavailable'
};

module.exports = {
  STATUS,
  STATUS_MESSAGE,
}; 