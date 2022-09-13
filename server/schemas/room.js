let mongoose = require('mongoose');

let memberSchema = new mongoose.Schema({
    id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

let ChatSchema = new mongoose.Schema({

    message : String,
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    sentAt : Number

}, { timestamps : true });

let RoomSchema = new mongoose.Schema({

    title : {
        type : String,
        required : [true, 'please provide room title'],
        min : [2, 'title should not be less than 2 characters'],
        max : [30, 'please provide shorter title']
    },
    admin : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    members : [memberSchema],
    history : [ChatSchema],
    avatar : String,
    description : {
        type : String,
        default : 'Welcome to my room'
    }

}, { timestamps : true });


module.exports = mongoose.model('Room', RoomSchema);