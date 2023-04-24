import styled from 'styled-components';
import { BiUser } from "react-icons/bi";
import { useMyContext } from '../../context';
import UsersComponent from '../../components/users_and_rooms';

let RestDisplay = () => {

    let { contacts, myContacts, myRooms, setShowRestHolder, setMyFriend, setMyRoom,
    getChatHistory, getRoomHistory, setShowChatHistory, setShowRoomHistory, } = useMyContext();

    let selectedChat = (id) => {
        setMyFriend(id)
        getChatHistory()
        setShowRestHolder(false)
        setShowRoomHistory(false)
        setShowChatHistory(true)
    }

    let selectedRoom = (id) => {
        setMyRoom(id)
        getRoomHistory()
        setShowRestHolder(false)
        setShowChatHistory(false)
        setShowRoomHistory(true)
    }

    return (
        <Wrapper>
            { 
                contacts ? 
                <UsersComponent data={myContacts} selectedChat={selectedChat} />
                :
                <RoomsWrapper myRooms={myRooms} selectedRoom={selectedRoom} />
            }
        </Wrapper>
    )
}

let RoomsWrapper = ({ myRooms, selectedRoom }) => {
    return (
        <div className='rooms'>
            {
                myRooms.map((item, index) => {
                    let { id : { _id, title, avatar, description } } = item

                    return (
                        <div className='each_holder' key={index}
                        onClick={() => selectedRoom(_id)} > 
                            <div className='each_pic'>
                            {
                                avatar ?
                                <img src={avatar} alt='sorry' className='profile_img' />
                                :
                                <BiUser className='profile_icon' />
                            }
                            </div>
                            <div className='each_rest'>
                                <p>{title}</p>
                                <p className='about_p'>{description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:76vh;

    .contacts, .rooms {
        width: 100%;
        max-width: 100%;
        height: 100%;
        padding: 10px 0;
        cursor: pointer;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            display: none;
        }

        .each_holder{
            width: 100%;
            max-width: 100%;
            height: 10vh;
            // border-bottom:0.1px solid var(--border_color);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            /* background:red; */

            .each_pic{
                width: 50px;
                max-width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--icon_color);
                display: flex;
                align-items: center;
                justify-content: center;
                /* border-right:0.1px solid gray; */

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    border-radius: 50%;
                }
                .profile_icon{
                    font-size: 25px; 
                }
            }
            .each_rest{
                width: calc(100% - 50px);
                max-width: calc(100% - 50px);
                height:100%;
                // border-right:0.1px solid gray;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: 7px;
                padding-left:30px;

                p{
                    font-size:15px;
                }
                .about_p{
                    font-size: 13.5px;
                    color:var(--icon_color);
                }
            }
        }
    }

    @media screen and (min-width:720px) {
        width:30vw;
        max-width:30vw;
        height:75vh;
        background: var(--background_color2);
    }
`


export default RestDisplay;