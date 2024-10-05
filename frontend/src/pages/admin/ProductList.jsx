import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loder from '../../components/Loder';
import { Button } from '@material-tailwind/react';
import { FaPlus } from 'react-icons/fa';
import { getAdminProducts } from '../../redux/api/ProductApi';
import myContext from '../../contexts/myContext';
import { AiOutlineArrowRight } from 'react-icons/ai';

function ProductList() {
    const { loading, setLoading } = useContext(myContext);

    const navigate = useNavigate();

    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        try {
            const result = await getAdminProducts();
            // console.log(result);
            setProducts(result.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || error.message);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return loading ? (
        <Loder />
    ) : (
        <div className="mx-auto max-w-7xl p-4 bg-graay-900 ">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold mb-6">products ({products?.length})</h1>
                <Link to={'/admin/addproduct'} className="bg-purple-800 text-center flex items-center gap-1 rounded-xl px-4 py-2">
                    <FaPlus /> Add product
                </Link>
            </div>
            <div className="flex flex-wrap justify-around items-center">
                {products?.map((product) => (
                    <Link key={product._id} className="hover:bg-gray-700 md:w-auto w-full hover:rounded-lg block  my-2">
                        <div className="flex sm:flex-row border flex-col rounded-lg p-2 shadow-xl bg-slaate-950">
                            <div className="sm:w-[10rem] w-[70%] mx-auto">
                                <img src={product.images[0]?.url} alt={product.name} className="h-full object-cover" />
                            </div>
                            <div className="flex flex-col p-4 w-full justify-around">
                                <div className="flex justify-between">
                                    <h3 className="text-xl font-semibold">{product.name}</h3>
                                    <p className="text-sm">{new Date(product.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                                </div>
                                <div className="xl:w-[25rem] md:w-[15rem] w-full mb-4">
                                    <p className="text-sm">{product.description?.substring(0, 120)}...</p>
                                </div>

                                <div className="flex justify-between  w-full">
                                    <button onClick={() => navigate(`/admin/updateproduct/${product._id}`)} className="bg-pink-700 flex gap-2 items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-pink-800">
                                        Update product <AiOutlineArrowRight size={20} />
                                    </button>
                                    <span className="font-bold">₹ {product.price}</span>
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
