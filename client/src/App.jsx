import { Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation.jsx"
import Feed from "./components/Feed.jsx"
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import CreatePost from "./components/CreatePost.jsx"
import styles from  './App.module.css'
import Footer from "./components/Footer.jsx"


function App() {
  return (
    <>    
    <Navigation /> 
    <div className={styles.container}>
    <Routes>
      <Route path='/' element = {<Feed />} />
      <Route path='/register' element = {<Register />} />
      <Route path='/login' element = {<Login />} />
      <Route path='/create' element = {<CreatePost />} />
    </Routes>
  <Footer />
    </div>
    </>
  )
}

export default App
