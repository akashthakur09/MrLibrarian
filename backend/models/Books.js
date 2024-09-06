const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name:{ 
        type: String, 
        required: true 
    },
    category:{ 
        type: String, 
        required: true 
    },
    rentPerDay:{ 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.model('Book', BookSchema);
