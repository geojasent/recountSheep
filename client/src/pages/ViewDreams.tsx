import React from 'react';
import { Link } from 'react-router-dom';

export interface IViewDreamsProps {}

const ViewDreams: React.FunctionComponent<IViewDreamsProps> = (props) => {
    return (
        <div>
            <p>View Dreams.</p>
            <p>
                <Link to="/dreamentry">Add another dream</Link>
            </p>
        </div>
    );
};

export default ViewDreams;
