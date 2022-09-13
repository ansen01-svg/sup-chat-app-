let cloudinary = require('cloudinary').v2;
let fs = require('fs');
let User = require('../schemas/user');
let Room = require('../schemas/room');
let Chat = require('../schemas/chat');
let { BadRequest } = require('../errors');

let getAllUsers = async (req, res) => {
    let users = await User.find({});

    res.status(200).json({ users });
}

let getCurrentUser = async (req, res) => {
    let user = await User.findOne({ _id : req.user.id }).select('_id username about profile_picture');

    res.status(200).json({ user });
}

let uploadProfilePicture = async (req, res) => {
    let image = req.files.image

    let result = await cloudinary.uploader.upload(image.tempFilePath, {
        use_filename : true,
        folder : 'Sup'
    });
    fs.unlinkSync(image.tempFilePath);

    res.status(201).json({ src : result.secure_url })
}

let updateUser = async (req, res) => {
    let { profile_picture, username, about } = req.query

    let user = await User.findOne({ _id : req.user.id });

    if (profile_picture) {
        user.profile_picture = profile_picture
    } else if (username) {
        user.username = username
    } else {
        user.about = about
    }
    await user.save();

    res.status(200).json({ msg : 'your profile has been updated' })
}

let createRoom = async (req, res) => {
    let { title, members } = req.body

    if (!title || !members) {
        throw new BadRequest(`Please provide title and users`)
    }

    let mockedMembers = members.map(userId => {
        return { id : userId };
    })

    let newRoom = await Room.create({ title, members : mockedMembers, admin : req.user.id })

    members.forEach(async (userId) => {
        let user = await User.findOne({ _id : userId })

        let room = { id : newRoom._id }
        user.rooms.push(room)
        await user.save()
    })

    let admin = await User.findOne({ _id : req.user.id })

    let room = { id : newRoom._id }
    admin.rooms.push(room)
    await admin.save()
    
    res.status(201).json({ msg : `A new room has been created` })
}

let addNewContact = async (req, res) => {
    let { username } = req.query

    if (!username) {
        throw new BadRequest(`Please provide username to add`)
    }

    if (username === req.user.user) {
        throw new BadRequest(`This operation cannot be performed`)
    }

    let user = await User.findOne({ username })

    if (!user) {
        throw new BadRequest(`No user found`)
    }

    let currentUser = await User.findOne({ _id : req.user.id })
    let contactToAdd = currentUser.contacts.find(myContact => myContact.id.toString() === user._id.toString() ) 

    if (contactToAdd) {
        throw new BadRequest(`This user already exist in your contacts`)
    }
    
    let contact = { id : user._id }

    currentUser.contacts.push(contact)
    await currentUser.save();

    res.status(201).json({ msg : `new contact added ` })
}

let search = async (req, res) => {
    let { term } = req.query;

    let users = await User.find({ username : { $ne : req.user.user, $regex : term, $options : 'i' } })
    .select('profile_picture username about _id')

    let currentUser = await User.findOne({ _id : req.user.id })
    currentUser.search_history.push(term)
    await currentUser.save()

    res.status(200).json({ users })
}

let uploadRoomAvatar = async (req, res) => {
    let image = req.files.image

    let result = await cloudinary.uploader.upload(image.tempFilePath, {
        use_filename : true,
        folder : 'Sup'
    });
    fs.unlinkSync(image.tempFilePath);

    res.status(201).json({ src : result.secure_url })
}

let updateRoom = async (req,res) => {
    let { avatar, title, description, roomId } = req.query

    let room = await Room.findOne({ _id : roomId })

    if (req.user.id !== room.admin.toString()) {
        throw new BadRequest(`This action cannot be performed`);
    }

    if (avatar) {
        room.avatar = avatar
    } else if (title) {
        room.title = title
    } else {
        room.description = description
    }
    await room.save()

    res.status(200).json({ msg : `${room.title} details has been updated` })
}

let getAllContacts = async (req, res) => {
    let contacts = await User.findOne({ _id : req.user.id }).select('contacts')
    .populate({ path : 'contacts', populate : { path : 'id', select : '_id username about profile_picture' }})

    res.status(200).json({ contacts })
}

let getAllRooms = async (req, res) => {
    let rooms = await User.findOne({ _id : req.user.id }).select('rooms')
    .populate({ path : 'rooms', populate : { path : 'id', select : '_id title avatar description' } })

    res.status(200).json({ rooms })
}

let getUserInfo = async (req, res) => {
    let { id } = req.params

    let user = await User.findOne({ _id : id }).select(['profile_picture', 'username', 'about'])

    res.status(200).json({ user })
}

let getRoomInfo = async (req, res) => {
    let { id } = req.params

    let room = await Room.findOne({ _id : id }).select(['avatar', 'title', 'description', 'members', 'admin'])
                .populate({ path : 'admin', select : 'username' })

    res.status(200).json({ room })
} 

let  deleteContact = async (req, res) => {
    let { id } = req.params

    let user = await User.findOne({ _id : req.user.id })
    
    let newContacts = user.contacts.filter(contact => contact.id.toString() !== id)

    user.contacts = newContacts
    await user.save()

    res.status(200).json({ msg : `contact has been deleted` })
}

let leaveRoom = async (req, res) => {
    let { id } = req.params

    let user = await User.findOne({ _id : req.user.id })
    
    let newRooms = user.rooms.filter(room => room.id.toString() !== id)

    user.rooms = newRooms
    await user.save()

    res.status(200).json({ msg : `left room successfully` })
}

let getChatHistory = async (req, res) => {
    let { id } = req.params;

    let chat = await Chat.findOne({ users : { $all : [req.user.id, id] } }).select('history')
                        .populate({ path : 'history', populate : { path : 'sender', select : ['username', '_id'] } });
    
    if (!chat) {
        res.status(200).json({ history : { history : [] }, name : 'chatHistory' }) 
        return;
    }
                    
    res.status(200).json({ history : chat, name : 'chatHistory' }) 
}

let getRoomHistory = async (req, res) => {
    let { id } = req.params;

    let history = await Room.findOne({ _id : id }).select('history')
                .populate({ path : 'history', populate : { path : 'sender', select : 'username _id' } }); 

    res.status(200).json({ history, name : 'roomHistory' })
}


module.exports = {
    getAllUsers, getCurrentUser, uploadProfilePicture, updateUser, createRoom, addNewContact, search,
    uploadRoomAvatar, updateRoom, getAllContacts, getUserInfo, deleteContact, getAllRooms, getRoomInfo,
    getChatHistory, getRoomHistory, leaveRoom
}