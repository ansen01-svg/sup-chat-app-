import styled from 'styled-components';
import logo from '../assets/logo_big.png';
import FormInput from './form_input';

let Form = (props) => {

    let {header, linkTo, buttonText, handleChange, handleSubmit, username, password} = props
console.log(handleSubmit)
    return (
        <Wrapper>
            <div className='header_holder'>
                <img src={logo} alt='sorry' className='logo_img' />
                <p>Sup</p>
            </div>
            <div className='form_holder'>
                <p>{header}</p>
                <form onSubmit={handleSubmit}>
                    <FormInput inputClass={'input'} type={'text'}
                     placeholder={'username'} name={'username'}
                    value={username} handleChange={handleChange}
                    />
                    <FormInput inputClass={'input'} type={'password'}
                     placeholder={'password'} name={'password'}
                    value={password} handleChange={handleChange}
                    />
                    <button>{buttonText}</button>
                    {linkTo}
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
            }
            p{
                font-size: 13.5px;
                font-weight: normal;

                .link{
                    color: orangered;
                }
            }

            @media screen and (min-width: 720px) {
                .input, button {
                    width: 25vw;
                    max-width:25vw;
                }
            }
        }
    }
`


export default Form;