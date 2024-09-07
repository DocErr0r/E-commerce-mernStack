import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../../redux/api/orderApi';
import { Link } from 'react-router-dom';

function MyOrder() {
    const [MyOrder, setMyOrder] = useState(null);
    useEffect(() => {
        const getuserorders = async () => {
            const res = await getMyOrders();
            console.log(res.data);
            setMyOrder(res.data.orders);
        };
        getuserorders();
    }, []);

    if (!MyOrder?.length) {
        return (
            <div className="p-4 flex flex-col items-center justify-center">
                <h1>you have not any order..</h1>
                <Link to={'/shop'} className="bg-pink-500 my-4 rounded-full py-2 px-4">
                    continue shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="font-bold text-xl mb-3">Totel orders:{MyOrder.length}</h1>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border">
                        <tr>
                            <th className="p-2">Image</th>
                            <th className="p-2 text-left">ID</th>
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Totel</th>
                            <th className="p-2">Paid</th>
                            <th className="p-2">Deliverd</th>
                            <th className="p-2">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MyOrder.map((item) => (
                            <tr key={item._id}>
                                <td className="p-2">
                                    <img src={item.orderItems[0].image} alt={item.name} className="h-20 max-w-20 rounded-md object-cover" />
                                </td>
                                <td className="p-2">{item._id}</td>
                                <td className="p-2">{item.createdAt.substring(0, 10)}</td>
                                <td className="p-2">₹ {item.totelPrice}</td>
                                <td className="p-2">{item.paid ? <div className="bg-green-500 text-center rounded-full p-1">Complete</div> : <div className="bg-red-500 text-center rounded-full p-1">Pendding</div>}</td>
                                <td className="p-2">{item.delivered ? <div className="bg-green-500 text-center rounded-full p-1">Complete</div> : <div className="bg-red-500 text-center rounded-full p-1">Pendding</div>}</td>
                                <td className="p-2 text-center">
                                    <Link to={`/order/${item._id}`} className="bg-pink-400 py-2 px-4 rounded-md">
                                        <span>view Details</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyOrder;
