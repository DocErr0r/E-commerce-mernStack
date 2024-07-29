import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart, AiOutlinePhone, AiOutlineUser, AiOutlineMenu } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';

import './a.css';
import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/auth/userThunk';
import { Menu, MenuHandler, MenuList } from '@material-tailwind/react';

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
    // function closeSidebar() {
    //     setShowSidebar(!showSidebar);
    // }
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
        <div className={`w-full text-white bg-black fixed `}>
            <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center p-4">
                 <button className="md:hidden bg-gray-600 p-2 rounded-md hover:bg-gray-800" onClick={toggleSidebar}>
                        <AiOutlineMenu size={22} />
                    </button>
                <Link to={'/'} className="">
                    <h1 className="font-bold font-mono text-3xl text-cyan-700">ESHOP</h1>
                </Link>
                <div className={`md:flex gap-5  md:w-auto w-full md:order-none order-1 items-center ${showSidebar ? '' : 'hidden'} `}>
                    <Link to={'/'} className="flex items-center transition-transform m-2 transform hover:translate-x-2 ">
                        <AiOutlineHome className="mr-2  " size={22} />
                        <span>HOME</span>{' '}
                    </Link>
                    <Link to={'/shop'} className="flex items-center transition-transform m-2 transform hover:translate-x-2">
                        <AiOutlineShopping className="mr-2 " size={22} />
                        <span className="">SHOPPING</span>{' '}
                    </Link>
                    <Link to={'/about'} className="flex items-center transition-transform m-2 transform hover:translate-x-2">
                        <AiOutlineShopping className="mr-2 " size={22} />
                        <span className="">About Us</span>{' '}
                    </Link>
                    <Link to={'/contact-us'} className="flex items-center transition-transform m-2 transform hover:translate-x-2">
                        <AiOutlinePhone className="mr-2 rotate-90 " size={22} />
                        <span className="">Contact Us</span>{' '}
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <Link to={'/'} className="flex items-center transition-transform transform hover:translate-x-1">
                        <AiOutlineShoppingCart className="mr-2 " size={22} />
                        {/* <span className="max-md:hidden ">CART</span>{' '} */}
                    </Link>
                    <Link to={'/'} className="flex items-center transition-transform transform hover:translate-x-1">
                        <FaHeart className="mr-2 " size={22} />
                        {/* <span className="max-md:hidden ">FAVORITE</span>{' '} */}
                    </Link>

                    {/* <Menu> */}
                    {/* <MenuHandler> */}
                    <button onClick={toggleDropdown} className="flex items-center text-gray-8000 focus:outline-none">
                        {/* {userInfo ? (
                            <>
                                <span className="text-white mx-2">{userInfo.name}</span> <span>▽</span>{' '}
                            </>
                        ) : ( */}
                        <div>
                            <AiOutlineUser size={26} className="text-white" />
                        </div>
                        {/* )}{' '} */}
                    </button>
                   
                    {/* </MenuHandler> */}
                    <div className="relative mt-14 items-center">
                        {userInfo
                            ? drowpDown && (
                                  // <MenuList>
                                  <ul className={`absolute w-[10rem] -right-0 flex flex-col space-y-2 bg-gray-600 text-white border-none rounded-lg`}>
                                      {userInfo.role === 'admin' && (
                                          <>
                                              <li>
                                                  <Link to={'/admin/dashboard'} className="block p-2 hover:bg-slate-800 hover:rounded-md">
                                                      Dashboard
                                                  </Link>
                                              </li>
                                              <li>
                                                  <Link to={'/admin/user-list'} className="block p-2 hover:bg-gray-800 hover:rounded-md">
                                                      Users
                                                  </Link>
                                              </li>
                                              <li>
                                                  <Link to={'/admin/productlist'} className="block p-2 hover:bg-gray-800 hover:rounded-md">
                                                      Products
                                                  </Link>
                                              </li>
                                              <li>
                                                  <Link to={'/admin/orders'} className="block p-2 hover:bg-gray-800 hover:rounded-md">
                                                      Order
                                                  </Link>
                                              </li>
                                              <li>
                                                  <Link to={'/admin/category'} className="block p-2 hover:bg-gray-800 hover:rounded-md">
                                                      Catogory
                                                  </Link>
                                              </li>
                                          </>
                                      )}
                                      <li>
                                          <Link to={'/v1/me'} className="block p-2 hover:bg-gray-800 hover:rounded-md">
                                              Profile
                                          </Link>
                                      </li>
                                      <li>
                                          <Link to={'/v1/change-password'} className="block p-2 hover:bg-gray-800 hover:rounded-md">
                                              Change Password
                                          </Link>
                                      </li>
                                      <li>
                                          <button to={'/'} onClick={logoutHandler} className="block text-left p-2 w-full hover:bg-gray-800 hover:rounded-md">
                                              Logout
                                          </button>
                                      </li>
                                  </ul>
                              )
                            : drowpDown && (
                                  <ul className=" absolute w-[10rem] -right-0 flex flex-col space-y-2 bg-gray-600 text-white border-none py-2 px-3 rounded-lg">
                                      <li>
                                          <Link to={'/login'} className="flex items-center p-2 transition-transform transform hover:translate-x-2">
                                              <AiOutlineLogin className="mr-2 " size={26} />
                                              <span className="">Login</span>{' '}
                                          </Link>
                                      </li>
                                      <li>
                                          <Link to={'/register'} className="flex items-center p-2 transition-transform transform hover:translate-x-2">
                                              <AiOutlineUserAdd className="mr-2 " size={26} />
                                              <span className="">Register</span>{' '}
                                          </Link>
                                      </li>
                                  </ul>
                              )}
                        {/* </MenuList> */}
                    </div>
                    {/* </Menu> */}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
