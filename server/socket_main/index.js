let privateChat = require('./private_chat');
let roomChat = require('./room_chat');
let User = require('../schemas/user');

let socketMain = async (io, socket) => {

    let userId = socket.handshake.query.id;
    socket.join(userId);

    let rooms = await User.findOne({ _id : userId }).select('rooms')

    if (rooms.rooms.length === 0) return;

    rooms.rooms.forEach(room => socket.join(room.id.toString()))

    //private chat
    socket.on('private_chat(from_client)', data => {
        privateChat(io, data);
    })

    //room chat
    socket.on('room_chat(from_client)', data => {
        roomChat(io, data);
    })
}


module.exports = socketMain;