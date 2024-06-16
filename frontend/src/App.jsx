import './App.css';
import { Outlet } from 'react-router-dom';
import Navigation from './pages/auth/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

function App() {
    return (
        <>
            <ToastContainer position='bottom-center' pauseOnHover={false} autoClose={2000}/>
            <Navigation />
            <main className="py-3">
                <Outlet />
            </main>
        </>
    );
}

export default App;
