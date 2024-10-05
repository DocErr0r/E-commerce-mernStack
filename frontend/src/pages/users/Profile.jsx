import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { userInfo, loading } = useSelector((state) => state.user);

    if (loading) {
        return <div className="text-center text-gray-400">Loading...</div>;
    }
    
    return (
        <div className="mx-auto max-w-4xl p-4 mt-10">
            <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
            <div className="flex flex-col justify-center md:flex-row md:space-x-4 overflow-auto">
                {/* Profile Photo Section */}
                <div className="md:w-1/3 flex items-center justify-center">{userInfo.image ? <img src={userInfo.image} alt="Profile" className="rounded-full w-32 h-32 object-cover" /> : <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center text-gray-200">No Image</div>}</div>

                {/* Profile Details Section */}
                <div className="md:w-2/3">
                    {/* <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-200">Your Profile</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-400">Manage your profile information</p>
                    </div> */}
                    <div className="border-t mt-2 border-gray-700 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-700">
                            <div className="py-4 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-400">Name</dt>
                                <dd className="mt-1 text-sm text-gray-100 sm:col-span-2">{userInfo.name}</dd>
                            </div>
                            <div className="py-4 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-400">ID</dt>
                                <dd className="mt-1 text-sm text-gray-100 col-span-2">{userInfo._id}</dd>
                            </div>
                            <div className="py-4 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-400">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-100 sm:col-span-2">{userInfo.email}</dd>
                            </div>
                            <div className="py-4 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-400">Role</dt>
                                <dd className="mt-1 text-sm text-gray-100 sm:col-span-2">{userInfo.role}</dd>
                            </div>
                            {/* Add more profile information as needed */}
                        </dl>
                    </div>
                    <div className="px-4 py-4 sm:px-6">
                        <div className="flex justify-between">
                            <Link to="/v1/edit-profile" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
                                Edit Profile
                            </Link>
                            <Link to="/v1/order-details" className="ml-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
                                Order Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
