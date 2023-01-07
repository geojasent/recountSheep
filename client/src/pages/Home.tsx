import React from 'react';
import { Link } from 'react-router-dom';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <div>
            <p>This is the home page.</p>
            <p>
                <Link to="/about">Go to the About Page!</Link>
            </p>
            <p>
                <Link to="/dreamentry">Go to the Dream Entry Page!</Link>
            </p>
        </div>
    );
};

export default HomePage;
