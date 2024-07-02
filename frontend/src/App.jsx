import './App.css';
import { Outlet } from 'react-router-dom';
import Navigation from './pages/auth/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { useEffect } from 'react';

function App() {
    // const expire=localStorage.getItem('expire')
    // console.log(expire)
    // useEffect(() => {
      
    // }, []);
    
    return (
        <>
            <ToastContainer position='bottom-center' pauseOnHover={false} autoClose={1000}/>
            <Navigation />
            <main className="py-3">
                <Outlet />
            </main>
        </>
    );
}

export default App;
