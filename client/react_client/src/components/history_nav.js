import styled from 'styled-components';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useMyContext } from '../context';


let HistoryNav = (props) => {

    let { data, array, openModal } = props;

    let { foreignUser, showHistoryNavModal, setShowHistoryNavModal, setForeignUser, setCurrentRoom,
        setMyFriend, setMyRoom, setShowRestHolder, setShowChatHistory,
        setShowRoomHistory, setChatHistory, setRoomHistory, } = useMyContext();

    let closeChat = () => {
        setChatHistory(null)
        setForeignUser(null)
        setMyFriend(null)
        setShowRestHolder(true)
        setShowRoomHistory(false)
        setShowChatHistory(false)
    }

    let closeRoom = () => {
        setRoomHistory(null)
        setCurrentRoom(null)
        setMyRoom(null)
        setShowRestHolder(true)
        setShowChatHistory(false)
        setShowRoomHistory(false)
    }

    return (
        <Wrapper>
            <div className='img_name_holder'>
                <HiOutlineArrowLeft id='left'
                onClick={data === foreignUser  ? closeChat : closeRoom} />
            <div className='img_holder' >
                {
                    data === foreignUser ?
                    (data.profile_picture ?
                    (<img src={data.profile_picture} alt='sorry' className='profile_img' />)
                    :
                    (<BiUser className='profile_icon' />))
                    :
                    (data.avatar ?
                    (<img src={data.avatar} alt='sorry' className='profile_img' />)
                    :
                    (<BiUser className='profile_icon' />))
                }
            </div>
            <p>{data === foreignUser ? data.username : data.title}</p>
            </div>
            <BsThreeDotsVertical id='menu' className='menu'
            onClick={() => setShowHistoryNavModal(!showHistoryNavModal)} />
            <div className={`${showHistoryNavModal ? 'nav_modal show' : 'nav_modal'}`}>
                {
                    array.map(item => {
                        return(
                            <div className='option_holder' key={item.id}>
                                <p onClick={openModal}>{item.option}</p>
                            </div>
                        )
                    })
                }
            </div>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100%;
    max-width:100%;
    height:10vh;
    color:white;
    display:flex ;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: var(--dashboard_background_color2);
    position: relative;
    /* border-bottom:1px solid gray; */

    .img_name_holder{
        display: flex;
        align-items:center;
        justify-content:center;
        gap:30px;

        #left{
            font-size:20px;
            cursor:pointer;
        }

        p{
            font-weight:bold;
        }

        .img_holder{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--icon_color);
        display: flex;
        align-items:center;
        justify-content:center;
        cursor: pointer;

        .profile_icon{
            font-size:25px;
        }
        .profile_img{
            width: 100%;
            height:100%;
            border-radius:50%;
            object-fit:cover;
            object-position:center; 
        }
    }
    }
    #menu{
        font-size: 23px;
        color:var(--icon_color);
        cursor: pointer;
    }
    .nav_modal{
        width: 30vw;
        height: 18vh; 
        background: var(--dashboard_background_color2);
        position: absolute;
        top: 8vh;
        right: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        box-shadow:1.5px 1.5px 1px var(--box_shadow), -1.5px -1.5px 1px var(--box_shadow) ;
        display: none;
    
        .option_holder{
            width: 100%;
            height: 25%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            padding:10px 0 0 20px;
            cursor: pointer;
            &:hover{
                background: var(--button_color);
            }

            p{
                font-size:15px ;
            }
        }
    }

    .show{
        display: block;
    }

    @media screen and (min-width:720px) {
        height:8vh;
        /* border-bottom:1px solid gray; */

        #left{
            display:none;
        }

        .img_holder{
        width: 46px;
        height: 46px;
        border-radius: 50%;
        }
        #menu{
            font-size: 20px;
        }
        .nav_modal{
        width: 12vw;
        height: 20vh;
        }
    }
`


export default HistoryNav;