import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loder from '../../components/Loder';
import { toast } from 'react-toastify';
import { updatecr } from '../../redux/features/auth/userThunk';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const { userInfo,error, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }, [userInfo]);
    
    

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(updatecr({name,email}));
            console.log(res);
            if (res.error) {
                toast.error(error);
            } else {
                toast.success('profile update successfully');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4 mt-[10rem]">
            <div className="flex justify-center items-center md:flex md:space-x-4">
                <div className="md:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-400">Update your profile information</p>
                    <div className="border-t border-gray-700 ">
                        {/* Form for editing profile */}
                        <form onSubmit={submitHandler}>
                            <div className="p-4">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
                                    <label htmlFor="name" className="block font-medium text-gray-400 sm:col-span-1">
                                        Name
                                    </label>
                                    <div className="sm:col-span-2">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 bg-gray-700 block w-full shadow-sm rounded-md text-gray-100" />
                                    </div>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
                                    <label htmlFor="email" className="block font-medium text-gray-400 sm:col-span-1">
                                        Email address
                                    </label>
                                    <div className="sm:col-span-2">
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 bg-gray-700 block w-full shadow-sm border-gray-600 rounded-md text-gray-100" />
                                    </div>
                                </div>
                                {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
                                    <label htmlFor="password" className="block font-medium text-gray-400 sm:col-span-1">
                                        Confrom your Password
                                    </label>
                                    <div className="sm:col-span-2">
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 bg-gray-700 block w-full shadow-sm border-gray-600 rounded-md text-gray-100" />
                                    </div>
                                </div> */}
                            </div>
                            {/* Add more form fields for other profile information */}
                            <div className="flex justify-between px-4 py-4 sm:px-6">
                                <Link to="/v1/me" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
                                    Back Profile{' '}
                                </Link>{' '}
                                <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                    {loading && <Loder />}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
