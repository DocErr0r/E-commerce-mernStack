import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { addToCart, clearCart, removeFormCart } from '../../redux/features/Cart/cartSlice';
import { Button } from '@material-tailwind/react';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.carts);
    const { cartItems } = cart;
    console.log(cart);
    const navigate = useNavigate();

    const checkoutHandle = () => {
        console.log('cheching out');
    };

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            {cartItems.length === 0 ? (
                <div className="justify-center m-10 flex items-center">
                    your Cart is empty{' '}
                    <Link to={'/shop'} className="ml-4 bg-pink-600 py-2 px-4 rounded-md">
                        continue shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold uppercase">Shopping cart</h1>
                        <button className="text-red-300 rounded-md mx-2 py-1 px-3 bg-gray-700" onClick={() => dispatch(clearCart())}>
                            Remove All Itmes
                        </button>
                    </div>
                    <div className="w-[80%] mx-auto my-4">
                        {cartItems?.map((i) => (
                            <div key={i._id} className="flex items-center justify-between mb-4 shadow-md rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out">
                                <div className="flex gap-4">
                                    <img src={i.image} alt={i.name} className="h-20 w-20 rounded-md object-cover" />
                                    <div>
                                        <Link to={'/product/' + i._id} className="text-sm text-pink-400">
                                            {i.name}
                                        </Link>
                                        <div className="text-sm">{i.brand}</div>
                                        <div className="text-sm font-semibold">₹ {i.price}</div>
                                    </div>
                                </div>
                                <div className="flex items-cente">
                                    <label className="mr-2 block">Quantity:</label>
                                    <input type="number" value={i.qty} onChange={(e) => dispatch(addToCart({ ...i, qty: Number(e.target.value) }))} min="1" max={i.countInStock} className="border border-gray-300 rounded-lg px-3 py-1 w-16 text-center" />
                                    <button className="mx-2 flex items-center" onClick={() => dispatch(removeFormCart(i._id))}>
                                        <FaTrash size={20} className="text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <div>
                                <h2 className="text-2xl font-semibold">Items({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
                            </div>
                            <div className="flex justify-between flex-wrap items-center">
                                <h2 className="text-xl font-semibold">Totle Price: ₹ {cart.itemsPrice}</h2>
                                <Button className="px-8 bg-pink-600 rounded-full max-sm:mt-4 w-full sm:w-auto" disabled={cartItems.length === 0} onClick={checkoutHandle}>
                                    Process to checkout
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
