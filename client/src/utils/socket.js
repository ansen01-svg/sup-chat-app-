import io from 'socket.io-client';
import { useMyContext } from '../context';

let useMySocket = () => {
    let { currentUser } = useMyContext();

    let socketio = io('http://localhost:8080', { query : { id : currentUser._id } })

    return socketio;
}


export default useMySocket; 