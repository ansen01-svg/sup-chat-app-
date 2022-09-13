import { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useMyContext } from '../../context';
import axios from 'axios';

let NewContact = ({classString}) => {
    
    let { setShowNewContact } = useMyContext();

    let [username, setUsername] = useState('')
    let [msg, setMsg] = useState('')
    let [errorMsg, setErrorMsg] = useState('')
    let [showMsg, setShowMsg] = useState(false)

    let handleSubmit = async (e) => {
        e.preventDefault()

        if (!username) return;

        try {
            let { data } = await axios.patch(`/apis/v1/users/addNewContact?username=${username}`)

            setShowMsg(true)
            setMsg(data.msg)
            setUsername('')
            setTimeout(() => {
                setShowMsg(false)
                setMsg('')
            }, 5000)
        } catch (error) {
            setShowMsg(true)
            setErrorMsg(error.response.data.msg)
            setTimeout(() => {
                setShowMsg(false)
                setErrorMsg('')
            }, 5000)
        }
    }

    let closeModal = () => {
        setUsername('')
        setShowNewContact(false)
    }

    return (
        <Wrapper className={classString}>
            <div className='contact_nav'>
                <HiOutlineArrowLeft id='left' onClick={closeModal} />
                <p>Add a new contact</p>
            </div>
            <div className='contact_input'>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Enter username'
                    value={username} onChange={ e => setUsername(e.target.value)} />
                    <button>Add user</button>
                </form>
            </div>
            <div className={`${showMsg ? 'contact_message show_p' : 'contact_message'}`}>
                <p className={`${msg ? 'green' : 'red'}`}>
                    { msg ? msg : errorMsg }
                </p>
            </div>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:100vh;
    background: var(--dashboard_background_color2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    z-index: 5;

    div{
        width: 100%;
        max-width: 100%;
        height: 10vh;
        /* border-bottom: 1px solid gray; */
        display: flex; 
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap:40px;
        padding: 0 30px;
    }
    .contact_nav{
        border-bottom: 0.1px solid var(--border_color);
        justify-content: flex-start;

        #left{
            color: white;
            font-size: 20px;
            cursor: pointer;
        }
        p{
            font-size: 20px;
            font-weight: bold;
        }
    }
    .contact_input{
        height: 20vh;
        form{
            width: 100%;
            max-width: 100%;
            height:100%;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: center;
            gap: 20px;
            padding-bottom:20px;

            input{
                width: 70%;
                height: 30px;
                border: none;
                outline: none;
                background: none;
                color:white;
                border-bottom: 1px solid var(--border_color);
                font-size: 16px;
                /* padding-left: 10px; */
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            button{
                width: 25%;
                height: 30px;
                border: none;
                outline: none;
                background: var(--button_color);
                color:white;
                font-weight: bold;
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
        }
    }
    .contact_message{
        display: none;
        .green{
            color:rgb(10,200,30);
            font-size:15px;
        }
        .red{
            color:red;
            font-size:15px;
        }
    }
    .show_p{
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media screen and (min-width:720px) {
        width:30vw;
        max-width:30vw;
        height: 95vh;
        background: var(--background_color2);
        position: absolute;
        top: 2.5vh;
        left: 1vw;
        display: none;
        z-index: 5;

        .contact_nav{
            height:8vh;
        }
    }
`


export default NewContact;