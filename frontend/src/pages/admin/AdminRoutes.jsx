import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminMenu from '../../components/AdminMenu';

function AdminRoutes() {
    const { userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(userInfo.role === 'admin')) {
            toast.warning('plaese login as admin...');
            navigate('/');
        }
    }, [userInfo, navigate]);

    return userInfo && userInfo.role === 'admin' ? (
        <>
            <AdminMenu />
            <Outlet />
        </>
    ) : (
        <Navigate to={'/login'} replace />
    );
}

export default AdminRoutes;
