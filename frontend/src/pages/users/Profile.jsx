import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { userInfo } = useSelector((state) => state.user);
    return (
        <div className="container p-4 mx-auto mt-[10rem]">
            <div className="flex justify-center align-middle md:flex md:space-x-4">
                <h2 className='text-2xl mb-4 font-semibold'>user</h2>

                <Link to={'/user-orders'} className='bg-pink-600 py-2 px-4 rounded hover:bg-pink-700'>My Orders</Link>
            </div>
        </div>
    );
}
