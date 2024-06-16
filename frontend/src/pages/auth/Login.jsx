import React, { useEffect, useState } from 'react';
import Loder from '../../components/Loder';
import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/auth/authSlice';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { lodding, error, userInfo } = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo); 
            toast.info(userInfo.message);
            navigate('/');
        }
    }, [userInfo]);

    const submitHandeler = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(login({ email, password }));

            if (result.error) {
                toast.error(result.payload);
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
        <div>
            <section className="pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
                    <form onSubmit={submitHandeler} className="container w-[40rem]">
                        <div className="my-[2rem]">
                            <label htmlFor="email" className="text-sm font-medium block">
                                Email address
                            </label>
                            <input type="email" id="email" className="border rounded w-full mt-1 p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="my-[2rem]">
                            <label htmlFor="password" className="text-sm font-medium block">
                                Password
                            </label>
                            <input type="password" id="password" className="border rounded w-full mt-1 p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button disabled={!(email && password)} type="submit" className="bg-pink-500 px-4 py-2 cursor-pointer rounded my-4 disabled:bg-pink-700">
                            {'Sign In'}
                        </button>
                        {lodding && <Loder />}
                    </form>
                    <div className="mt-4">
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
