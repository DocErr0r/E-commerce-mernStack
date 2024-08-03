import React, { useEffect, useState } from 'react';
import { getAllProducts, getProducts } from '../../redux/api/ProductApi';
import { toast } from 'react-toastify';
import SmallProduct from '../Products/SmallProduct';
import Card from '../Products/Card';
import FilterSection from '../../components/FilterSection';

export default function Shop() {
    const [allProducts, setAllProducts] = useState(null);
    const [change, setChange] = useState(false);
    const [category, setCategory] = useState('');
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
                <input type="text" className="md:w-[50%] w-[100%] block border border-solid p-2 rounded-xl" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                <select placeholder="sortBy" className="md:w-40 w-full p-2 text-sm rounded-xl" onChange={(e) => setSortby(e.target.value)}>
                    <option value="">Sort-By</option>
                    <option value="name">A-Z</option>
                    <option value="-name">Z-A</option>
                    <option value="price">price:Low-High</option>
                    <option value="-price">price:High-Low</option>
                </select>
            </div>
            {allProducts?.length ? (
                <>
                    <div className="flex">
                        {/* <div className="w-[15rem] bg-red-300"><FilterSection setSortby={setSortby} sortby={sortBy} category={category} setCategory={setCategory} /></div> */}
                        <div className="flex flex-wrap gap-4 mx-auto">
                            {allProducts?.map((p) => (
                                <Card key={p._id} product={p} />
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
                <h2 className='text-center'>No more products</h2>
            )}
        </div>
    );
}
