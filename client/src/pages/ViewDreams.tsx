import React from 'react';
import { DreamComponent } from '../components/ViewDream';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DisplayDreams: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const goToDream = () => {
        navigate('/dreamentry');
    };
    return (
        <Container>
            <div id="dreamEntryActionContainer" style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
                {/* <input placeholder="Search"></input> */}
                <Button variant="primary" style={{ margin: '10px' }} onClick={goToDream}>
                    Add another dream
                </Button>
                {/* <Button>Filter</Button> */}
            </div>
            {/* pass search into component to display */}
            <DreamComponent />
        </Container>
    );
};

export default DisplayDreams;
