let Room = require('../schemas/room');
let User = require('../schemas/user');

let roomChat = async (io, data) => {

    let { msg, sender, roomId } = data

    let room = await Room.findOne({ _id : roomId })

    let msgBody = {
        message : msg,
        sender,
        sentAt : Date.now()
    }

    room.history.push(msgBody)
    await room.save()

    let user = await User.findOne({ _id : sender })

    let clientData = {
        messsage : msg,
        sender : { username : user.username, _id : sender },
        sentAt : Date.now(),
    }

    io.to(roomId).emit('room_chat(from_server)', clientData)
}


module.exports = roomChat;