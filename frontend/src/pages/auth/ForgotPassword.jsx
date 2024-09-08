import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { sendForgotPasswordEmail } from '../../redux/features/auth/userThunk'; // Assuming you have this action
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        //     const result = await dispatch(sendForgotPasswordEmail(email));
        //     if (result.error) {
        //         toast.error(result.payload.message);
            // } else {
        //         toast.success('Password reset email sent. Please check your inbox.');
            // }
            alert("Reset password link has been sent on your email address plaese check inbox")
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            <section className="flex flex-wrap justify-center items-center">
                <div className="p-4 rounded-xl border w-full sm:w-[45rem]">
                    <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
                    <p className="mb-6 text-gray-400">Enter your email address below and we’ll send you a link to reset your password.</p>
                    <form onSubmit={handleSubmit} className="container">
                        <div className="my-6">
                            <label htmlFor="email" className="text-sm font-medium block">
                                Email address
                            </label>
                            <input type="email" id="email" className="border rounded w-full mt-1 p-2" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="true" required />
                        </div>
                        <button type="submit" className="bg-pink-500 px-4 py-2 cursor-pointer rounded my-4 disabled:bg-pink-700" disabled={!email}>
                            Send Reset Link
                        </button>
                    </form>
                    <div className="mt-4">
                        <p>
                            Remembered your password?{' '}
                            <Link to="/login" className="hover:underline text-pink-500">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}