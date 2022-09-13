import { useState } from 'react';
import styled from 'styled-components';
import HistoryNav from '../../components/history_nav';
import HistoryDisplay from '../../components/history_display';
import { useMyContext } from '../../context';

let modalOptions = [{ id : 1, option : 'View room' }, { id : 2, option : 'Leave room' }, { id : 3, option : 'Close chat' }]

let RoomHistory = () => {

    let { roomHistory, currentRoom, } = useMyContext();

    let [openProfile, setOpenProfile] = useState(false)

    let openModal = (e) => {}

    if (!currentRoom || !roomHistory ) {
        return (
            <Wrapper>
                <p className='loading_p'>
                    Fetching room history.
                </p>
            </Wrapper>
        )
    } 

        return (
            <Wrapper>
                <div className={`${openProfile ? 'first_container contract' : 'first_container'}`}>
                    <HistoryNav data={currentRoom} array={modalOptions} openModal={openModal} />
                    <HistoryDisplay chatData={roomHistory} /> 
                </div>
                <div className={`${openProfile ? 'second_container expand' : 'second_container'}`}>
                    second
                </div>
            </Wrapper>
        )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:100vh;
    color:white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .loading_p{
        font-size: 25px;
        color: var(--icon_color);
    }

    .first_container{
    width:100%;
    max-width:100%;
    height:100%;
    }
    .second_container{
        width:0vw;
        height:100%;
        display: none;
    }

    @media screen and (min-width:720px) {
        width:68vw;
        max-width:68vw;
        height:95vh;

        .second_container{
        width:0vw;
        height:100%;
        }
        .expand{
            width:30vw;
            transition: all 6ms linear;
        }
        .contract{
            width: 38vw;
            transition: all 6ms linear;
        }
    }
`


export default RoomHistory;