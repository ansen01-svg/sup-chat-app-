import styled from 'styled-components';
import { useMyContext } from '../../context';

let RestOptions = () => {

    let { contacts, setContacts } = useMyContext();

    return (
        <Wrapper>
            <div className='options_container'>
                <div className={`${contacts ? 'bg_color' : ''}`}
                onClick={() => setContacts(true)}>
                    <p>Contacts</p>
                </div>
                <div className={`${contacts ? '' : 'bg_color'}`}
                onClick={() => setContacts(false)}>
                    <p>Rooms</p>
                </div>
            </div>
            <div className={`${contacts ? 'options_footer left' : 'options_footer right'}`}></div>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:5vh;
    /* background-color:white; */
    display: flex;
    flex-direction: column;
    /* align-items:center; */
    justify-content:flex-end;
    /* border-bottom:1px solid gray; */

    .options_container{
        width: 100%;
        max-width: 100%;
        height: 100%;
        display: flex;
        align-items:center;
        justify-content:center;

        div{
        width:50%;
        max-width:50%;
        height:100%;
        display: flex;
        align-items:center;
        justify-content:center;
        cursor: pointer;

        p{
        color: var(--icon_color);
        }
        }

        .bg_color{
        background: var(--dashboard_background_color2);
        font-size: 14px;
        /* color: white; */
        }
    }
    .options_footer{
        width: 50%;
        height: 1.5px;
        background: var(--button_color);
    }
    .right{
        transform: translateX(100%);
        transition: all 10ms linear;
    }
    .left{ 
        transform: translateX(0%);
        transition: all 10ms linear;
    }

    @media screen and (min-width:720px) {
        width:30vw;
        max-width:30vw;
        height:5vh;
        background: var(--background_color2);
        /* border-bottom:1px solid gray; */
    }
`


export default RestOptions;