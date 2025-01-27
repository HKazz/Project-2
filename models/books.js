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
        },
        creator:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },  status: {
            type: String,
            enum: ['to-read', 'reading', 'finished'],
            default: 'to-read'
        },
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model('Book', BookSchema)
module.exports = Book;