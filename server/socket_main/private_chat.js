let Chat = require('../schemas/chat');
let User = require('../schemas/user');

let privateChat = async (io, clientData) => {

    let { senderId, recieverId, text } = clientData 

    let chat = await Chat.findOne({ users : { $all : [senderId, recieverId] } })
    let user = await User.findOne({ _id : senderId }).select('username')

    //for a new chat
    if (!chat) {
        let users = [senderId, recieverId]
        let history = [
            {
                sender : senderId,
                message : text,
                sentAt : Date.now()
            }
        ]

        await Chat.create({ users, history })

        let data = {
            message : text,
            sentAt : Date.now(),
            sender :  user,
        }
        io.to(recieverId).emit('private_chat(from_server)', data);
        io.to(senderId).emit('private_chat(from_server)', data);
        return;
    }

    //for existing chat
    let messageBody = {
        sender : senderId,
        message : text,
        sentAt : Date.now()
    }
    chat.history.push(messageBody)
    await chat.save()

    let data = {
        message  :text,
        sentAt : Date.now(),
        sender :  user,
    }
    io.to(recieverId).emit('private_chat(from_server)', data);
    io.to(senderId).emit('private_chat(from_server)', data);
}


module.exports = privateChat;