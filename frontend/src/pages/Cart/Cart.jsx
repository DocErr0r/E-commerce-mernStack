import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, clearCart, removeFormCart } from '../../redux/features/Cart/cartSlice';
import { Button } from '@material-tailwind/react';
import { FaTrash } from 'react-icons/fa';
import { setOrderProduct } from '../../redux/features/order/productOrderSlice';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.carts);
    const { cartItems } = cart;

    const checkoutHandle = () => {
        dispatch(setOrderProduct(cartItems));
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10">
                    <p className="text-lg">Your Cart is empty</p>
                    <Link to={'/shop'} className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-md">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex flex-row flex-wrap justify-between items-center">
                        <h1 className="text-2xl font-semibold uppercase mb-4 sm:mb-0">Shopping Cart</h1>
                        <button className="text-red-300 rounded-md py-2 px-4 bg-gray-700" onClick={() => dispatch(clearCart())}>
                            Remove All Items
                        </button>
                    </div>
                    <div className="w-full mx-auto my-4">
                        {cartItems?.map((i) => (
                            <div key={i._id} className="flex flex-col sm:flex-row items-center justify-between mb-4 shadow-md rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out p-4">
                                <div className="flex items-center max-sm:w-full mb-4 sm:mb-0">
                                    <img src={i.image} alt={i.name} className="h-20 w-20 rounded-md object-cover" />
                                    <div className="ml-4">
                                        <Link to={'/product/' + i._id} className="text-sm text-pink-400 block">
                                            {i.name}
                                        </Link>
                                        <div className="text-sm">{i.brand}</div>
                                        <div className="text-sm font-semibold">₹ {i.price}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row flex-wrap gap-2 max-sm:justify-between max-sm:w-full items-center">
                                    <div className="flex">
                                        <label className="mr-2 block">Quantity:</label>
                                        <input type="number" value={i.qty} onChange={(e) => dispatch(addToCart({ ...i, qty: Number(e.target.value) }))} min="1" max={i.countInStock} className="border border-gray-300 rounded-lg px-3 py-1 w-16 text-center" />
                                    </div>
                                    <div className='flex justify-between max-sm:w-full'>
                                        <button className="ml-2 flex items-center gap-1 rounded-md py-2 px-4 bg-gray-700 text-blue-300" onClick={() => dispatch(removeFormCart(i._id))}>
                                            <FaTrash size={20} className="text-red-500" />
                                            Remove Item
                                        </button>
                                        <button
                                            className="ml-2 flex items-center gap-1 rounded-md py-2 px-4 bg-gray-700 text-blue-300"
                                            onClick={() => {
                                                dispatch(setOrderProduct([i])), navigate('/login?redirect=/shipping');
                                            }}>
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Items({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <h2 className="text-xl font-semibold">Total Price: ₹ {cart.itemsPrice}</h2>
                                <Button className="mt-4 sm:mt-0 px-8 bg-pink-600 rounded-full w-full sm:w-auto" disabled={cartItems.length === 0} onClick={checkoutHandle}>
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
