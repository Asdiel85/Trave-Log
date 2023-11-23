import {Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.jsx';

export default function AdminGuard() {
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  return loggedUser?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/"/>
  );
}
