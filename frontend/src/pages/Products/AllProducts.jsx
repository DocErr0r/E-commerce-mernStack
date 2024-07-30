import React from 'react';
import useAllProduct from '../../hooks/useAllProduct';
import { useSelector } from 'react-redux';
import Card from './Card';

function AllProducts() {
    useAllProduct();
    const { products } = useSelector((state) => state.product);
    console.log(products);
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between px-5">
                <h2>home page for showing produsts</h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center p-4 gap-4">
                {products.map((item) => (
                    <Card key={item._id} product={item} />
                ))}
            </div>
        </div>
    );
}

export default AllProducts;
