import { Navigate }  from 'react-router-dom';

let ProtectedRoute = ({ children }) => {

    let cookie = document.cookie;

    if (!cookie) {
        return <Navigate to='/login' />
    }

    return children;
}


export default ProtectedRoute;