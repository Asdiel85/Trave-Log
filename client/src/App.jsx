import Navigation from "./components/Navigation.jsx"
import Post from "./components/Post.jsx"
import styles from  './App.module.css'

function App() {
  return (
    <>    
    <Navigation /> 
    <div className={styles.container}>
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    </div>
    </>
  )
}

export default App
