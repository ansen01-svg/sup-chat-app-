let {
    getAllUsers, getCurrentUser, uploadProfilePicture, updateUser, createRoom, addNewContact, search,
    uploadRoomAvatar, updateRoom, getAllContacts, getUserInfo, deleteContact, getAllRooms, getRoomInfo,
    getChatHistory, getRoomHistory, leaveRoom,
} = require('../controllers/users');
let auth = require('../middlewares/auth');
let router = require('express').Router();

router.route('/getAllUsers').get(auth, getAllUsers);
router.route('/getCurrentUser').get(auth, getCurrentUser);
router.route('/uploadProfilePicture').post(auth, uploadProfilePicture);
router.route('/updateUser').patch(auth, updateUser);
router.route('/createRoom').post(auth, createRoom);
router.route('/uploadRoomAvatar').post(auth, uploadRoomAvatar);
router.route('/updateRoom').patch(auth, updateRoom);
router.route('/addNewContact').patch(auth, addNewContact);
router.route('/search').get(auth, search);
router.route('/getAllContacts').get(auth, getAllContacts);
router.route('/getAllRooms').get(auth, getAllRooms);
router.route('/getUserInfo/:id').get(auth, getUserInfo);
router.route('/getRoomInfo/:id').get(auth, getRoomInfo);
router.route('/chatHistory/:id').get(auth, getChatHistory);
router.route('/roomHistory/:id').get(auth, getRoomHistory);
router.route('/deleteContact/:id').delete(auth, deleteContact);
router.route('/leaveRoom/:id').delete(auth, leaveRoom);


module.exports = router;