import React from 'react';
import { DreamComponent } from '../components/ViewDream';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './viewDreams.modules.css';
import Row from 'react-bootstrap/Row';

const DisplayDreams: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const goToDream = () => {
        navigate('/dreamentry');
    };
    return (
        <div id="dreamEntryPageContainer">
            <div id="dreamEntryActionContainer">
                {/* <input placeholder="Search"></input> */}
                <Button id="buttonStyle" variant="primary" style={{ margin: '10px' }} onClick={goToDream}>
                    Add another dream
                </Button>
                {/* <Button>Filter</Button> */}
                {/* pass search into component to display */}
            </div>
            <Container>
                <Row xs={1} md={2} lg={3} className="g-4">
                    <DreamComponent />
                </Row>
            </Container>
        </div>
    );
};

export default DisplayDreams;
