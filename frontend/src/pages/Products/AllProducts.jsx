import React, { useEffect, useState } from 'react';
import { getNewProducts, getTopProducts } from '../../redux/api/ProductApi';
import { toast } from 'react-toastify';
import { Carousel } from '@material-tailwind/react';
import SmallProduct from './SmallProduct';
import { useSelector } from 'react-redux';

function AllProducts() {
    const [topPorducts, setTopProducts] = useState([]);
    const [newPorducts, setNewProducts] = useState([]);
    const favoriat = useSelector((state) => state.favoriat);
    // console.log(favoriat);
    useEffect(() => {
        const fetchtop = async () => {
            try {
                const res2 = await getNewProducts();
                // console.log(res2);
                setNewProducts(res2.data);
                const res = await getTopProducts();
                // console.log(res);
                setTopProducts(res.data);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || error.message);
            }
        };
        fetchtop();
    }, []);

    // console.log(topPorducts);
    return (
        <div className="max-w-screen-xl mx-auto p-4">
            {/* <div className="flex justify-between ">
                <h2>home page for showing produsts</h2>
            </div> */}
            {/* <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center p-4 gap-4"> */}
            <h2 className="text-2xl font-semibold">New products</h2>
            <div className="flex gap-4 p-4 overflow-x-auto ">
                {/* <marquee> */}
                {newPorducts.map((item) => (
                    <SmallProduct key={item._id} product={item} />
                ))}
                {/* </marquee> */}
            </div>

            <h2 className="text-2xl font-semibold mt-4">Top products</h2>
            <div className="flex gap-4 p-4 overflow-x-auto">
                {/* <Carousel className="rounded-xl w-96"> */}
                {topPorducts.map((item) => (
                    <SmallProduct key={item._id} product={item} />
                ))}
                {/* </Carousel> */}
            </div>
        </div>
    );
}

export default AllProducts;
