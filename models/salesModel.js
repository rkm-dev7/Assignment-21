const {Schema, model} = require('mongoose');

const salesSchema = new Schema({
    product: String,
    quantity: Number,
    price: Number,
    date: {
    type: Date,
    default: new Date().toISOString(),
}},
{versionKey : false})

const Sales = model('Sales', salesSchema)

module.exports = {
    Sales
}