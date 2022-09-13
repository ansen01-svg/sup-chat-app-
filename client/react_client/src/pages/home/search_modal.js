import styled from 'styled-components';
import { HiOutlineArrowLeft } from "react-icons/hi"; 
import { BiUser } from "react-icons/bi";
import { useMyContext } from '../../context';

let SearchModal = ({classString}) => {

    let { searchResults, setSearchResults, setShowSearchModal, setShowRestHolder,
         setMyFriend, getChatHistory } = useMyContext();

    let back = () => {
        setShowSearchModal(false)
        setSearchResults([])
    }

    let selectedChat = (id) => {
        setMyFriend(id)
        getChatHistory()
        setShowSearchModal(false)
        setShowRestHolder(false)
    }

    return (
        <Wrapper className={classString}>
            <div className='search_nav'>
                <HiOutlineArrowLeft id='left' onClick={back} />
                <p>Search results</p>
            </div>
            <div className='search_contacts'>
            {
                searchResults.length === 0 ?
                (<p className='no_result'>No contacts found</p>)
                :
                (searchResults.map((item, index) => {
                    let { _id, username, profile_picture, about } = item
    
                    return (
                        <div className='each_holder' key={index}
                        onClick={() => selectedChat(_id)} >
                            <div className='each_pic'>
                            {
                                profile_picture ?
                                <img src={profile_picture} alt='sorry' className='profile_img' />
                                :
                                <BiUser className='profile_icon' />
                            }
                            </div>
                            <div className='each_rest'>
                                <p>{username}</p>
                                <p className='about_p'>{about}</p>
                            </div>
                        </div>
                    )
                }))
            }
            </div>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:83vh;
    position: absolute;
    background:var(--background_color);
    bottom: 0;
    left: 0;
    display: none;
    z-index: 5;

    .search_nav{
        width:100%;
        max-width:100%;
        height:8vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: 0 30px;
        gap: 60px;
        border-bottom:0.1px solid var(--border_color);

        #left{
            font-size: 20px;
            cursor: pointer;
            color:white;
        }
        p{
            font-size: 20px;
            font-weight: bold;
        }
    }

    .search_contacts {
        width: 100%;
        max-width: 100%;
        height: 100%;
        padding: 10px 0;
        cursor: pointer;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            display: none;
        }

        .no_result{
            text-align: center;
            padding-top: 100px;
            color: var(--icon_color);
        }

        .each_holder{
            width: 100%;
            max-width: 100%;
            height: 10vh;
            // border-bottom:0.1px solid var(--border_color);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            /* background:red; */

            .each_pic{
                width: 50px;
                max-width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--icon_color);
                display: flex;
                align-items: center;
                justify-content: center;
                /* border-right:0.1px solid gray; */

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    border-radius: 50%;
                }
                .profile_icon{
                    font-size: 25px; 
                    color:white;
                }
            }
            .each_rest{
                width: calc(100% - 50px);
                max-width: calc(100% - 50px);
                height:100%;
                // border-right:0.1px solid gray;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: 7px;
                padding-left:40px;

                p{
                    font-size:15px;
                }
                .about_p{
                    font-size: 13.5px;
                    color:var(--icon_color);
                }
            }
        }
    }

    @media screen and (min-width:720px) {
        width:30vw;
        max-width:30vw;
        height: 80vh;
        position: absolute;
        bottom: 2.5vh;
        left: 1vw;
        display: none;
        z-index: 5;
    }
`


export default SearchModal;