import React, { useEffect, useState } from 'react';
import { getDashboradData } from '../../redux/api/orderApi';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer, Line, LineChart, Pie, PieChart } from 'recharts';
import { AiOutlineUser } from 'react-icons/ai';
import { GiCardboardBoxClosed } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CustomTooltip = ({ active, payload }) => {
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
            setLoading(true);
            try {
                const response = await getDashboradData();
                setData(response.data.dashboardData);
                console.log(response.data);
            } catch (error) {
                setError('Failed to fetch dashboard data. Please try again later.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-600 text-center">{error}</div>;

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
                            <AiOutlineUser size={24} />
                        </div>
                        <div className="flex justify-between flex-wrap mt-2">
                            <label htmlFor="">Totel Customers</label>
                            <h1 className="text-xl font-bold">{data?.totelUsers}</h1>
                        </div>
                    </div>
                    <div className="rounded-lg bg-black p-5 w-[10rem] sm:w-[20rem] ">
                        <div className="font-bold rounded-full bg-pink-500 w-[3rem] text-center p-3">
                            <GiCardboardBoxClosed size={24} />
                        </div>
                        <div className="flex justify-between flex-wrap mt-2">
                            <Link to={'/admin/orders'}>Totel Orders</Link>
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
                {/* Line Chart: Revenue Trends */}
                {/* <div className="p-4">
                <h2 className="text-xl font-bold">Revenue Trends</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data?.selesByDate || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="totelSales" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div> */}

                {/* Sales By Category */}
                <div className="p-4">
                    <h2 className="text-xl font-bold">Sales By Category</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie data={data.salesByCategory} dataKey="totalSales" nameKey="_id" cx="50%" cy="50%" outerRadius={80} fill="#63bd63" label={({ name }) => name} />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Activity */}
                <div className="p-4">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <ul className="bg-gra-800 rounded-lg p-4">
                        {data.recentActivity.map((activity, index) => (
                            <li key={index} className="flex flex-col sm:flex-row max-sm:text-center justify-between border-b border-gray-700 py-2 last:border-0">
                                <span className="text-sm sm:text-base">{`Order Price: $${activity.totelPrice.toFixed(2)}`}</span>
                                <span className="text-sm sm:text-base">{`by: ${activity.orderedBy.email}`}</span>
                                <span className="text-sm sm:text-base">{new Date(activity.createdAt).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
export default Dashboard;
