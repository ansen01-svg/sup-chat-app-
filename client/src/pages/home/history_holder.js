import styled from 'styled-components';
import cover from '../../assets/cover.png';
import { useMyContext } from '../../context';
import ChatHistory from './chat_history';
import RoomHistory from './room_history';

let HistoryHolder = ({classString}) => {

    let { showChatHistory, showRoomHistory } = useMyContext();

    if (showChatHistory) {
        return (
            <Wrapper className={classString}>
                <ChatHistory />
            </Wrapper>
        )
    } else if (showRoomHistory) {
        return (
            <Wrapper className={classString}>
                <RoomHistory />
            </Wrapper>
        )
    } else {
        return (
            <Wrapper className={classString}>
                <div className='cover_holder'>
                    <img src={cover} alt='sorry' className='img' />
                </div>
            </Wrapper>
        )
    }
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:100vh;
    color:white;

    .cover_holder{
        width:25vw;
        height:50vh;
        margin-top:15%;
        margin-left: 40%;

        .img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position:center;
        display: none;
        }
    }


    @media screen and (min-width:720px) {
        width:68vw;
        max-width:68vw;
        height:95vh;
        border-left:0.1px solid var(--border_color);
        border-bottom:5px solid var(--button_color);
        /* padding-right: 100px; */

        .cover_holder{
            .img{
                display:block;
            }
        }
    }
`


export default HistoryHolder;