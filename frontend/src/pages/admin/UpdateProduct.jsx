import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loder from '../../components/Loder';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from '@material-tailwind/react';
import { getAllCategory } from '../../redux/api/cetegoryApi';
import { toast } from 'react-toastify';
import { deleteProductById, getProductById, updateProductById } from '../../redux/api/ProductApi';
import myContext from '../../contexts/myContext';

function UpdateProduct() {
    const prams = useParams();
    const { loading, setLoading } = useContext(myContext);

    const navigate = useNavigate();

    const [categories, setCategories] = useState(null);
    const [productData, setProductData] = useState({
        name: '',
        images: '',
        description: '',
        price: 100,
        category: '',
        quantity: 0,
        brand: '',
        countInStock: '0',
    });

    const changehandler = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const getCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllCategory();
            setCategories(res.data);
            setLoading(false);
        } catch (error) {
            // console.log(error);
            toast.error(error.response.message || error.message);
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        console.log(productData);
        const formdata = new FormData();
        formdata.append('name', productData.name);
        formdata.append('description', productData.description);
        formdata.append('price', productData.price);
        formdata.append('category', productData.category);
        formdata.append('quantity', productData.quantity);
        formdata.append('brand', productData.brand);
        formdata.append('countInStock', productData.countInStock);
        setLoading(true);
        try {
            const res = await updateProductById({ id: prams.id, body: formdata });
            // console.log(res);
            toast.success(`${res.data.name} is updated succesfully`);
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await deleteProductById(prams.id);
            // console.log(res);
            toast.success(res.data.message);
            setLoading(false);
            navigate(-1);
        } catch (error) {
            // console.log(error);
            toast.error(error?.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    const setling = async () => {
        setLoading(true);
        try {
            const { data } = await getProductById(prams.id);
            setProductData({
                name: data.name || '',
                images: data.images || '',
                description: data.description || '',
                price: data.price || 100,
                category: data.category || '',
                quantity: data.quantity || 0,
                brand: data.brand || '',
                countInStock: data.countInStock || '0',
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        setling();
        getCategories();
    }, []);

    console.log(productData);

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="md:w-3/4 mx-auto bg-slate-950 p-4">
                <button onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
                <h1 className="text-3xl">create products</h1>
                {productData?.images && (
                    <div>
                        <img src={productData.images[0]?.url} alt="product" className="block mx-auto max-h-[200px]" />
                    </div>
                )}
                <div className="p-3">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="block">
                                Name
                            </label>
                            <input type="text" name="name" className="rounded-lg p-3 border bg-gray-900" value={productData.name} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price" className="block">
                                Price
                            </label>
                            <input type="number" name="price" className="rounded-lg p-3 border bg-gray-900" value={productData.price} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="brand" className="block">
                                Brand
                            </label>
                            <input type="text" name="brand" className="rounded-lg p-3 border bg-gray-900" value={productData.brand} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col  w-full">
                            <label htmlFor="quantity" className="block">
                                Qunatity
                            </label>
                            <input type="number" name="quantity" className="rounded-lg p-3 border bg-gray-900" value={productData.quantity} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="stock" className="block">
                                Count in Stock
                            </label>
                            <input type="number" name="countInStock" className="rounded-lg p-3 border bg-gray-900" value={productData.countInStock} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="category" className="block">
                                Category
                            </label>
                            <select name="category" className="rounded-lg p-3 border bg-gray-900" value={productData.category} onChange={changehandler}>
                                <option value="">-- select category --</option>
                                {categories?.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col my-4 w-full">
                        <label htmlFor="description" className="block">
                            Description
                        </label>
                        <textarea type="text" name="description" className="rounded-lg p-3 border bg-gray-900" value={productData.description} onChange={changehandler}></textarea>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <Button onClick={handleSubmit} className="bg-green-600 px-7 py-4">
                        {' '}
                        Update
                    </Button>

                    <Button onClick={handleDelete} className="bg-red-600 px-7 py-4">
                        {' '}
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
