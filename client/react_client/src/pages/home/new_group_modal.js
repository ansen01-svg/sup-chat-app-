import styled from 'styled-components';

let NewGroup = ({classString}) => {
    return (
        <Wrapper className={classString}>new group</Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:100vh;
    color:white;
    background: yellow;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    z-index: 5;

    @media screen and (min-width:720px) {
        width:30vw;
        max-width:30vw;
        height: 95vh;
        background: yellow;
        position: absolute;
        top: 2.5vh;
        left: 1vw;
        display: none;
        z-index: 5;
    }
`


export default NewGroup;