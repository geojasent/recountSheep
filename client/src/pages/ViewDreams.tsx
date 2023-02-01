import React from 'react';
import { DreamComponent } from '../components/ViewDream';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';

const DisplayDreams: React.FunctionComponent = () => {
    return (
        <Container>
            <Button variant="primary">Add another dream</Button>
            <DreamComponent />
        </Container>
    );
};

export default DisplayDreams;
