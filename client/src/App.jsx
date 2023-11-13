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

function App() {
  return (
    <>
      <Navigation />
      <main className={styles.container}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post-details/:id" element={<PostDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
