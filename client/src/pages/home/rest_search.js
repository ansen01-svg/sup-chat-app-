import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
import { useMyContext } from '../../context';

let RestSearch = () => {

    let { setSearchResults, setShowSearchModal, } = useMyContext();

    let [term, setTerm] = useState('')

    let handleChange = (e) => {
        setTerm(e.target.value)
    }

    let handleSubmit = async (e) => {
        e.preventDefault()

        if (!term) return;

        try {
            let { data } = await axios.get(`/apis/v1/users/search?term=${term}`)

            setSearchResults(data.users)
            setShowSearchModal(true)
            setTerm('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <button>
                    <AiOutlineSearch id='search' />
                </button>
                <input type='text' placeholder='Search' value={term}
                onChange={handleChange} />
            </form>
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:7vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    /* border-bottom:1px solid gray; */

    form{
        width: 100%;
        max-width: 100vw;
        height: 60%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        border-radius: 5px;
        background: var(--dashboard_background_color2);

        input{
            width: 85%;
            height: 100%;
            border: none;
            outline: none;
            background: none;
            font-size: 15px;
            color:white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        button{
            background:none;
            outline:none;
            border:none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            #search{
                color: var(--icon_color);
            }
        }
    }

    @media screen and (min-width:720px) {
        width:30vw;
        max-width:30vw;
        height:7vh;
        background: var(--background_color2);
        /* border-bottom:1px solid gray; */
    }
`


export default RestSearch;