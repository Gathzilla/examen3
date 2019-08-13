const mongoose = require('mongoose');

const DressSchema = mongoose.Schema({    
    color: String,
    brand: String,
    price: Number,
    barcode: Number,
    size: Number,
    code: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Dress', DressSchema);