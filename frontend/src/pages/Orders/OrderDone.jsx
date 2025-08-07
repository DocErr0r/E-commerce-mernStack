import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createRazorOrder, deliverOrder, getOrderDetail, getRazorpayKey, payOrder } from '../../redux/api/orderApi';
import { useSelector } from 'react-redux';
import myContext from '../../contexts/myContext';

function OrderDone() {
    const { id } = useParams();
    const { setLoading } = useContext(myContext);
    const [order, setOrder] = useState(null);
    const [change, setChange] = useState(false);
    const { userInfo } = useSelector((state) => state.user);
    const [paymentLoading, setPaymentLoading] = useState(false);
    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            try {
                const res = await getOrderDetail(id);
                setOrder(res.data.order);
            } catch (error) {
                toast.error('something worng...');
            }
            setLoading(false);
        };
        getOrders();
    }, [id, change]);

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

    const getRazorKey = async () => {
        const res = await getRazorpayKey();
        const key = await res.data.key;
        return key;
    };
    const createRazorpayOrder = async () => {
        const res = await createRazorOrder(order.totelPrice);
        return res;
    };
    const createRazorPayment = async () => {
        try {
            setPaymentLoading(true);
            const key = await getRazorKey();
            const response = await createRazorpayOrder();
            const { id: order_id, amount, currency } = response.data.order;
            setPaymentLoading(false);

            // Set up RazorPay options
            const options = {
                key: key,
                amount: amount,
                currency: currency,
                name: 'Eshop',
                description: 'Test Transaction',
                order_id: order_id,
                handler: async (response) => {
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
                    const paymentInfo = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    try {
                        const res = await payOrder({ id, body: { paymentInfo, update_time: Date.now() } });
                        console.log(res);

                        toast.success('order is paid');
                        setChange(!change);
                    } catch (error) {
                        setPaymentLoading(false);
                        toast.error(error.message);
                    }
                },
                prefill: {
                    name: 'john deo',
                    email: 'john.doe@example.com',
                    contact: '9999999999',
                    method: 'upi',
                },
                notes: {
                    address: 'Razorpay Corporate Office',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const razor = new window.Razorpay(options);
            razor.on('payment.failed', function (response) {
                setPaymentLoading(false);
                toast.error('Payment faild. Try again...', response.error.description);
                // alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
            });
            razor.open();
        } catch (err) {
            console.error(err);
            toast.error('Somthing wrong with payment. Try again...');
        }
    };

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
                                    {/* <div>By: {order.paymentResult.email}</div> */}
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
                                <button className="border w-full bg-pink-500 text-center py-2 my-4 rounded-full" onClick={createRazorPayment}>
                                    {paymentLoading ? 'Loading...' : 'Pay Now'}
                                </button>

                                {/* <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons> */}
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
