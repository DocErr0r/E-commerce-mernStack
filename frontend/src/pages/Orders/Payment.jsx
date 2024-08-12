import React from 'react';
import ProgressStep from '../../components/ProgressStep';
import { toast } from 'react-toastify';
import { payOrder } from '../../redux/api/orderApi';
import { useSelector } from 'react-redux';

function Payment({ onclose, productId }) {
    const { userInfo } = useSelector((state) => state.user);
    const handelPayment = async () => {
        try {
            const res = await payOrder({ id: productId, body: { id: '143rnc', status: 'processing', update_time: Date.now(), payer_email: userInfo.email } });
            console.log(res);
            onclose();
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    return (
        <div className="flex left-0 fixed w-full p-4">
            <div className="bg-gray-950 opacity-85 fixed inset-0"></div>
            <div className="max-w-screen-xl mx-auto z-10 w-full">
                <ProgressStep step1 step2 />
                <div className="flex items-center justify-end mt-40 gap-2 flex-col">
                    <button className="border bg-pink-500 text-center py-2 my-4 rounded-full md:w-1/3 w-full" onClick={handelPayment}>
                        Done
                    </button>
                    <button className="border bg-pink-500 text-center py-2 my-4 rounded-full md:w-1/3 w-full" onClick={onclose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
