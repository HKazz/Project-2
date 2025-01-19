const mongoose = require('mongoose')

const BookSchema = mongoose.Schema(
    {
        bookName: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            default: 'Unknown'
        }
    },{
        timestamps: true
    }
)

const Book = mongoose.model('Book', BookSchema)
module.exports = Book;