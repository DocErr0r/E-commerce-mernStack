import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deliverOrder, getOrderDetail } from '../../redux/api/orderApi';
import { useSelector } from 'react-redux';
import Payment from './Payment';
import Modal from '../../components/Modal';

function OrderDone() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [modal, setModel] = useState(false);
    const [change, setChange] = useState(false);
    const { userInfo } = useSelector((state) => state.user);
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await getOrderDetail(id);
                setOrder(res.data.order);
            } catch (error) {
                toast.error('something worng...');
            }
        };
        getOrders();
    }, [id, modal, change]);

    const setDeliverd = async () => {
        try {
            const res = await deliverOrder(id);
            console.log(res);
            setChange(!change);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto md:flex">
            {modal && <Payment onclose={() => setModel(false)} productId={id} />}
            {order && (
                <>
                    <div className="p-4 md:w-2/3">
                        <div className="overflow-x-auto mb-2">
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
                                    {order.orderItems.map((item) => (
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
                    </div>
                    <div className="md:w-1/3 p-4">
                        <div className=" border-gray-300">
                            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
                            <p>
                                <strong className="text-pink-500">Order:</strong> {order._id}
                            </p>
                            <p>
                                <strong className="text-pink-500">Name:</strong> {userInfo.name}
                            </p>
                            <p>
                                <strong className="text-pink-500">Email:</strong> {userInfo.email}
                            </p>
                            <p>
                                <strong className="text-pink-500">Address:</strong> {order.address}
                            </p>
                            <p>
                                <strong className="text-pink-500">Payment Method:</strong> {order.paymentMethod}
                            </p>
                            {order.paid ? (
                                <div className="border px-2 bg-green-600 py-2 my-4 rounded-md">
                                    Paid on: {Date(order.paidTime).toString()}
                                    <div>By: {order.paymentResult.email}</div>
                                    {order.delivered && <div>Delivered on: {Date(order.deliveredTime).toString()}</div>}
                                </div>
                            ) : (
                                <div className="border bg-blue-300 px-2 text-blue-700 py-2 rounded-md my-4">Not paid</div>
                            )}
                        </div>
                        <h2 className="text-xl font-semibold">Order Summery</h2>
                        <div className="w-full">
                            <div className="flex justify-between flex-wrap items-center">
                                Items price:<p>₹ {order.itemsPrice}</p>
                            </div>
                            <div className="flex justify-between flex-wrap items-center">
                                shipping price: <p>₹ {order.shippingPrice}</p>
                            </div>
                            <div className="flex justify-between flex-wrap items-center">
                                Tex price: <p>₹ {order.texPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between flex-wrap items-center">
                                Totel price: <p>₹ {order.totelPrice.toFixed(2)}</p>
                            </div>
                        </div>
                        {userInfo._id === order.orderedBy._id && !order.paid && (
                            <div className="border bg-pink-500 text-center py-2 my-4 rounded-full" onClick={() => setModel(true)}>
                                Pay Now
                            </div>
                        )}
                        {userInfo.role === 'admin' && order.paid && !order.delivered && (
                            <button className="border bg-pink-500 w-full text-center my-2 py-2" onClick={setDeliverd}>
                                Mark as delivere
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default OrderDone;