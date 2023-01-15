import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <div>
            <p>This is the home page.</p>
            <Login />
            <p>
                <Link to="/signup">Sign Up!</Link>
            </p>
        </div>
    );
};

export default HomePage;
