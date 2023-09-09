const errorResponse = (res, {statusCode = 500, message = "Internel Server Error"}) => {
    res.status(statusCode).json({
        status : false,
        message
    })
}

const successResponse = (res, {statusCode = 200, message = "Success", payload = {}}) => {
    res.status(statusCode).json({
        status : true,
        message,
        payload
    })
}

module.exports = {
    errorResponse,
    successResponse
}