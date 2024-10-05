import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../redux/api/userApiSlice';
// import { resetPassword } from '../../redux/api/UserApi'; // Make sure this API function exists

function ResetPassword() {
    const [showPass, setShowPass] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams(); // Assuming you pass a token as a URL parameter

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        setLoading(true);

        try {
            const res = await resetPassword({ token, password, confirmPassword }); // Adjust this function to match your API
            toast.success('Password reset successfully!');
            console.log(res);
            navigate('/login'); // Redirect to login page after success
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex mt-6 items-center justify-center">
            <div className="max-w-md w-full mx-2 p-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-4 text-pink-500">Reset Your Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            New Password
                        </label>
                        <input type={showPass ? 'text' : 'password'} id="password" className="border rounded w-full p-3 pr-12 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <div className=" absolute right-4 top-11">
                            <span
                                className="text-xl my-2"
                                onClick={(e) => {
                                    e.preventDefault(), setShowPass(!showPass);
                                }}>
                                {showPass ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                            Confirm Password
                        </label>
                        <input type={showPass ? 'text' : 'password'} id="confirmPassword" className="border rounded w-full p-3 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className={`w-full bg-pink-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'} transition-colors duration-300`} disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
