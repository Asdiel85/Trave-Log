import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={'/'}>
          Travel Log
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link as={Link} to={'/login'}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to={'/register'}>
              Register
            </Nav.Link>
            <NavDropdown title ={<UserAvatar userAvatar = {"https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"}/>} id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to={'/create'}>
                Create Post
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={'/logout'}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
