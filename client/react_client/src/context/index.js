import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

let AppContext = React.createContext();

let Context = ({ children }) => {
    
    let [showRestHolder, setShowRestHolder] = useState(true)
    let [showLogoutModal, setShowLogoutModal] = useState(false)
    let [showNewGroup, setShowNewGroup] = useState(false)
    let [showNewContact, setShowNewContact] = useState(false)
    let [showProfileModal, setShowProfileModal] = useState(false)
    let [showSearchModal, setShowSearchModal] = useState(false)

    let [showNavModal, setShowNavModal] = useState(false)
    let [showHistoryNavModal, setShowHistoryNavModal] = useState(false)

    let [currentUser, setCurrentUser] = useState(null)
    let [myContacts, setMyContacts] = useState(null)
    let [myRooms, setMyRooms] = useState(null)
    let [searchResults, setSearchResults] = useState([])
    let [contacts, setContacts] = useState(true)

    let [myFriend, setMyFriend] = useState('')
    let [myRoom, setMyRoom] = useState('')
    let [chatHistory, setChatHistory] = useState(null)
    let [roomHistory, setRoomHistory] = useState(null)
    let [showChatHistory, setShowChatHistory] = useState(false)
    let [showRoomHistory, setShowRoomHistory] = useState(false)
    let [foreignUser, setForeignUser] = useState(null)
    let [currentRoom, setCurrentRoom] = useState(null)

    useEffect(() => {
        if (!myFriend) return;

        getForeignUser(myFriend)
        getChatHistory(myFriend)

        return () => {
            setForeignUser(null)
            setChatHistory(null)
        }
    }, [myFriend])

    useEffect(() => {
        if (!myRoom) return;

        getCurrentRoom(myRoom)
        getRoomHistory(myRoom)

        return () => {
            setCurrentRoom(null)
            setRoomHistory(null)
        }
    }, [myRoom])

    let getUser = async () => {
        try {
            let { data } = await axios.get('/apis/v1/users/getCurrentUser')
            setCurrentUser(data.user)
        } catch (error) {
            console.log(error)
        }
    }

    let getMyContacts = async () => {
        try {
            let { data } = await axios.get('/apis/v1/users/getAllContacts')
            setMyContacts(data.contacts.contacts)
        } catch (error) {
            console.log(error)
        }
    }

    let getMyRooms = async () => {
        try {
            let { data } = await axios.get('/apis/v1/users/getAllRooms')
            setMyRooms(data.rooms.rooms)
        } catch (error) {
            console.log(error)
        }
    }

    let getChatHistory = async (id) => {
        try {
            let { data } = await axios.get(`/apis/v1/users/chatHistory/${id}`)
            setTimeout(() => setChatHistory(data), 1500)
            // setChatHistory(data)
        } catch (error) {
            console.log(error)
        }
    }

    let getRoomHistory = async (id) => {
        try {
            let { data } = await axios.get(`/apis/v1/users/roomHistory/${id}`)
            setRoomHistory(data)
        } catch (error) {
            console.log(error)
        }
    }

    let getForeignUser = async (id) => {
        try {
            let { data } = await axios.get(`/apis/v1/users/getUserInfo/${id}`)
            setForeignUser(data.user)
        } catch (error) {
            console.log(error)
        }
    }

    let getCurrentRoom = async (id) => {
        try {
            let { data } = await axios.get(`/apis/v1/users/getRoomInfo/${id}`)
            setCurrentRoom(data.room)
        } catch (error) {
            console.log(error)
        }
    }

    let logoutUser = async () => {
        try {
            await axios.delete('/apis/v1/auth/logout')

            let expiry = new Date(Date.now() - 60 * 60 * 24).toUTCString()

            document.cookie = `domCookie(sup)=; expires=${expiry}`
            setCurrentUser(null)
            setMyContacts(null)
            setMyRooms(null)
            setMyFriend('')
            setMyRoom('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppContext.Provider
        value={{ getUser, currentUser, setCurrentUser, showRestHolder, showNewContact, showNewGroup,
        setShowRestHolder, setShowNewGroup, setShowNewContact, searchResults, setSearchResults,
        showNavModal, setShowNavModal, showProfileModal, setShowProfileModal, showSearchModal,
        setShowSearchModal, logoutUser, showLogoutModal, setShowLogoutModal, contacts,
        setContacts, myContacts, myRooms, getMyContacts, getMyRooms, myFriend, setMyFriend,
        chatHistory, getChatHistory, roomHistory, getRoomHistory, myRoom, setMyRoom,
        showChatHistory, setShowChatHistory, showRoomHistory, setShowRoomHistory, getForeignUser,
        foreignUser, showHistoryNavModal, setShowHistoryNavModal, currentRoom, setChatHistory,
        setRoomHistory, setForeignUser, }} >
            { children }
        </AppContext.Provider>
    )
}

export let useMyContext = () => {
    return useContext(AppContext);
}


export default Context;