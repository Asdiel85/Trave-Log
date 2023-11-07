import Navigation from "./components/Navigation.jsx"
import Register from "./components/Register.jsx"
import styles from  './App.module.css'


function App() {
  return (
    <>    
    <Navigation /> 
    <div className={styles.container}>
    <Register />
    </div>
    </>
  )
}

export default App
