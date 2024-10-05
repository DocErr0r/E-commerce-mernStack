import React, { useContext, useEffect, useState } from 'react';
import myContext from '../contexts/myContext';
import { toast } from 'react-toastify';
import { getAllCategory } from '../redux/api/cetegoryApi';
import Loder from './Loder';
import { Button } from '@material-tailwind/react';

function FilterSection({ sortby, setSortby, category, setCategory }) {
    const { loading, setLoading } = useContext(myContext);
    const [categories, setCategories] = useState(null);

    const getCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllCategory();
            setCategories(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.message || error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getCategories();
    }, []);
    return (
        <div className="p-4">
            <h2 className="text-xl text-center bg-gray-950 mx-4 my-2 rounded-full">Filter category</h2>
            <div className="">
                {categories?.map((c) => (
                    <div key={c._id} className="m-2 flex items-center">
                        <label htmlFor="pink checkbox" className=" block font-medium">
                            <input type="radio" id={c._id} name="category" className="h-4 w-4 mr-2 text-pink-600" value={c._id} onChange={(e) => setCategory(e.target.value)} />
                            {c.name}
                        </label>
                        
                    </div>
                ))}
            </div>
            <h2 className="text-xl text-center bg-gray-950 mx-4 my-2 rounded-full">Sort By</h2>
            <div className="m-2 flex items-center">
                <select placeholder="sortBy" className="w-full py-2 rounded-lg px-2 text-sm " value={sortby} onChange={(e) => setSortby(e.target.value)}>
                    <option value="">Sort-By</option>
                    <option value="name">A-Z</option>
                    <option value="-name">Z-A</option>
                    <option value="price">price:Low-High</option>
                    <option value="-price">price:High-Low</option>
                </select>
            </div>
            <Button
                className="w-full text-lg"
                onClick={() => {
                    setSortby('');
                    setCategory('');
                }}>
                Reset
            </Button>
        </div>
    );
}

export default FilterSection;
