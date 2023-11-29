import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import { UserContext } from '../../contexts/AuthContext.jsx';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useContext(UserContext);

  const onLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand as={Link} to={'/'}>
          Travel Log
        </Navbar.Brand>
        <Nav.Link as={Link} to={'/'}>
          Dashboard
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {loggedUser && (
            <UserAvatar userAvatar={loggedUser.avatar} id={loggedUser.id} />
          )}
          <Nav>
            {!loggedUser && (
              <>
                <Nav.Link data-testid = 'login' as={Link} to={'/login'}>
                  Login
                </Nav.Link>
                <Nav.Link data-testid = 'register' as={Link} to={'/register'}>
                  Register
                </Nav.Link>
              </>
            )}
            {loggedUser && (
              <NavDropdown>
                <NavDropdown.Item as={Link} to={'/create'}>
                  Create Post
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to={`/user/${loggedUser.id}/details`}
                >
                  Profile
                </NavDropdown.Item>
                {loggedUser.isAdmin && (
                  <NavDropdown.Item as={Link} to={'/users'}>
                    Users
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
