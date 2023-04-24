import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Picker from 'emoji-picker-react'; 
import { IoMdSend } from "react-icons/io";
import { VscSmiley } from "react-icons/vsc";
import { useMyContext } from '../context';
import useMySocket from '../utils/socket';

let reducer = (state, {type, payload}) => {
    switch (type) {
        case ('UPDATE_CHATS') :
            return { ...state, chats : [...state.chats, payload] }

        default :
            return state;
    }
}

let HistoryDisplay = ({chatData}) => {
console.log(chatData)
    let { currentUser, myRoom, foreignUser } = useMyContext();

    let io = useMySocket();

    let [text, setText] = useState('')
    let [showEmojis, setShowEmojis] = useState(false)
    let [data, dispatch] = useReducer(reducer, { chats : chatData.history.history })

    let updateChatsArray = (payload) => {
        dispatch({ type : 'UPDATE_CHATS', payload })
    }

    useEffect(() => {
        io.on('connect', () => console.log('connected'))

        if (chatData.name === 'chatHistory') {
            io.on('private_chat(from_server)', msg => {
                updateChatsArray(msg)
            }) 
            console.log('private chat')
        } else {
            io.on('room_chat(from_server)', msg => {
                updateChatsArray(msg)
            }) 
            console.log('group chat')
        }
    }, [io])

    let addEmoji = (event, emojiObject) => {
        setText(text += emojiObject.emoji)
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        if (!text) return;

        if (chatData.name === 'chatHistory') {
            let data = { senderId : currentUser._id, recieverId : foreignUser._id, text }
            io.emit('private_chat(from_client)', data)
            setText('')
            setShowEmojis(false)
        } else {
            let data = { msg : text, sender : currentUser._id, roomId : myRoom }
            io.emit('room_chat(from_client)', data)
            setText('')
            setShowEmojis(false)
        }
    }
console.log(data)
    if (data.chats.length === 0) {
        return (
            <Wrapper>
                <div className='msg_holder center'>
                    <p id='start_convo'>Start a conversation.</p>
                </div>
                <div className='form_holder'>
                <form onSubmit={handleSubmit}>
                    <div className={`${showEmojis ? 'emoji_modal show' : 'emoji_modal'}`}>
                        <Picker />
                    </div>
                    <VscSmiley id='emoji' />
                    <input type='text' placeholder='Message' value={text}
                    onChange={(e) => setText(e.target.value)} />
                    <button>
                        <IoMdSend id='send' /> 
                    </button>
                </form>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className='msg_holder'>
                <div className='old_msgs'>
                {
                    data.chats.map((item, index) => {

                        let { message, sender : { username, _id }, sentAt } = item

                        let time =  moment(sentAt).format('h:mm');
                        let rgb = (Math.random()*50, Math.random*50, Math.random*50)

                        return (
                            <div className={`${_id === currentUser._id ? 'msg_div flex_end' : 'msg_div'}`}
                            key={index}>
                                { 
                                    chatData.name === 'roomHistory' && 
                                    (<span>
                                        <p style={{color:`rgb${rgb}`}}>{username}</p>
                                    </span>) 
                                }                            
                                <span>
                                    <p>{message}</p>
                                </span>
                                <span className='time_span'>
                                    <p className={`${_id === currentUser._id ? 'black_p' : ''}`}>
                                        {time}
                                    </p>
                                </span>
                            </div>  
                        )
                    })
                }
                </div>
            </div>
            <div className='form_holder'>
                <form onSubmit={handleSubmit}>
                    <div className={`${showEmojis ? 'emoji_modal show' : 'emoji_modal'}`}>
                        <Picker onEmojiClick={addEmoji} />
                    </div>
                    <VscSmiley id='emoji' onClick={() => setShowEmojis(!showEmojis)} />
                    <input type='text' placeholder='Message' value={text}
                    onChange={(e) => setText(e.target.value)} />
                    <button>
                        <IoMdSend id='send' /> 
                    </button>
                </form>
            </div>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100%;
    max-width:100%;
    height:90vh;
    color:white;

    .msg_holder{
        width: 100%;
        max-width:100%;
        height: 82vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        #start_convo{
            font-size:25px;
            color:var(--icon_color);
        }

        .old_msgs{
            width:100%;
            height:100%;
            padding: 10px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            overflow-y: scroll;
        &::-webkit-scrollbar{
            display: none;
        }

            .msg_div{
                background:var(--dashboard_background_color2);
                border-radius: 8px;
                padding:10px 10px;
                align-self:flex-start;
                display: flex;
                flex-direction:column;
                gap: 5px;

                span{
                    align-items: flex-start;
                }
                .time_span{
                    align-self: flex-end;
                    p{
                    color: var(--icon_color);
                    font-size: 13px;
                    }
                    .black_p{
                    color:black;
                    }
                }
            }
            .flex_end{
                align-self:flex-end;
                background:var(--button_color);
            }
        }
        .show{
            padding: 10px 20px;
        }
    }
    .center{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
    }
    .form_holder{
        width: 100%;
        max-width:100%;
        height: 8vh;
        /* border-top: 1px solid gray; */

        form{
            width: 100%;
            max-width:100%;
            padding: 2.5px 0;
        height: 100%;
        display:flex;
        align-items:center;
        justify-content:center;
        gap: 10px;
        padding:0 30px;
        position:relative;

        .emoji_modal{
            // width:15vw;
            // height:20vh;
            position:absolute;
            bottom:8vh;
            left:20px;
            display: none;

                  .emoji-picker-react {
        // position: absolute;
        // top: -350px;
        background-color: var(--background_color2);
        box-shadow: 0 5px 10px var(--background_color3);
        border-color: var(--icon_color);
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: none;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background:none;
          border:0.1px solid var(--icon_color);
        }
        .emoji-group:before {
          background-color: var(--background_color2);
        }
      }
        }
        .show{
            display: block;
            position:absolute;
            bottom:8vh;
            left:20px;
        }

        input{
            width:calc(88.5% - 45px); 
            height:75%;
            background:var(--icon_color);
            border-radius:8px;
            outline:none;
            border:none;
            font-size:15px;
            color:white;
            padding-left:10px;
            font-family :-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

        }
        button{
            width: 11.5%;
            height:75%;
            background:var(--button_color);
            border-radius:50%;
            outline:none;
            border:none;
            display:flex;
            align-items:center;
            justify-content:center;
            #send{
                font-size: 25px;
                color:white;
            }
        }
        #emoji{
            font-size:25px;
            color:var(--icon_color);
            cursor: pointer;
        }
        }
    }

    @media screen and (min-width:720px) {
        height:87vh;
        background: var(--background_color3);

    .msg_holder{
        height: 79vh;
    }
    .form_holder{
        height: 8vh;

        form{
            background:var(--dashboard_background_color2);

            input {
            width:calc(95% - 45px);
        }
                    button{
                width:5%;
            }
        }
    }
    }
`


export default HistoryDisplay;