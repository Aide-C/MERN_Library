const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    author: {
        type: String, 
        required: true
    },
    publisher: { 
        type: String, 
        required: true 
    },
    isbn: { 
        type: String, 
        required: true 
    },
    avail: { 
        type: Boolean, 
        required: true 
    },
    who: { 
        type: String, 
        default: '' 
    },
    due: { 
        type: String, 
        default: ''
    }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
