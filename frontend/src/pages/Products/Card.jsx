import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Card({ product }) {
    return (
        product && (
            <div className="bg-gray-500 text-white md:w-1/4 sm:w-2/5 lg:w-1/5 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out relative">
                <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover hover:opacity-80" />
                </Link>
                <div className="absolute top-0 right-0 p-4" onClick={(e) => e.preventDefault()}>
                    <AiOutlineHeart size={20} />
                    {/* <AiFillHeart size={20} /> */}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold ">{product.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold ">${product.price}</span>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    );
}

export default Card;
