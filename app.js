const express = require('express');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const morgan = require('morgan');
const createError = require('http-errors');
const limit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');

const { errorResponse, successResponse } = require('./controller/responseController');
const { seedRouter } = require('./routes/seedRouter');
const { salesRouter } = require('./routes/salesRouter');

const app = express();

// built/security/third-party middlware implements 
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(hpp());

// express rate limiter 
const limiter = limit({
    windowMs : 1 * 60 * 1000,
    max : 25,
    message : "Too many attempst from this IP, please try again after one minute"
});
app.use(limiter);

// simple api test 
app.get('/', (req, res, next) => {
    try {
        successResponse(res, {
            statusCode : 200,
            message : res.message,
            payload : { },
        }); 
    } catch (error) {
        next(error)
    }
})

// router implements 
app.use('/api/seed', seedRouter);
app.use('/api/v1', salesRouter)

// client error 
app.use((req, res, next) => {
    next(createError(404, "Route Not Found"));
});

// server error & all error 
app.use((err, req, res, next) => {
     errorResponse(res, {
        statusCode : err.status,
        message : err.message
    });
});

module.exports = {
    app
}
