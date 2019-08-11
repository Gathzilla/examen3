const mongoose = require('mongoose');

const ShoeSchema = mongoose.Schema({
    name: String,
    gender: String,
    brand: String,
    model: String,
    price: Number,
    barcode: Number,
    size: Number,
    code: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Shoe', ShoeSchema);