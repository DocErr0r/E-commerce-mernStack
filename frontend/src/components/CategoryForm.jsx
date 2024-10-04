import React from 'react';

function CategoryForm({ value, setValue, handleSubmit, button = 'submit', handleDelete }) {
    return (
        <div className="p-5 border border-gray-400">
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" className="p-3 w-full border rounded-lg" placeholder="Write Category name" value={value} onChange={(e) => setValue(e.target.value)} />
                <div className="flex justify-center sm:justify-between gap-5 flex-wrap">
                    <button className="bg-pink-500 py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500">{button}</button>
                    {handleDelete && (
                        <button onClick={handleDelete} className="bg-red-500  py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500">
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CategoryForm;
