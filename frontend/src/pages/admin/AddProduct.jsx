import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@material-tailwind/react';
import Loder from '../../components/Loder';
import { createProduct, uploadImageFile } from '../../redux/api/ProductApi';
import { getAllCategory } from '../../redux/api/cetegoryApi';
import myContext from '../../contexts/myContext';

const AddProduct = () => {
    const { loading, setLoading } = useContext(myContext);
    const [productData, setProductData] = useState({
        name: '',
        image: '',
        description: '',
        price: 100,
        category: '',
        quantity: 0,
        brand: '',
        countInStock: '0',
    });
    const [categories, setCategories] = useState(null);

    const navigate = useNavigate();

    const [imageurl, setImageurl] = useState('');

    const changehandler = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        setLoading(true);
        console.log(productData);
        const formdata = new FormData();
        formdata.append('name', productData.name);
        formdata.append('image', productData.image);
        formdata.append('decription', productData.description);
        formdata.append('price', productData.price);
        formdata.append('category', productData.category);
        formdata.append('quantity', productData.quantity);
        formdata.append('brand', productData.brand);
        formdata.append('countInStock', productData.countInStock);
        try {
            const res = await createProduct(productData);
            // console.log(res);
            toast.success(`${res.data.name} is created succesfully`);
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    const getCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllCategory();
            setCategories(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.message || error.message);
            setLoading(false);
        }
    };
    const uploadFilehandler = async (e) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        console.log(formData);
        try {
            const res = await uploadImageFile(formData);
            // console.log(res);
            toast.success(res.data.message);
            setProductData({ ...productData, image: res.data.image });
            setImageurl(res.data.image);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);
    // console.log(categories);
    console.log(imageurl);

    if (loading) {
        return <Loder />;
    }

    return (
        <div className="mx-auto max-w-7xl ">
            <div className="md:w-3/4 mx-auto bg-slate-800 p-4">
                <button onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
                <h1 className="text-3xl">create products</h1>
                {imageurl && (
                    <div>
                        <img src={imageurl} alt="product" className="block mx-auto max-h=[200px]" />
                    </div>
                )}

                <div className="flex flex-col">
                    <label htmlFor="name" className="block">
                        Image Url
                    </label>
                    <input type="text" name="image" className="rounded-lg p-3 border w-full bg-gray-900" value={productData.image} onChange={(e)=>{changehandler(e),setImageurl(e.target.value)}} />
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="image" className="border block w-full text-center cursor-pointer rounded-lg font-bold p-4 ">
                        {productData.image ? productData?.image.name : 'Upload image'}
                        <input type="file" name="image" accept="image/*" onChange={uploadFilehandler} className={!productData?.image ? '' : 'text-white'} />
                    </label>
                </div> */}
                <div className="p-3">
                    <div className="flex flex-wrap gap-5 ">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="block">
                                Name
                            </label>
                            <input type="text" name="name" className="rounded-lg p-3 border w-[25rem] bg-gray-900" value={productData.name} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price" className="block">
                                Price
                            </label>
                            <input type="number" name="price" className="rounded-lg p-3 border w-[25rem] bg-gray-900" value={productData.price} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="brand" className="block">
                                Brand
                            </label>
                            <input type="text" name="brand" className="rounded-lg p-3 border w-[25rem] bg-gray-900" value={productData.brand} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="quantity" className="block">
                                Qunatity
                            </label>
                            <input type="number" name="quantity" className="rounded-lg p-3 border w-[25rem] bg-gray-900" value={productData.quantity} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="description" className="block">
                                Description
                            </label>
                            <textarea type="text" name="description" className="rounded-lg p-3 border bg-gray-900" value={productData.description} onChange={changehandler}></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="stock" className="block">
                                Count in Stock
                            </label>
                            <input type="number" name="countInStock" className="rounded-lg p-3 border w-[25rem] bg-gray-900" value={productData.countInStock} onChange={changehandler} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="category" className="block">
                                Category
                            </label>
                            <select name="category" className="rounded-lg p-3 border w-[25rem] bg-gray-900" onChange={changehandler}>
                                <option value="">--select category--</option>
                                {categories?.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <Button onClick={handleSubmit} className="bg-pink-600 px-7 py-4">
                    {' '}
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default AddProduct;
