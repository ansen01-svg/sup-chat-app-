import styled from 'styled-components';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { useMyContext } from '../../context';

let modalOptions = [{ id : 1, option : 'New group' }, { id : 2, option : 'New contact' }, { id : 3, option : 'Logout' }]

let RestNav = () => {

    let { currentUser, showNavModal, setShowNavModal, setShowLogoutModal,
    setShowNewGroup, setShowNewContact, setShowProfileModal } = useMyContext();
 
    let openModal = (e) => {
        if (e.target.textContent === 'New group') {
            setShowNewGroup(true)
        } else if (e.target.textContent === 'New contact') {
            setShowNewContact(true)
        } else {
            setShowLogoutModal(true)
        }   
    }

    return (
        <Wrapper>
            <div className='img_holder' onClick={() => setShowProfileModal(true)}>
                {
                    currentUser.profile_picture ?
                    <img src={currentUser.profile_picture} alt='sorry' className='profile_img' />
                    :
                    <BiUser className='profile_icon' />
                }
            </div>
            <BsThreeDotsVertical id='menu' className='menu'
            onClick={() => setShowNavModal(!showNavModal)} />
            <div className={`${showNavModal ? 'nav_modal show' : 'nav_modal'}`}>
                {
                    modalOptions.map(item => {
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
    width:100vw;
    max-width:100vw;
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
        width:30vw;
        max-width:30vw;
        height:8vh;
        /* border-bottom:1px solid gray; */

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


export default RestNav;