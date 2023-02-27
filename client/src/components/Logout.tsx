import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    //end session
    window.localStorage.removeItem('userId');
    useEffect(() => {
        fetch('https://recountsheep-server.onrender.com/logout', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then();
        navigate('/');
    });
    return <></>;
};

export default Logout;
