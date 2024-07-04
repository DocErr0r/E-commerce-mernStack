import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';

import './a.css';
import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/auth/userThunk';

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // console.log(userInfo)
    const navigate = useNavigate();

    const [drowpDown, setDrowpDown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    // Dropdown Menu Functions
    function toggleDropdown() {
        setDrowpDown(!drowpDown);
    }
    function toggleSidebar() {
        setShowSidebar(!showSidebar);
    }
    function closeSidebar() {
        setShowSidebar(!showSidebar);
    }
    async function logoutHandler() {
        try {
            const result = await dispatch(logout());
            console.log(result);
            if (result.error) {
                // console.log('error');
                // console.log(result.payload)
                toast.error(result.payload);
            } else {
                navigate('/');
                // console.log(res)
                toast('logged out successfully.');
            }
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className={`${showSidebar ? 'hidden' : 'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between text-white bg-black p-4 w-[4%] hover:w-[15%] h-[100vh] fixed transition-[width] ease-in-out duration-300 overflow-hidden`} id="navContainer">
            <div className="flex flex-col justify-center space-y-4">
                <Link to={'/'} className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                    <span className="mt-[3rem] hidden home">HOME</span>{' '}
                </Link>
                <Link to={'/'} className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                    <span className="mt-[3rem] hidden home">SHOPPING</span>{' '}
                </Link>
                <Link to={'/'} className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
                    <span className="mt-[3rem] hidden home">CART</span>{' '}
                </Link>
                <Link to={'/'} className="flex items-center transition-transform transform hover:translate-x-2">
                    <FaHeart className="mr-2 mt-[3rem]" size={26} />
                    <span className="mt-[3rem] hidden home">FAVORITE</span>{' '}
                </Link>
            </div>

            <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center text-gray-8000 focus:outline-none">
                    {userInfo ? (
                        <>
                            <span className="text-white">{userInfo.name}</span>{' '}
                            <span>
                                <i>U</i>
                            </span>{' '}
                        </>
                    ) : (
                        <></>
                    )}{' '}
                </button>
                {drowpDown && userInfo && (
                    <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-700  ${!(userInfo.role === 'admin') ? '-top-36' : '-top-96'}`}>
                        {userInfo.role === 'admin' && (
                            <>
                                <li>
                                    <Link to={'/admin/dashboard'} className="block py-2 px-4 text-center hover:bg-gray-300">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/admin/user-list'} className="block py-2 px-4 text-center hover:bg-gray-300">
                                        Users
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/admin/prducts'} className="block py-2 px-4 text-center hover:bg-gray-300">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/admin/orders'} className="block py-2 px-4 text-center hover:bg-gray-300">
                                        Order
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/admin/catogory'} className="block py-2 px-4 text-center hover:bg-gray-300">
                                        Catogory
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to={'/v1/me'} className="block py-2 px-4 text-center hover:bg-gray-300">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to={'/v1/change-password'} className="block py-2 px-4 text-center hover:bg-gray-300">
                                Change Password
                            </Link>
                        </li>
                        <li>
                            <button to={'/'} onClick={logoutHandler} className="block py-2 px-4 w-full hover:bg-gray-300">
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            {!userInfo && (
                <ul>
                    <li>
                        <Link to={'/login'} className="flex items-center transition-transform transform hover:translate-x-2">
                            <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                            <span className="mt-[3rem] hidden home">Login</span>{' '}
                        </Link>
                    </li>
                    <li>
                        <Link to={'/register'} className="flex items-center transition-transform transform hover:translate-x-2">
                            <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                            <span className="mt-[3rem] hidden home">Register</span>{' '}
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Navigation;
