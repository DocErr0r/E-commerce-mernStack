import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { ThemeProvider } from '@material-tailwind/react';

import MyState from './contexts/MyState.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <MyState>
                    <App />
                </MyState>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
);
