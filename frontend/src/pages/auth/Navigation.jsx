import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';

import './a.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
    const {userInfo}=useSelector((state)=>state.user)

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
                    {userInfo ? <span className='text-white'>{userInfo.name}</span> : <></>}
                </button>
            </div>

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
        </div>
    );
};

export default Navigation;
