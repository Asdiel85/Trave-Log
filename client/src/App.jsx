import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Feed from './components/Feed.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import CreatePost from './components/CreatePost.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import styles from './App.module.css';
import Footer from './components/Footer.jsx';
import PostDetails from './components/PostDetails.jsx';

function App() {
  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post-details/:id" element={<PostDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
