import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/features/Cart/cartSlice';
import { handleWishlist } from '../../redux/api/ProductApi';
import { toast } from 'react-toastify';
import { setFavirates } from '../../redux/features/product/favoritesSlice';

function Card({ product, view }) {
    const dispatch = useDispatch();
    const { fav } = useSelector((state) => state.favoriat);
    // console.log(fav);

    const isliked = fav.some((p) => p._id === product._id);
    // console.log(isliked);
    const handleLike = async (e) => {
        e.preventDefault();
        try {
            const { data } = await handleWishlist({ id: product._id });
            // console.log(data);
            dispatch(setFavirates(data.wishlist));
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const addtocartHendler = (e) => {
        e.preventDefault();
        dispatch(addToCart({ ...product, qty: 1 }));
        toast.info(product.name + ' sucessfully added to cart');
    };
    return (
        product && (
            <Link to={'/product/' + product._id} className="sm:w-[15rem] mx-auto">
                <div className={`${view ? '' : 'flex'} shadow-xl mb-3 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out`}>
                    <div className="relative">
                        <div className="p-2">
                            <img src={product.image} alt={product.name} className="sm:w-60 w-full h-56 rounded-md object-cover hover:opacity-80" />
                        </div>
                        <div className="absolute top-0 right-0 p-4" onClick={handleLike}>
                            {/* <AiOutlineHeart size={20} /> */}
                            {!isliked ? <AiOutlineHeart  color='gray' size={20} /> : <AiFillHeart className='text-pink-500' size={20} />}
                        </div>
                    </div>
                    <div className="p-4 w-full">
                        <h3 className="text-lg font-semibold ">{product.name}</h3>
                        <p className=" text-gray-300">{product.description.length > 52 ? product.description.slice(0, 52) + '...' : product.description}</p>
                        <div className="flex gap-2 items-center my-2">
                            <FaStar color="yellow" />
                            <p className="font-semibold">{product.rating.toFixed(1)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-xl font-bold">₹ {product.price}</span>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 relative" onClick={addtocartHendler}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        )
    );
}

export default Card;
