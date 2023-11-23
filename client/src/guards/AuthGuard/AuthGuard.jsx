import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.jsx';

export default function AuthGuard() {
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const location = useLocation();
  return loggedUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
