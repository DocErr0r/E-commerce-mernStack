import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loder from '../../components/Loder';
import { Button } from '@material-tailwind/react';
import { FaPlus } from 'react-icons/fa';
import { getAdminProducts } from '../../redux/api/ProductApi';
import myContext from '../../contexts/myContext';

function ProductList() {
    const {loading,setLoading}=useContext(myContext)
    
    const navigate = useNavigate();

    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        try {
            const result = await getAdminProducts();
            // console.log(result);
            setProducts(result.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.message || error.message);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return loading ? (
        <Loder />
    ) : (
        <div className="mx-auto max-w-7xl p-4 bg-gray-900 ">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold mb-6">products ({products?.length})</h1>
                <Link to={'/admin/addproduct'} className="bg-purple-800 text-center flex items-center gap-1 rounded-xl px-4 py-2">
                    <FaPlus /> Add product
                </Link>
            </div>
            <div className="flex flex-wrap justify-around items-center">
                {products?.map((product) => (
                    <Link key={product._id} className="hover:bg-gray-700 hover:rounded-lg block overflow-hidden my-2">
                        <div className="flex flex-wrap rounded-lg p-2 bg-slate-950">
                            <img src={product.image} alt={product.name} className="w-[10rem] object-cover" />
                            <div className="flex flex-col p-4 justify-around">
                                <div className="flex justify-between">
                                    <h3 className="text-xl font-semibold">{product.name}</h3>
                                    <p className="text-sm">{new Date(product.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                                </div>
                                <div className="flex justify-between xl:w-[25rem] md:w-[15rem] sm:w-[10rem] mb-4">
                                    <p className="text-sm">{product.description?.substring(0, 120)}...</p>
                                    <span className="font-bold">₹ {product.price}</span>
                                </div>

                                <div className="flex justify-end xl:w-[25rem] md:w-[15rem] sm:w-[10rem]">
                                    <button onClick={() => navigate(`/admin/updateproduct/${product._id}`)} className="bg-pink-700 rounded-lg px-3 py-2 text-sm font-medium hover:bg-pink-800">
                                        Update product
                                    </button>
                                    {/* <Button className="bg-red-600 rounded-lg px-3 py-2 text-sm font-medium hover:bg-red-800">Delete product</Button> */}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
