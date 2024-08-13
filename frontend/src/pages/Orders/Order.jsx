import React from 'react';
import ProgressStep from '../../components/ProgressStep';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/api/orderApi';
import { toast } from 'react-toastify';
import { clearOrder } from '../../redux/features/order/productOrderSlice';

function Order() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.carts);
    const OProduct = useSelector((state) => state.productOrderSlice);
    const dispatch = useDispatch();
    console.log(OProduct);

    const placeOderHandler = async (e) => {
        try {
            const { data } = await createOrder({
                orderItems: OProduct.orderProduct,
                address: cart.shopingAdress.address,
                paymentMethod: 'upi',
                itemsPrice: OProduct.itemsPrice,
            });
            dispatch(clearOrder());
            console.log(data);
            toast.success(data.message);
            navigate(`/order/${data.order._id}`);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Something worng ...');
        }
    };
    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <ProgressStep step1 />
            <h2 className=" mt-4 text-2xl font-bold my-2">Order summary</h2>
            <div className="shadow-xl p-4 rounded-lg my-2 flex flex-wrap gap-5 border border-gray-600">
                <div className="flex gap-2">
                    <strong>address: </strong>
                    <p>{cart.shopingAdress.address}</p>
                </div>
            </div>
            {OProduct ? (
                <div className="overflow-auto mb-2">
                    <table className="w-full mx-auto border">
                        <thead className="border ">
                            <tr>
                                <td className="px-2 py-1">Image</td>
                                <td className="px-2 py-1">Product</td>
                                <td className="px-2 py-1">Quantity</td>
                                <td className="px-2 py-1">Price</td>
                                <td className="px-2 py-1">Totel Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            {OProduct?.orderProduct.map((item) => (
                                <tr key={item._id}>
                                    <td className="p-2">
                                        <img src={item.image} alt={item.name} className="h-20 max-w-20 rounded-md object-cover" />
                                    </td>
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.qty}</td>
                                    <td className="p-2">{item.price.toFixed(2)}</td>
                                    <td className="p-2">{(item.price * item.qty).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1>not product for order</h1>
            )}

            <div className="shadow-xl p-4 rounded-lg mb-4 flex flex-wrap gap-5 border">
                <div className="w-full">
                    <div className="flex justify-between flex-wrap items-center">
                        Items price:<p>₹ {OProduct.itemsPrice}</p>
                    </div>
                    <div className="flex justify-between flex-wrap items-center">
                        shipping price: <p>₹ {OProduct.shippingPrice}</p>
                    </div>
                    <div className="flex justify-between flex-wrap items-center">
                        Tex price: <p>₹ {OProduct.tex}</p>
                    </div>
                    <div className="flex justify-between flex-wrap items-center">
                        Totel price: <p>₹ {OProduct.totelPrice}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-around flex-wrap">
                <button onClick={placeOderHandler} className="bg-pink-500 w-full md:w-[40rem] text-center py-2 rounded-full">
                    Order Now
                </button>
            </div>
        </div>
    );
}

export default Order;
