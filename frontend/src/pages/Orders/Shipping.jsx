import React, { useEffect, useState } from 'react';
import ProgressStep from '../../components/ProgressStep';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { setShippingAddress } from '../../redux/features/Cart/cartSlice';

function Shipping() {
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (address) {
            dispatch(setShippingAddress(address));
            navigate('/order');
        } else {
            toast.warn('please fill the details');
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <ProgressStep />
            <div className="flex items-center justify-around flex-wrap">
                <form onSubmit={submitHandler} className="md:w-1/3 w-[80%]">
                    <h2 className=" mt-4 text-2xl font-bold my-2">Shipping</h2>
                    <h3 className="text-xl my-2">Address</h3>
                    <div className="mb-2">
                        <label htmlFor="name" className="text-sm font-medium block mb-2">
                            Country
                        </label>
                        <input type="text" id="name" placeholder="Enter your country" className="border rounded w-full p-2" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="name" className="text-sm font-medium block mb-2">
                            State
                        </label>
                        <input type="text" id="name" placeholder="Enter your state" className="border rounded w-full p-2" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="name" className="text-sm font-medium block mb-2">
                            City
                        </label>
                        <input type="text" id="name" placeholder="Enter your city" className="border rounded w-full p-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="text-sm font-medium block mb-2">
                            Pin Code
                        </label>
                        <input type="number" minLength={6} maxLength={6} id="name" placeholder="Enter city pin code" className="border rounded w-full p-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="text-sm font-medium block mb-2">
                            Home address
                        </label>
                        <input type="text" id="name" placeholder="Enter delivery adderss" value={address} onChange={(e) => setAddress(e.target.value)} className="border rounded w-full p-2" />
                    </div>
                    <button type="submit" className="bg-pink-500 w-full text-center py-2 rounded-full">
                        Countinue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Shipping;
