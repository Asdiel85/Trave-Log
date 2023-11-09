import Navigation from "./components/Navigation.jsx"
import CreatePost from "./components/CreatePost.jsx"
import styles from  './App.module.css'


function App() {
  return (
    <>    
    <Navigation /> 
    <div className={styles.container}>
  <CreatePost />
    </div>
    </>
  )
}

export default App
