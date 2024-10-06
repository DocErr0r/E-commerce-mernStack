import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deliverOrder, getClientId, getOrderDetail, payOrder } from '../../redux/api/orderApi';
import { useSelector } from 'react-redux';
import Payment from './Payment';
import Modal from '../../components/Modal';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

function OrderDone() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [modal, setModel] = useState(false);
    const [change, setChange] = useState(false);
    const [paypalId, setPaypalId] = useState('');
    const { userInfo } = useSelector((state) => state.user);
    const getPaypalId = async () => {
        const { data } = await getClientId();
        setPaypalId(data.clientId);
    };
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
        getPaypalId();
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

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            currency: 'USD',
                            value: order.totelPrice,
                        },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    };
    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            try {
                const paymentId = details.id;
                const payer = details.payer.email_address;
                const status = details.status;
                // console.log(details);
                await payOrder({ id, body: { id: paymentId, status, update_time: Date.now(), payer_email: payer } });
                toast.success('order is paid');
                setChange(!change);
            } catch (error) {
                console.log(error);
            }
        });
    };
    function onError(err) {
        toast.error(err.message);
    }

    useEffect(() => {
        if (paypalId) {
            try {
                const loadingpaypal = async () => {
                    paypalDispatch({
                        type: 'resetOptions',
                        value: {
                            'client-id': paypalId,
                            currency: 'USD',
                        },
                    });
                    paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
                };
                if (order && !order.paid) {
                    if (!window.paypal) {
                        loadingpaypal();
                    }
                }
            } catch (error) {
                console.log('worng');
            }
        }
    }, [order, paypalId]);

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-screen-xl mx-auto md:flex">
            {/* {modal && <Payment onclose={() => setModel(false)} productId={id} />} */}
            {order && (
                <>
                    <div className="p-4 md:w-2/3">
                        <div className="overflow-x-auto mb-2 sticky top-[6rem]">
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
                                <strong className="text-pink-500">Name:</strong> {order.orderedBy.name}
                            </p>
                            <p>
                                <strong className="text-pink-500">Email:</strong> {order.orderedBy.email}
                            </p>
                            <p>
                                <strong className="text-pink-500">Payment Method:</strong> {order.paymentMethod}
                            </p>
                            <div className="flex flex-col">
                                <strong className="text-pink-500">Address:</strong>
                                <div className="ml-4 flex flex-col">
                                    <span>Country: {order.address.country}</span>
                                    <span>State: {order.address.state}</span>
                                    <span>City: {order.address.city}</span>
                                    <span>Pin Code: {order.address.pinCode}</span>
                                    <span>Home Address: {order.address.homeAddress}</span>
                                    <span>Phone Number : {order.address.phone}</span>
                                </div>
                            </div>
                            {order.paid ? (
                                <div className="border px-2 bg-green-600 py-2 my-4 rounded-md">
                                    Paid on: {new Date(order.paidTime).toLocaleString()}
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
                            <div className="mt-3 relative z-0">
                                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                            </div>
                            // <div className="border bg-pink-500 text-center py-2 my-4 rounded-full" onClick={() => setModel(true)}>
                            //     Pay Now
                            // </div>
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
