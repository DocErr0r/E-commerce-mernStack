import React, { useEffect, useState } from 'react';
import ProgressStep from '../../components/ProgressStep';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { setShippingAddress } from '../../redux/features/Cart/cartSlice';

function Shipping() {
    const { shopingAdress } = useSelector((state) => state.carts);

    const [formData, setFormData] = useState({
        country: '',
        state: '',
        city: '',
        pinCode: '',
        homeAddress: '',
        phone: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        setFormData(shopingAdress);
    }, [shopingAdress]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        const { country, state, city, pinCode, homeAddress, phone } = formData;
        if (!country) {
            toast.warn('Country is required');
            return;
        }
        if (!state) {
            toast.warn('State is required');
            return;
        }
        if (!city) {
            toast.warn('City is required');
            return;
        }
        if (!homeAddress) {
            toast.warn('Home address is required');
            return;
        }
        if (!pinCode || !/^\d{5,10}$/.test(pinCode)) {
            toast.warn('Pin code must be between 5 to 10 digits');
            return;
        }
        if (!phone || !/^\d{10,15}$/.test(phone)) {
            toast.warn('Phone number must be between 10 to 15 digits');
            return;
        }

        dispatch(setShippingAddress(formData));
        navigate('/order');
    };

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <ProgressStep />
            <div className="flex items-center justify-around flex-wrap">
                <form onSubmit={submitHandler} className="md:w-1/3 w-[80%]">
                    <h2 className="mt-4 text-2xl font-bold my-2">Shipping Address</h2>
                    {/* <h3 className="text-xl my-2">Address</h3> */}
                    {['country', 'state', 'city', 'pinCode', 'homeAddress'].map((field, index) => (
                        <div key={index} className="mb-4">
                            <label htmlFor={field} className="text-sm font-medium block mb-2">
                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                            </label>
                            <input type={field === 'pinCode' ? 'number' : 'text'} required id={field} name={field} placeholder={`Enter your ${field}`} value={formData[field]} onChange={handleChange} className="border rounded w-full p-2" minLength={field === 'pinCode' ? 6 : undefined} maxLength={field === 'pinCode' ? 6 : undefined} />
                        </div>
                    ))}
                    <div className="mb-4">
                        <label htmlFor="phone" className="text-sm font-medium block mb-2">
                            Phone No.
                        </label>
                        <input type="string" id="phone" name="phone" required minLength={10} maxLength={10} placeholder="Enter your phone Number" value={formData.phone} className="border rounded w-full p-2" onChange={handleChange} />
                    </div>
                    {/* <div className="mb-2">
                        <label htmlFor="country" className="text-sm font-medium block mb-2">
                            Country
                        </label>
                        <input type="text" id="country" placeholder="Enter your country" className="border rounded w-full p-2" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="state" className="text-sm font-medium block mb-2">
                            State
                        </label>
                        <input type="text" id="state" placeholder="Enter your state" className="border rounded w-full p-2" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="city" className="text-sm font-medium block mb-2">
                            City
                        </label>
                        <input type="text" id="city" placeholder="Enter your city" className="border rounded w-full p-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pinCode" className="text-sm font-medium block mb-2">
                            Pin Code
                        </label>
                        <input type="number" minLength={6} maxLength={6} id="pinCode" placeholder="Enter city pin code" className="border rounded w-full p-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="text-sm font-medium block mb-2">
                            Home address
                        </label>
                        <input type="text" id="address" placeholder="Enter delivery adderss" value={address} onChange={(e) => setAddress(e.target.value)} className="border rounded w-full p-2" />
                    </div> */}
                    <button type="submit" className="bg-pink-500 w-full text-center py-2 rounded-full">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Shipping;
