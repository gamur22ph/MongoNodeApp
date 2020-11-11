const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    cost: {
        type: Number
    }
});

module.exports = mongoose.model('Products', ProductsSchema);