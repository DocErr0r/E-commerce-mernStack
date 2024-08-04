import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { addReview, getProductById } from '../../redux/api/ProductApi';
import { FaStar, FaCartPlus, FaStore, FaBox, FaClock } from 'react-icons/fa'; // Importing star and cart icons from react-icons
import myContext from '../../contexts/myContext';
import Loader from '../../components/Loder';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/Cart/cartSlice';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id: productId } = useParams();
    const { loading, setLoading } = useContext(myContext);
    const [product, setProduct] = useState(null);
    const [submitRw, setSubmitRw] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [quantity, setQuantity] = useState(1); // Default quantity for add to cart
    const [userRating, setUserRating] = useState(null); // User's rating state

    // Fetch product details
    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await getProductById(productId);
            setProduct(response.data);
            setReviews(response.data.reviews);
            setLoading(false);
        } catch (error) {
            // console.error('Error fetching product:', error);
            toast.error(error?.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId, submitRw]);

    // Example function to handle submitting a new review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!userRating && !newReview) {
            console.log(userRating);
            return toast.error('Please fill in all fields');
        }
        try {
            const response = await addReview({ id: productId, body: { comment: newReview, rating: userRating } });
            setSubmitRw(response.data);
            setNewReview('');
            setUserRating(null);
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    // Function to handle adding product to cart
    const handleAddToCart = () => {
        console.log(`Added ${quantity} ${product.name} to cart`);
        dispatch(addToCart({ ...product, qty: quantity }));
        toast.info(product.name + ' sucessfully added to cart');
    };

    if (loading || !product) {
        return <Loader />;
    }

    // console.log(product);

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="w-full px-2 mb-4">
                <img src={product.image} alt={product.name} className="rounded-lg shadow-md w-full  md:object-cover" />
            </div>
            <h1 className="text-3xl font-bold text-gray-50">{product.name}</h1>
            <div className="flex flex-wrap -mx-2">
                <p className="mb-4 border-b w-full px-2 py-4">{product.description}</p>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <p className="mb-2 font-semibold text-xl">Price: ₹ {product.price}</p>
                    <div className="flex items-center gap-2 my-2">
                        <FaStore size={20} />
                        <p>Brand: {product.brand}</p>
                    </div>
                    <div className="flex items-center gap-2 my-2">
                        <FaClock size={20} />
                        <p>Added:{new Date(product.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center gap-2 my-2">
                        <FaBox size={20} />
                        <p>Available Stock: {product.countInStock}</p>
                    </div>
                    <div className="flex items-center gap-2 my-2">
                        <FaStar color="yellow" size={20} />
                        <p>Number of Reviews: {reviews.length}</p>
                    </div>
                    <div className="flex items-center my-4">
                        <p className="mr-2">Rating:</p>
                        {Array.from(Array(parseInt(product.rating.toFixed(1))), (e, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                        ))}
                        <span className="ml-2">
                            {product.rating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'})
                        </span>
                    </div>
                    {product.countInStock > 0 && (
                        <div className="flex items-center">
                            <label className="mr-2">Quantity:</label>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min="1" max={product.countInStock} className="border border-gray-300 rounded-lg px-3 py-1 w-16 text-center" />
                            <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg ml-4">
                                <FaCartPlus className="inline-block mr-1" />
                                Add to Cart
                            </button>
                        </div>
                    )}
                    {product.countInStock === 0 && <p className="text-red-500">Out of Stock</p>}
                </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="mt-8">
                <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="Write a review..." className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2" rows="3"></textarea>
                <div className="flex items-center mb-2">
                    <p className="mr-2">Your Rating:</p>
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`cursor-pointer ${i < userRating ? 'text-yellow-500' : 'text-gray-400'}`} onClick={() => setUserRating(i + 1)} />
                    ))}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Submit Review
                </button>
            </form>

            {/* Reviews Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {reviews.length === 0 && <p>No reviews yet.</p>}
                {reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-300 mb-4 pb-4">
                        <p className="mb-2">{review.comment}</p>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={` ${i < review.rating ? 'text-yellow-500' : 'text-gray-400'}`} />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">Posted on {new Date(review.createdAt).toLocaleDateString()}</span>
                            {/* <span className="ml-2 text-sm text-gray-500">By {review.name}</span> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;
