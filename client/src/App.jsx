import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import Navigation from './components/Navigation/Navigation.jsx';
import Feed from './components/Feed/Feed.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import CreatePost from './components/CreatePost/CreatePost.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import PostDetails from './components/PostDetails/PostDetails.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import AuthGuard from './guards/AuthGuard/AuthGuard.jsx';
import AdminGuard from './guards/AdminGuard/AdminGuard.jsx';
import { UserContext } from './contexts/AuthContext.js';
import { useEffect, useState } from 'react';
import { getLoggedUser } from './utils/auth.js';
import LoggedInGuard from './guards/LoggedInGuard/LoggedInGuard.jsx';
import Users from './components/Users/Users.jsx';
import EditPost from './components/EditPost/EditPost.jsx';
import EditUser from './components/EditUser/EditUser.jsx';

function App() {
  const [loggedUser, setLoggedUser] = useState(getLoggedUser());
  useEffect(() => {
    const user = getLoggedUser();
    if (user) {
      setLoggedUser(user);
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={[loggedUser, setLoggedUser]}>
        <Navigation />
        <main className={styles.container}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route element={<LoggedInGuard />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/post-details/:id" element={<PostDetails />} />
            <Route element={<AuthGuard />}>
              <Route path="/user/:id/details" element={<UserProfile />} />
              <Route path="/post/:id/edit" element={<EditPost />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/user/:id/edit" element={<EditUser />} />
            </Route>
            <Route element={<AdminGuard />}>
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </main>
      </UserContext.Provider>
    </>
  );
}

export default App;
