import React, { useEffect, useState } from 'react';
import { getDashboradData } from '../../redux/api/orderApi';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AiOutlineUser } from 'react-icons/ai';
import { GiCardboardBoxClosed } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CustomTooltip = ({ active, payload }) => {
        // console.log(active,payload);
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 border border-gray-700 p-2 rounded">
                    <p className="text-white">{`Sales: $${payload[0].value.toFixed(2)}`}</p>
                    <p className="text-gray-400">{`Date: ${payload[0].payload._id}`}</p>
                </div>
            );
        }
        return null;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDashboradData();
                console.log(response.data.dashboardData);
                setData(response.data.dashboardData);
            } catch (error) {
                setError('Failed to fetch data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="max-w-screen-xl mx-auto p-4">
            <h1 className="sm:text-3xl text-xl font-bold mb-4 uppercase">Dashboard</h1>
            <div>
                <div className="flex justify-around flex-wrap gap-2 p-4">
                    <div className="rounded-lg bg-black p-5 w-[10rem] sm:w-[20rem] ">
                        <div className="font-bold rounded-full bg-pink-500 w-[3rem] text-center p-3">$</div>
                        <div className="flex justify-between flex-wrap mt-2">
                            <label htmlFor="" className="text-xl">
                                Totel sals{' '}
                            </label>
                            <h1 className="text-xl font-bold">${data?.totelSales.toFixed(2)}</h1>
                        </div>
                    </div>
                    <div className="rounded-lg bg-black p-5 w-[10rem] sm:w-[20rem]">
                        <div className="font-bold rounded-full bg-pink-500 w-[3rem] text-center p-3">
                            <AiOutlineUser size={24}/>
                        </div>
                        <div className="flex justify-between flex-wrap mt-2">
                            <label htmlFor="">Totel Customers</label>
                            <h1 className="text-xl font-bold">{data?.totelUsers}</h1>
                        </div>
                    </div>
                    <div className="rounded-lg bg-black p-5 w-[10rem] sm:w-[20rem] ">
                        <div className="font-bold rounded-full bg-pink-500 w-[3rem] text-center p-3">
                            <GiCardboardBoxClosed size={24}/>
                        </div>
                        <div className="flex justify-between flex-wrap mt-2">
                        <Link to={'/admin/orders'} >Totel Orders</Link>
                            <h1 className="text-xl font-bold">{data?.totelOrders}</h1>
                        </div>
                    </div>
                </div>

                {/* Bar Chart: Sales Over Time */}
                <div className="p-4">
                    <h2 className="text-xl font-bold">Sales Over Time</h2>
                    {/* <div>
                        <input type="date" name="start" value={dateRange.start} onChange={handleDateChange} />
                        <input type="date" name="end" value={dateRange.end} onChange={handleDateChange} />
                        <button onClick={filterSalesData}>Filter</button>
                    </div> */}
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data?.selesByDate}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="_id" stroke="#ccc" />
                            <YAxis dataKey="totelSales" stroke="#ccc" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="totelSales" fill="#63bd63" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
