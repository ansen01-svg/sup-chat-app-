import styled from 'styled-components';
import RestNav from './rest_nav';
import RestSearch from './rest_search';
import RestOptions from './rest_options';
import RestDisplay from './rest_main_display';
import { useMyContext } from '../../context';

let RestHolder = ({classString}) => {

    let { setShowNavModal } = useMyContext();

    let closeNavModal = (e) => {
        if (!e.target.classList.contains('menu')) {
            setShowNavModal(false)
        }
    }

    return (
        <Wrapper className={classString} onClick={closeNavModal}>
            <RestNav />
            <RestSearch />
            <RestOptions />
            <RestDisplay />
        </Wrapper>
    )
}

let Wrapper = styled.div`
    width:100vw;
    max-width:100vw;
    height:100vh;
    color:white;

    @media screen and (min-width:720px) {
        width:30vw;
        max-width:30vw;
        height:95vh;
    }
`


export default RestHolder;