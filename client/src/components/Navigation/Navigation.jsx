import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import { UserContext } from '../../contexts/AuthContext.js';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate()
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  
  const onLogout  = () => {
    setLoggedUser(null)
    localStorage.removeItem('token')
    navigate('/')
  }
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
            {loggedUser ? null : (
              <>
                <Nav.Link as={Link} to={'/login'}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={'/register'}>
                  Register
                </Nav.Link>
              </>
            )}
            {loggedUser ? (
              <NavDropdown
                title={<UserAvatar userAvatar={loggedUser.avatar} />}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to={'/create'}>
                  Create Post
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/users/${loggedUser.id}/details`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={onLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
