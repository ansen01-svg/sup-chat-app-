import { useEffect } from 'react';
import styled from 'styled-components';
import RestHolder from './rest_holder';
import HistoryHolder from './history_holder';
import NewGroup from './new_group_modal';
import NewContact from './new_contact_modal';
import ProfileModal from './profile_modal';
import SearchModal from './search_modal';
import LogoutModal from './logout_modal';
import { useMyContext } from '../../context';
import { FaCoffee } from "react-icons/fa";

let Home = () => {

    let { showRestHolder, showNewContact, showNewGroup, showProfileModal, showSearchModal,
    showLogoutModal, getUser, currentUser, getMyContacts, getMyRooms, myContacts, } = useMyContext();

    let cookie = document.cookie;
    
    useEffect(() => {
        if (cookie) {
            getUser()
            getMyContacts()
            getMyRooms()
        }
    }, [cookie])

    if (!currentUser || !myContacts) {
        return (
            <Wrapper>
                <p className='loading_p'>Grab me a coffee</p>
                <FaCoffee id='coffee' />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className='container'>
                <RestHolder classString = {showRestHolder ? 'show' : 'hide'}/>
                <HistoryHolder classString={showRestHolder ? 'hide' : 'show'} />
                <LogoutModal classString={showLogoutModal ? 'show_logout' : ''} />
                <NewGroup classString={showNewGroup ? 'show_group' : ''} />
                <NewContact classString={showNewContact ? 'show_contact' : ''} />
                <ProfileModal classString={showProfileModal ? 'show_profile' : ''} />
                <SearchModal classString={showSearchModal ? 'show_search' : ''} />
            </div>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:100vh;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    gap:15px;
    /* overflow-y: hidden; */

    .loading_p{
        font-size: 25px;
        color: var(--icon_color);
    }
    #coffee{
        font-size: 30px;
        color: var(--icon_color);
    }

    .container{
        width:100vw;
        max-width: 100vw;
        height: 100vh;
    }

    .show, .show_search, .show_logout, .show_group,
    .show_contact, .show_profile{
        display: block;
    }
    .hide{
        display: none;
    }

    @media screen and (min-width:720px) {
        display:flex ;
        align-items: center;
        justify-content: center;
        background:black;

        .container{
            width:98vw;
            max-width: 98vw;
            height: 95vh;
            display:flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            background: var(--dashboard_background_color2);
        }

        .hide{
            display: block;
        }
    }
`


export default Home;