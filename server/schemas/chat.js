let mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
    users : {
        type : Array,
        required : true,
    },
    history : [
        {
            sender : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
            },
            message : {
                type : String,
                required : true
            },
            sentAt : {
                type : Number,
                required : true
            }
        }
    ]
}, { timestamps : true });


module.exports = mongoose.model('Chat', chatSchema);