import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function NavBar() {
    return (
        <Navbar style={{ backgroundColor: '#E5E4E2' }} expand="sm">
            <Container>
                <Navbar.Brand href="/">RecountSheep</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/viewdreams">View Dreams</Nav.Link>
                        <Nav.Link href="/dreamentry">Dream Entry</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
