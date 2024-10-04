import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { ThemeProvider } from '@material-tailwind/react';

import MyState from './contexts/MyState.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <PayPalScriptProvider>
                    <MyState>
                        <App />
                    </MyState>
                </PayPalScriptProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
);
