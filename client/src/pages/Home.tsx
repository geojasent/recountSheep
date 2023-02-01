import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <div id="homeSection" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <section style={{ color: '#ffffff', textShadow: '1px 1px 5px black' }}>
                <span style={{ display: 'flex', textAlign: 'center', fontSize: '1.3rem', margin: '40px 0px -30px 0px' }}>Capture the unfettered thoughts and emotions from this state of mind. </span>
                <Login />
                <span style={{ display: 'block', textAlign: 'center' }}>
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
