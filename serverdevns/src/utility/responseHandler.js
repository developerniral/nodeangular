const createSuccessResponse = (data = null, message = 'ok') => {
    return {
      success: true,
      message: message,
      data,
    };
  };

  const createErrorResponse = ( message = 'Internal Server Error',data = null) => {
    return {
      success: false,
      message: message,
      data,
    };
  };
  
  module.exports = {createSuccessResponse, createErrorResponse};