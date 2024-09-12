import { ToastContainer } from 'react-toastify'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
     <ToastContainer 
     theme="colored"
     autoClose={4000}/>
     <Outlet />
    </>
  )
}

export default App
