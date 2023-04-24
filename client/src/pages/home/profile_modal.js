import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BiUser } from "react-icons/bi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { MdDone, MdModeEditOutline, MdPhotoCamera } from "react-icons/md";
import styled from 'styled-components';
import { useMyContext } from '../../context';


let ProfileModal = ({classString}) => {

    let { currentUser, setShowProfileModal, getUser } = useMyContext();

    let img_ref = useRef(null);
    console.log(img_ref)

    let [isEditingUsername, setIsEditingUsername] = useState(false)
    let [isEditingAbout, setIsEditingAbout] = useState(false)
    let [user, setUser] = useState({
        profile_picture : '',
        username : currentUser.username,
        about : currentUser.about
    })
    let [showChangeOption, setShowChangeOption] = useState(false)

    useEffect(() => {
        if (!user.profile_picture) return;
        
        // img_ref.current.src = user.profile_picture
    }, [user.profile_picture])

    let handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    let handlePicChange = async(e) => {
        let image = e.target.files[0]

        let formData = new FormData()
        formData.append('image', image)

        try {
            let { data } = await axios.post('/apis/v1/users/uploadProfilePicture', formData)

            setUser({ ...user, profile_picture : data.src })
            setShowChangeOption(true)
        }  catch (error) {
            console.log(error)
        }
    }

    let handlePicSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.patch(`/apis/v1/users/updateUser?profile_picture=${user.profile_picture}`)
            
            setShowChangeOption(false)
            getUser()
        } catch (error) {
            console.log(error)
        }
    }

    let handleNameSubmit = async (e) => {
        e.preventDefault()

        if (isEditingUsername) return;

        if (!user.username) return;

        try {
            await axios.patch(`/apis/v1/users/updateUser?username=${user.username}`)          
        } catch (error) {
            console.log(error)
        }
    }

    let handleAboutSubmit = async (e) => {
        e.preventDefault()

        if (isEditingAbout) return;

        if (!user.about) return;

        try {
            await axios.patch(`/apis/v1/users/updateUser?about=${user.about}`)
        } catch (error) {
            console.log(error)
        }
    }

    let back = () => {
        setShowProfileModal(false)
        setIsEditingUsername(false)
        setIsEditingAbout(false)
    }

    return (
        <Wrapper className={classString}>
            <div className='profile_nav'>  
                <HiOutlineArrowLeft id='left' onClick={back} />
                <p>Profile</p>
            </div>
            <div className='profile_img'>
                <div className='holder'>
                <div className='img_holder'>
                {
                    currentUser ? ( currentUser.profile_picture ?
                    <img src={currentUser.profile_picture}
                     alt='sorry' className='profile_pic' ref={img_ref} />
                    :
                    <BiUser className='profile_icon' /> )
                    :
                    <BiUser className='profile_icon' />
                }
                </div>
                <div className='img_holder_overlay'>
                    <form onSubmit={handlePicSubmit}>
                        <label htmlFor='profile_picture'>
                            <MdPhotoCamera id='camera_icon' />
                        </label>
                        <input type='file' accept='image/*' id='profile_picture'
                        name='profile_picture' 
                        onChange={handlePicChange} />
                        <p>change avatar</p>
                        <button className={`${showChangeOption ? 'show_change' : ''}`}>
                            <MdDone id='btn_icon' />
                        </button>
                    </form>
                </div>
                </div>
            </div>
            <div className='profile_name'>
                <p>Username</p>
                <form onSubmit={handleNameSubmit}>
                    <input type='text' name='username' value={user.username}
                    className={`${isEditingUsername ? 'show_input' : ''}`}
                    disabled={ isEditingUsername ? false :  true }
                    onChange={handleChange} />
                    <button onClick={() => setIsEditingUsername(!isEditingUsername)}>
                        {
                            isEditingUsername ? <MdDone id='btn_icon' /> 
                            : <MdModeEditOutline id='btn_icon' />
                        }
                    </button>
                </form>
                <p className='info_p'>This name will be visible to your Sup contacts.</p>
            </div>
            <div className='profile_about'>
                <p>About</p>
                <form onSubmit={handleAboutSubmit}>
                <input type='text' name='about' value={user.about} 
                className={`${isEditingAbout ? 'show_input' : ''}`}
                disabled={ isEditingAbout ? false :  true }
                onChange={handleChange} />
                    <button onClick={() => setIsEditingAbout(!isEditingAbout)}>
                        {
                            isEditingAbout ? <MdDone id='btn_icon' /> : <MdModeEditOutline id='btn_icon' />
                        }
                    </button>
                </form>
            </div>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:100vh;
    color:white;
    background: var(--dashboard_background_color2);
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    z-index: 5;

    .profile_nav{
        width:100%;
        max-width:100%;
        height:10vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: 0 30px;
        gap: 40px;
        border-bottom:0.1px solid var(--border_color);

        #left{
            font-size: 20px;
            cursor: pointer;
        }
        p{
            font-size: 20px;
            font-weight: bold;
        }
    }
    .profile_img{
        width:100%;
        max-width:100%;
        height:30vh ;
        display: flex;
        align-items: center;
        justify-content: center;
        /* border-bottom:0.1px solid var(--border_color); */
        position: relative;

        .holder{
         
        &:hover .img_holder_overlay{
            display: block;
        }
            .img_holder{
            width:40vw;
            height:25vh;
            /* border: 1px solid gray; */
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--icon_color);

            .profile_pic{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                object-position: center;
            }
            .profile_icon{
                color:white;
                font-size: 50px;
            }
        }
        
        .img_holder_overlay{
            width:40vw;
            height:25vh;
            /* border: 1px solid gray; */
            border-radius: 50%;
            background: var(--background_color2);
            opacity: 0.7;
            position: absolute;
            top: 2.4vh;
            left: 30vw;
            z-index: 7;
            display: none;

            form{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;

                #camera_icon{
                    font-size: 30px;
                    color: white;
                    cursor: pointer;
                }
                input{
                    display: none;
                }
                p{
                    text-transform: uppercase;
                    font-size: 13.5px;
                }
                button{
                    background: none;
                    outline: none;
                    border: none;
                    cursor: pointer;
                    display: none;

                    #btn_icon{
                        font-size:25px;
                        color:var(--button_color);
                    }
                }
                .show_change{
                    display: block;
                }
            }
        }
        }
    }

    .profile_name, .profile_about
    {
        width: 100%;
        max-width: 100%;
        height: 20vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 0 30px;
        gap: 30px;
        /* border-bottom:0.1px solid var(--border_color); */

        form{
            width: 100%;
            max-width: 100%;

            input{
                width: 90%;
                height:35px;
                border: none;
                outline: none;
                background: none;
                /* padding-left: 10px; */
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            .show_input{
                border-bottom: 2px solid var(--button_color);
            }
            button{
                width: 10%;
                height:35px;
                border: none;
                outline: none;
                background: none;
                cursor:pointer;

                #btn_icon{
                    color:var(--icon_color);
                    font-size: 20px;
                }
            }
        }

        p{
            color: var(--button_color);
        }
        .info_p{
            color: var(--icon_color);
        }
    }
    .profile_about{
        height: 15vh;
    }

    @media screen and (min-width:720px) {
        width:30vw;
        max-width:30vw;
        height: 95vh;
        position: absolute;
        top: 2.5vh;
        left: 1vw;
        display: none;
        z-index: 5;

        .profile_nav{
            height:8vh;
        }
        .profile_img{
            .holder{
                .img_holder, .img_holder_overlay{
                width: 13vw;
                height: 25vh;
            }
            .img_holder_overlay{
                top: 2.5vh;
                left: 8.5vw;
            }
            }
        }
    }
`


export default ProfileModal;