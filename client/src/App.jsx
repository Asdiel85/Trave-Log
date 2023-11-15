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
import UserProfile from './components/UserProfile/UserProfile.jsx'
import { UserContext } from './contexts/AuthContext.js';
import { useState } from 'react';

function App() {
  const [loggedUser, setLoggedUser] = useState(null)
  return (
    <>
    <UserContext.Provider value={[loggedUser, setLoggedUser]}>
      <Navigation />
      <main className={styles.container}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path ="/user/:id/details" element = {<UserProfile/>} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post-details/:id" element={<PostDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </main>
      </UserContext.Provider>
    </>
  );
}

export default App;
