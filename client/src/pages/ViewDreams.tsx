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
            <Button variant="primary" onClick={goToDream}>
                Add another dream
            </Button>
            <DreamComponent />
        </Container>
    );
};

export default DisplayDreams;
