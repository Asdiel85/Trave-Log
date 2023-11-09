import Navigation from "./components/Navigation.jsx"
import CreatePost from "./components/CreatePost.jsx"
import styles from  './App.module.css'
import Footer from "./components/Footer.jsx"


function App() {
  return (
    <>    
    <Navigation /> 
    <div className={styles.container}>
  <CreatePost />
  <Footer />
    </div>
    </>
  )
}

export default App
