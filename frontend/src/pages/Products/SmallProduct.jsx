import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { handleWishlist } from '../../redux/api/ProductApi';
import { useDispatch, useSelector } from 'react-redux';
import { setFavirates } from '../../redux/features/product/favoritesSlice';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

function SmallProduct({ product }) {
    const dispatch = useDispatch();
    const { fav } = useSelector((state) => state.favoriat);
    // console.log(fav);

    const isliked = fav.some((p) => p._id === product._id);
    // console.log(isliked);

    const handleLike = async () => {
        try {
            const { data } = await handleWishlist({ id: product._id });
            // console.log(data);
            dispatch(setFavirates(data.wishlist));
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
        }
    };
    return (
        product && (
            <div className="shadow-md max-md:mx-auto hover:shadow-lg transition-shadow duration-300 ease-in-out relative">
                <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} className="h-52 md:h-56 md:w-[18rem] w-[15rem] object-cover rounded-md hover:opacity-80" />
                </Link>
                <div className="absolute top-0 right-0 p-4" onClick={handleLike}>
                    {/* <AiOutlineHeart size={20} /> */}
                    {!isliked ? <AiOutlineHeart color='gray' size={20} /> : <AiFillHeart className='text-pink-500' size={20} />}
                </div>
                <div className="p-4 md:w-[18rem] w-[15rem]">
                    <div className="flex items-center justify-between mt-4">
                        <h3 className="text-lg font-semibold ">{product.name}</h3>
                        <div className="flex gap-2 items-center my-2">
                            <FaStar color="yellow" />
                            <p className="font-semibold text-gray-300">{product.rating.toFixed(1)}</p>
                        </div>
                        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Add to Cart</button> */}
                    </div>
                    <span className="text-xl font-bold ">₹ {product.price}</span>
                </div>
            </div>
        )
    );
}

export default SmallProduct;
