import React from 'react';
import { Link } from 'react-router-dom';
import { DreamComponent } from '../components/ViewDream';

const DisplayDreams: React.FunctionComponent = () => {
    return (
        <div>
            <p>View Dreams.</p>
            <Link to="/dreamentry">Add another dream</Link>
            <DreamComponent />
        </div>
    );
};

export default DisplayDreams;
