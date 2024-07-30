import './App.css';
import { Outlet } from 'react-router-dom';
import Navigation from './pages/auth/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useEffect } from 'react';
import Footer from './components/Footer/Footer';

function App() {
    // useEffect(()=>{
    // })
    return (
        <>
            <ToastContainer position="bottom-center" pauseOnHover={false} autoClose={1500} />
            <Navigation />
            <main className="pt-24 pb-4 min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
