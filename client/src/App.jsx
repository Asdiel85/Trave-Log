import Navigation from "./components/Navigation.jsx"
import Post from "./components/Post.jsx"
import Login from "./components/Login.jsx"
import styles from  './App.module.css'
import Register from "./components/Register.jsx"

function App() {
  return (
    <>    
    <Navigation /> 
    <div className={styles.container}>
      <Register/>
    </div>
    </>
  )
}

export default App
