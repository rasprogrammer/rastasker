const successResponse = (res, status, message, result = {}) => {
    return res.status(status).json({
        success: true,
        message,
        result,
        error: null,
        errorMessage: null
    });
};

const errorResponse = (res, status, message, error = null) => {
    return res.status(status).json({
        success: false,
        message,
        result: null,
        error,
        errorMessage: message
    });
};

module.exports = {
    successResponse,
    errorResponse,
};