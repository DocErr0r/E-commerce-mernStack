import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function VendorRoutes() {
    const { userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(userInfo.role === 'admin' || 'vendor')) {
            toast.warning('plaese login as admin...');
            navigate('/');
        }
    }, [userInfo]);

    return userInfo && (userInfo.role === 'admin' || 'vendor') ? <Outlet /> : <Navigate to={'/login'} replace />;
}

export default VendorRoutes;
