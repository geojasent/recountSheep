import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    //end session
    sessionStorage.removeItem('userId');
    useEffect(() => {
        fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then();
        navigate('/');
    });
    return <></>;
};

export default Logout;
