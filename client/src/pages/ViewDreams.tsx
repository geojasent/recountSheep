import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface IViewDreamsProps {}

const ViewDreams: React.FunctionComponent<IViewDreamsProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <p>View Dreams.</p>
            <p>
                <Link to="/about">Go to the About Page!</Link>
            </p>
            <p>
                <Link to="/test">Go to the Test Page!</Link>
            </p>
            <button onClick={() => navigate('/layout/55')}>Go to layout, with a number</button>
        </div>
    );
};

export default ViewDreams;
