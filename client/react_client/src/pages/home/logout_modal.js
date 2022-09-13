import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useMyContext } from '../../context';

let LogoutModal = ({classString}) => {

    let navigate = useNavigate()
    let { logoutUser, setShowLogoutModal } = useMyContext();

    let logout = () => {
        logoutUser()
        setShowLogoutModal(false)
        setTimeout(() => navigate('/login') , 2000)       
    }

    return (
        <Wrapper className={classString}>
            <div className='modal'>
                <p>Are you sure you want to logout ?</p>
                <div className='buttons_holder'>
                    <button id='yes' onClick={logout}>Yes</button>
                    <button id='no'  onClick={() => setShowLogoutModal(false)}>No</button>
                </div>
            </div>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:100vh;
    background: var(--overlay);
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    z-index: 5;

    .modal{
        width: 70%;
        height: 20%;
        background: var(--dashboard_background_color2);
        border-radius: 5px;
        margin: auto;
        margin-top: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;

        p{
            font-size: 18px;
            font-weight: bold;
        }
        .buttons_holder{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 30px;

            button{
                width: 70px;
                height: 35px;
                border: none;
                border-radius: 5px;
                outline: none;
                background: none;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                color: white;
                font-weight: bold;
                cursor: pointer;
            }
            
            #yes{
                background: red;
            }
            #no{
                border: 3px solid var(--border_color);
            }
        }
    }
    

    @media screen and (min-width:720px) {
        width:98vw;
        max-width:98vw;
        height: 95vh;
        position: absolute;
        top: 2.5vh;
        left: 1vw;
        display: none;
        z-index: 5;

        .modal{
            width: 25%;
            height: 20%;
            background: var(--dashboard_background_color2);
            border-radius: 5px;
            margin: auto;
            margin-top: 20%;           
        }
    }
`


export default LogoutModal;