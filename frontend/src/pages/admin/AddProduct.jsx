import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@material-tailwind/react';
import Loder from '../../components/Loder';
import { createProduct } from '../../redux/api/ProductApi';
import { getAllCategory } from '../../redux/api/cetegoryApi';
import myContext from '../../contexts/myContext';

const AddProduct = () => {
    const { loading, setLoading } = useContext(myContext);
    const [productData, setProductData] = useState({
        name: '',
        images: '',
        description: '',
        price: 100,
        category: '',
        quantity: 0,
        brand: '',
        countInStock: 0,
    });
    const [categories, setCategories] = useState(null);

    const navigate = useNavigate();

    const [imageurls, setImageurls] = useState([]);

    const changehandler = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        console.log(productData);
        if (!productData.name || !productData.brand || !productData.category || !productData.countInStock || !productData.description || !productData.images || !productData.quantity || !productData.price) {
            toast.error('please fill all the fileds');
            return;
        }
        const formdata = new FormData();
        formdata.append('name', productData.name);
        productData.images.forEach((file) => {
            formdata.append('images', file); // Use 'images' if your backend expects an array
        });
        formdata.append('description', productData.description);
        formdata.append('price', productData.price);
        formdata.append('category', productData.category);
        formdata.append('quantity', productData.quantity);
        formdata.append('brand', productData.brand);
        formdata.append('countInStock', productData.countInStock);
        for (let [key, value] of formdata.entries()) {
            console.log(key, value);
        }
        setLoading(true);
        try {
            const res = await createProduct(formdata);
            console.log(res);
            toast.success(`${res.data.name} is created succesfully`);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
        } finally {
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
    // const uploadFilehandler = async (e) => {
    //     setLoading(true);
    //     const formData = new FormData();
    //     formData.append('image', e.target.files[0]);
    //     console.log(formData);
    //     try {
    //         const res = await uploadImageFile(formData);
    //         // console.log(res);
    //         toast.success(res.data.message);
    //         setProductData({ ...productData, image: res.data.image });
    //         setImageurls(res.data.image);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error?.response?.data?.message || error.message);
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        getCategories();
    }, []);
    // console.log(categories);
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImageurls(imageUrls);
        setProductData({ ...productData, images: files });
    };

    return (
        <div className="mx-auto max-w-7xl ">
            <div className="md:w-3/4 mx-auto bg-slate-800 p-4">
                <button onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
                <h1 className="text-3xl">create products</h1>
                <div className="flex flex-col w-full">
                    <label htmlFor="images" className="block text-white mb-1">
                        Images
                    </label>
                    <input type="file" accept="images/*" multiple onChange={handleImageChange} className="rounded-lg p-3 border border-gray-600 w-full bg-gray-900 text-white" />
                </div>
                {imageurls.length > 0 && (
                    <>
                        <h3>Image Preview:</h3>
                        <div className="flex flex-wrap">
                            {imageurls.map((image, index) => (
                                <img key={index} src={image} alt={`Preview ${index}`} className="h-20 w-25 object-cover" />
                            ))}
                        </div>
                    </>
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
                            <select name="category" className="rounded-lg p-3 border bg-gray-900" onChange={changehandler}>
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
                {loading ? (
                    <Loder />
                ) : (
                    <Button onClick={handleSubmit} className="bg-pink-600 px-7 py-4">
                        {' '}
                        Submit
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddProduct;
