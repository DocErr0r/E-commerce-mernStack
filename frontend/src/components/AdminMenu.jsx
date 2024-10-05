import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

function AdminMenu() {
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar((prev) => !prev);
    };

    const closeSidebar = () => {
        setSidebar(false);
    };

    return (
        <div className="flex mx-2 justify-start">
            <button className="bg-pink-500 hover:bg-pink-700 p-3" aria-label="Toggle Admin Menu" onClick={toggleSidebar}>
                <AiOutlineMenu />
            </button>

            {sidebar && <div className="fixed inset-0 bg-black opacity-50" onClick={closeSidebar}></div>}

            <div className={`fixed inset-0 z-50 w-[20rem] top-0 h-[100vh] ${sidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-gray-600 rounded-r-lg`}>
                <div className="flex justify-between items-center border-b p-4 pb-2">
                    <h2 className="text-lg font-semibold text-white">ADMIN MENU</h2>
                    <button className="border py-1 px-3 hover:bg-gray-800" onClick={closeSidebar} aria-label="Close Menu">
                        X
                    </button>
                </div>
                <ul className="flex-col space-y-2 text-center text-white">
                    <MenuItem to="/admin/dashboard" onClick={closeSidebar}>
                        Dashboard
                    </MenuItem>
                    <MenuItem to="/admin/user-list" onClick={closeSidebar}>
                        All Users
                    </MenuItem>
                    <MenuItem to="/admin/orders" onClick={closeSidebar}>
                        All Orders
                    </MenuItem>
                    <MenuItem to="/admin/productlist" onClick={closeSidebar}>
                        All Products
                    </MenuItem>
                    <MenuItem to="/admin/addproduct" onClick={closeSidebar}>
                        Add product
                    </MenuItem>
                    <MenuItem to="/admin/category" onClick={closeSidebar}>
                        All Categories
                    </MenuItem>
                </ul>
            </div>
        </div>
    );
}

const MenuItem = ({ to, onClick, children }) => (
    <li onClick={onClick}>
        <NavLink
            to={to}
            className={({ isActive }) =>
                `block border rounded-lg mx-5 my-2 p-2 
                ${isActive ? 'bg-pink-600 text-white' : 'hover:bg-gray-800 transition duration-200'}`
            }>
            {children}
        </NavLink>
    </li>
);

export default AdminMenu;
