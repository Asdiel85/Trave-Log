import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.js';

export default function LoggedInGuard() {
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const location = useLocation();
  return loggedUser ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
