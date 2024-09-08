import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../redux/features/auth/userThunk';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup() {
    const [showPass, setShowPass] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { userInfo, error, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (userInfo) {
            // console.log(userInfo);
            toast('register successfully');
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            toast.error('password did not match');
        } else {
            try {
                const result = await dispatch(register({ name, email, password }));
                // console.log(result);
                if (result.error) {
                    // console.log(error);
                    // console.log(result.payload);
                    toast.error(result.payload.message || result.payload);
                }
            } catch (error) {
                toast.error(error);
            }
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            <section className="flex flex-wrap justify-center items-center">
                <div className="p-4 rounded-xl border w-full sm:w-[45rem] ">
                    <h1 className="text-2xl font-semibold mb-2">Sign Up</h1>
                    <form onSubmit={submitHandler} className="container">
                        <div className="my-6">
                            <label htmlFor="name" className="text-sm font-medium block">
                                Name
                            </label>
                            <input type="text" id="name" placeholder="Enter Name" className="border rounded w-full mt-1 p-2" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="my-6">
                            <label htmlFor="email" className="text-sm font-medium block">
                                Email address
                            </label>
                            <input type="email" id="email" placeholder="Enter Email" className="border rounded w-full mt-1 p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="my-6 relative">
                            <label htmlFor="password" className="text-sm font-medium block">
                                Password
                            </label>
                            <input type={showPass ? 'text' : 'password'} id="password" placeholder="Enter Password" className="border rounded w-full mt-1 p-2 pr-12" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="true" />
                            <div className="absolute top-2 right-4">
                                <span
                                    className="text-xl my-2 mx-2"
                                    onClick={(e) => {
                                        e.preventDefault(), setShowPass(!showPass);
                                    }}>
                                    {showPass ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <div className="my-6">
                            <label htmlFor="cpassword" className="text-sm font-medium block">
                                conform Password
                            </label>
                            <input type={showPass ? 'text' : 'password'} id="cpassword" placeholder="Conform Password" className="border rounded w-full mt-1 p-2" value={cpassword} onChange={(e) => setCpassword(e.target.value)} autoComplete="true" />
                        </div>
                        <button disabled={!(name && email && password && cpassword)} type="submit" className="bg-pink-500 px-4 py-2 cursor-pointer rounded my-4 disabled:bg-pink-800">
                            {'Sign In'}
                        </button>
                        {loading && <Loder />}
                    </form>
                    <div className="mt-2">
                        <p>
                            Already have account?{' '}
                            <Link to={'/login'} className="hover:underline text-pink-500">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
