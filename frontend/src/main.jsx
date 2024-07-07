import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';

import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import store from './redux/store.js';

import PrivateRoute from './pages/users/PrivateRoute.jsx';
import Profile from './pages/users/Profile.jsx';
import EditProfile from './pages/users/EditProfile.jsx';
import ChangePassword from './pages/users/ChangePassword.jsx';

import AdminRoutes from './pages/admin/AdminRoutes.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import UsersList from './pages/admin/UsersList.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/about" element={<h1 style={{ marginTop: '100px' }}> home</h1>} />

            <Route path="/v1" element={<PrivateRoute />}>
                <Route path="me" element={<Profile />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="edit-profile" element={<EditProfile />} />
            </Route>

            <Route path="/admin" element={<AdminRoutes />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="user-list" element={<UsersList />} />
                <Route path="category" element={<CategoryList />} />
            </Route>
        </Route>,
    ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);
