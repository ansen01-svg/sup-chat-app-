import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import logo from '../assets/logo_big.png';
import FormInput from '../components/form_input';

let Login = () => {

    let navigate = useNavigate();
    let cookie = document.cookie;

    useEffect(() => {
        if (cookie) {
            navigate('/')
        }
    }, [navigate, cookie])

    let [user, setUser] = useState({ username : '', password : '' })
    let [errorMsg, setErrorMsg] = useState('')

    let handleChange = (e) => {
        setUser({ ...user, [e.target.name] : e.target.value })
    }

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/apis/v1/auth/login', user)

            setUser({ username : '', password : '' })
            let expiry = new Date(Date.now() + 60 * 60 * 24 * 31).toUTCString()
            document.cookie = `domCookie(sup) = tempCookie; expires = ${expiry}`
        } catch (error) {
            console.log(error)
            setErrorMsg(error.response.data.msg)
        }

    }

    return (
        <Wrapper>
            <div className='header_holder'>
                <img src={logo} alt='sorry' className='logo_img' />
                <p>Sup</p>
            </div>
            <div className='form_holder'>
                <p>Sign in to Sup</p>
                <form onSubmit={handleSubmit}>
                    { errorMsg && <div className='msg_div'>
                        <p>
                            {errorMsg}
                        </p>
                    </div> }
                    <FormInput inputClass={'input'} type={'text'}
                     placeholder={'username'} name={'username'}
                    value={user.username} handleChange={handleChange}
                    />
                    <FormInput inputClass={'input'} type={'password'}
                     placeholder={'password'} name={'password'}
                    value={user.password} handleChange={handleChange}
                    />
                    <button>Sign In</button>
                    <p>New to sup ? 
                        <Link to='/register' className='link'> Create an account</Link> 
                    </p>
                </form>
            </div>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height: 100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    gap:50px;
    margin-top:80px;

    .header_holder{
        padding:10px;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        gap:10px;

        .logo_img{
            width:40px;
            height:40px;
        }
        p{
            font-size: 30px;
            font-weight: bold;
        }
    }
    .form_holder{
        /* padding: 10px; */
        /* border:1px solid white; */
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:50px;

        p{
            font-size: 40px;
            font-weight: bold;
        }
        form{
            /* padding: 10px; */
            /* border:1px solid white;   */
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:25px;

            .msg_div{
                width: 80vw;
                max-width: 80vw;
                height:80px;
                background:white;
                border-radius: 5px;
                display:flex;
                align-items: center;
                justify-content: center;
                border-left:3.5px solid red;

                p{
                    color:red;
                    font-size: 14px;
                }
            }
            
            .input{
                width: 80vw;
                max-width: 80vw;
                height: 45px;
                border: none;
                outline: none;
                border-radius: 5px;
                padding-left: 10px;
                font-size: 18px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

            }
            button{
                width: 80vw;
                max-width: 80vw;
                height: 45px;
                border: none;
                outline: none;
                border-radius: 5px;
                font-size: 18px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight: bold;
                color: white;
                background: var(--button_color);
                cursor: pointer;
            }
            p{
                font-size: 13.5px;
                font-weight: normal;

                .link{
                    color: orangered;
                }
            }

            @media screen and (min-width: 720px) {
                .input,.msg_div, button {
                    width: 25vw;
                    max-width:25vw;
                }
            }
        }
    }
`


export default Login;