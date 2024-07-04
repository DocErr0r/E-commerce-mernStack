import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePass } from '../../redux/features/auth/userThunk';
import { toast } from 'react-toastify';

function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const {loading,error}=useSelector(state=>state.user)
    const dispatch=useDispatch()

    const handelSubmit=async(e)=>{
        e.preventDefault()
        // console.log(oldPassword,newPassword,confirmPassword)
        const res= await dispatch(updatePass({password,newPassword,confirmPass}))
        // console.log(res)
        if(!res.error){
            toast.success('password change successfully')
            setPassword('')
            setNewPassword('')
            setConfirmPass('')
        }
        
    }
    return (
        <div className="container mx-auto mt-[10rem]">
            <div className="flex justify-center align-middle md:flex md:space-x-4">
                <div className="md:w-1/3 bg-purple-700 p-4 rounded-2xl">
                    <h2 className="text-2xl text-center font-semibold mb-4">Change Password</h2>
                    <form onSubmit={handelSubmit}>
                        <div className="p-4">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
                                <label htmlFor="password" className="block font-medium text-pink-400 sm:col-span-1">
                                    Old Password
                                </label>
                                <div className="sm:col-span-2">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 bg-gray-700 block w-full shadow-sm border-gray-600 rounded-md text-gray-100" />
                                </div>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
                                <label htmlFor="name" className="block font-medium text-pink-400 sm:col-span-1">
                                    New Password
                                </label>
                                <div className="sm:col-span-2">
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="p-2 bg-gray-700 block w-full shadow-sm rounded-md text-gray-100" />
                                </div>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
                                <label htmlFor="email" className="block font-medium text-pink-400 sm:col-span-1">
                                    Confirm password
                                </label>
                                <div className="sm:col-span-2">
                                    <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="p-2 bg-gray-700 block w-full shadow-sm border-gray-600 rounded-md text-gray-100" />
                                </div>
                            </div>
                        </div>
                        {/* Add more form fields for other profile information */}
                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
                                Save Changes
                            </button>
                            <Link to="/forgot-password" className="text-pink-300 hover:text-pink-400">
                                Forgot Password?
                            </Link>
                        </div>
                    </form>
            {error&& <div className='m-2 text-red-500 text-center'>{error}</div> }
                </div>
                {loading && <Loder />}
            </div>
        </div>
    );
}

export default ChangePassword;
