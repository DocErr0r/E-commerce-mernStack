import React, { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../../redux/api/cetegoryApi';
import { toast } from 'react-toastify';
import CategoryForm from '../../components/CategoryForm';
import Modal from '../../components/Modal';

function CategoryList() {
    const [categoryData, setCategoryData] = useState([]);
    // const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [newName, setNewName] = useState('');
    const [selectCategory, setSelectCategory] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [changes, setChanges] = useState(false);
    
    const fetchCategory = async () => {
        try {
            const data = await getAllCategory();
            // console.log(data.data);
            setCategoryData(data.data);
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    };
    useEffect(() => {
        fetchCategory();
    },[changes]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('name is requried');
            return;
        }
        try {
            const result = await createCategory({ name });
            if (result.error) {
                console.log(result);
                toast.error(res.error.message);
            } else {
                setName('');
                toast.success('categort created');
                setChanges(!changes)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || error.message);
        }
    };

    const handleUpdateCrategory = async (e) => {
        e.preventDefault();
        if (!newName) {
            toast.error('name is requried');
            return;
        }
        try {
            const result = await updateCategory(selectCategory, { name: newName });
            if (result.error) {
                console.log(result);
                toast.error(res.error.message);
            } else {
                toast.success('categort updated');
                setSelectCategory(null);
                setNewName('');
                setModalShow(false);
                setChanges(!changes);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || error.message);
        }
    };

    const handleDeleteCategory = async (e) => {
        e.preventDefault()
        try {
            const result = await deleteCategory(selectCategory);
            if (result.error) {
                console.log(result);
                toast.error(res.error.message);
            } else {
                toast.success('category deleted');
                setModalShow(false);
                setSelectCategory(null);
                setChanges(!changes);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || error.message);
        }
    };

    console.log(categoryData);

    return (
        <div className="ml-[10rem] felx flex-col md:flex-row">
            <div className="p-3 md:w-3/4">
                <div className="h-12">Manage Category</div>
                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreate} />
                <div className="flex flex-wrap">
                    {categoryData?.map((category) => (
                        <div key={category._id}>
                            <button
                                className="border py-2 px-4 border-pink-500 text-pink-500 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                                onClick={() => {
                                    setModalShow(true);
                                    setSelectCategory(category._id);
                                    setNewName(category.name);
                                }}>
                                {category.name}
                            </button>
                        </div>
                    ))}
                </div>
                <Modal
                    isopen={modalShow}
                    onclose={() => {
                        setModalShow(false);
                    }}>
                    <CategoryForm value={newName} setValue={setNewName} button="update" handleSubmit={handleUpdateCrategory} handleDelete={handleDeleteCategory} />
                </Modal>
            </div>
        </div>
    );
}

export default CategoryList;
