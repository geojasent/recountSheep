import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <div id="homeSection" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Login />
            <section style={{ color: '#ffffff', textShadow: '1px 1px 5px black' }}>
                <span>
                    Don't have an account?{' '}
                    <Link id="signupLink" to="/signup" style={{ textDecoration: 'none', textShadow: '0px 0px 0px' }}>
                        Sign Up!
                    </Link>
                </span>
            </section>
        </div>
    );
};

export default HomePage;
