import React, { useEffect, useState } from 'react';
import { getAllProducts, getProducts } from '../../redux/api/ProductApi';
import { toast } from 'react-toastify';
// import SmallProduct from '../Products/SmallProduct';
import Card from '../Products/Card';
// import FilterSection from '../../components/FilterSection';
import { IoGrid, IoMenu } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';

export default function Shop() {
    const [allProducts, setAllProducts] = useState(null);
    const [change, setChange] = useState(false);
    // const [category, setCategory] = useState('');
    const [view, setView] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [sortBy, setSortby] = useState('');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await getAllProducts(keyword, sortBy, page);
                console.log(data);
                setAllProducts(data.products);
                setCount(data.pages);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [keyword, sortBy, page]);

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="w-full flex mb-4 justify-center mx-auto gap-4 flex-wrap">
                <div className="flex relative md:w-[50%] w-[100%]">
                    <input type="text" placeholder="Serch products..." className="w-full block border border-solid p-2 rounded-xl" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                    <FaSearch className="absolute right-2 cursor-pointer h-4 w-4 m-3" />
                </div>
                <select placeholder="sortBy" className="md:w-40 w-full p-2 text-sm rounded-xl" onChange={(e) => setSortby(e.target.value)}>
                    <option value="">Sort-By</option>
                    <option value="name">A-Z</option>
                    <option value="-name">Z-A</option>
                    <option value="price">price:- Low-High</option>
                    <option value="-price">price:- High-Low</option>
                </select>
            </div>
            {allProducts?.length ? (
                <>
                    <div className="flex justify-between">
                        <h1 className="text-xl mb-4">Products({allProducts.length})</h1>
                        <div className="sm:flex gap-2 hidden">
                            <button className={`${view ? 'bg-gray-700' : 'bg-gray-400'} rounded-md p-2`} onClick={() => setView(true)}>
                                <IoGrid size={18} />
                            </button>
                            <button className={`${!view ? 'bg-gray-700' : 'bg-gray-400'} rounded-md p-2`} onClick={() => setView(false)}>
                                <IoMenu size={18} />
                            </button>
                        </div>
                    </div>
                    {keyword && <p className='text-gray-300 mx-4'>your search result for '{keyword}'</p>}
                    <div className="">
                        {/* <div className="w-[15rem] bg-red-300"><FilterSection setSortby={setSortby} sortby={sortBy} category={category} setCategory={setCategory} /></div> */}
                        <div className={`${view ? 'flex' : ''} flex-wrap gap-1`}>
                            {allProducts?.map((p) => (
                                <Card key={p._id} product={p} view={view} />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 m-4">
                        <button
                            className="bg-blue-500 rounded-md px-4 py-2"
                            onClick={() => {
                                if (page > 1) {
                                    setPage(page - 1);
                                }
                            }}>
                            privoes
                        </button>
                        <p className="flex items-center">
                            {page}/{count}
                        </p>
                        <button
                            className="bg-blue-500 rounded-md px-4 py-2"
                            onClick={() => {
                                if (page < count) setPage(page + 1);
                            }}>
                            next
                        </button>
                    </div>
                </>
            ) : (
                <h2 className="text-center">No more products</h2>
            )}
        </div>
    );
}
