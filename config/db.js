const mongoose = require('mongoose');
const { databaseUrl } = require('../secret');
const createError = require('http-errors');

const databaseConnect = async () => {
    try {
        await mongoose.connect(databaseUrl)
        console.log('Databse are Connected');
    } catch (error) {
        throw createError(400, "Database Connection Problem...")
    }
}

module.exports = {
    databaseConnect
}