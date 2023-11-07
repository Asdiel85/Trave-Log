import Navigation from "./components/Navigation.jsx"
import Login from "./components/Login.jsx"
import styles from  './App.module.css'


function App() {
  return (
    <>    
    <Navigation /> 
    <div className={styles.container}>
  <Login />
    </div>
    </>
  )
}

export default App
