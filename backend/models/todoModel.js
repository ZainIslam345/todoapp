const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            required: [true, 'please add a text value'],
        },
        completed: {
            type: Boolean,
        }
    }
    ,
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('todo',todoSchema);