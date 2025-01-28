const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema(
    {
        listName:{
            type: String,
            required: true,
        },
        creator:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        books:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: false
        }],
    }
)

const List = mongoose.model('List', ListSchema)
module.exports = List;