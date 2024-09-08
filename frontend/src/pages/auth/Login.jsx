import React, { useEffect, useState } from 'react';
import Loder from '../../components/Loder';
import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/auth/userThunk';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { lodding, error, userInfo } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const serachParams = new URLSearchParams(location.search);
    const redirect = serachParams.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            toast.success('login successfully');
            navigate(redirect);
        }
    }, [userInfo, navigate]);

    const submitHandeler = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(login({ email, password }));
            // console.log(result);
            if (result.error) {
                console.log(error);
                // console.log(result.payload)
                toast.error(result.payload.message);
            }
        } catch (error) {
            toast.error(error);
        }
        // try {
        //     dispatch(login({ email, password }))
        // } catch (error) {
        //     toast.error(error?.data?.message || error.message);
        // }
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            <section className="flex flex-wrap justify-center items-center">
                <div className="p-4 rounded-xl border w-full sm:w-[45rem] ">
                    <h1 className="text-2xl font-semibold mb-2">Sign In</h1>
                    <form onSubmit={submitHandeler} className="container">
                        <div className="my-6">
                            <label htmlFor="email" className="text-sm font-medium block">
                                Email address
                            </label>
                            <input type="email" id="email" className="border rounded w-full mt-1 p-2" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="true" />
                        </div>
                        <div className="my-6 relative">
                            <label htmlFor="password" className="text-sm font-medium block">
                                Password
                            </label>
                            <input type={showPass ? 'text' : 'password'} id="password" placeholder="Enter Password" className=" border rounded w-full mt-1 p-2 pr-12" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className=" absolute right-4 top-9">
                                <span
                                    className="text-xl my-2"
                                    onClick={(e) => {
                                        e.preventDefault(), setShowPass(!showPass);
                                    }}>
                                    {showPass ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-end text-pink-400 hover:underline'>
                            <Link to={'/forgotpassword'}>Forgot Password ?</Link>
                        </div>
                        <button disabled={!(email && password)} type="submit" className="bg-pink-500 px-4 py-2 cursor-pointer rounded my-4 disabled:bg-pink-700">
                            {'Sign In'}
                        </button>
                        {lodding && <Loder />}
                    </form>
                    <div className="mt-2">
                        <p>
                            New customer ?{' '}
                            <Link to={'/register'} className="hover:underline text-pink-500">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
                {/* {error && <div className="bg-red-800 p-32">{error}</div>} */}
            </section>
        </div>
    );
}
