import React, { useContext, useEffect, useState } from 'react';
import { deleteUserById, getUsers, updateUserById } from '../../redux/api/userApiSlice';
import { toast } from 'react-toastify';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import UserModal from '../../components/UserModal';
import Modal from '../../components/Modal';
import myContext from '../../contexts/myContext';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const { updateUser, setUpdateUser } = useContext(myContext);

    const [editableId, setEditableId] = useState(null);
    const [editableName, setEditableName] = useState('');
    const [editableEmail, setEditableEmail] = useState('');
    const [editableRole, setEditableRole] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [userDetail, setUserDetail] = useState(null);

    const fetchUsers = async () => {
        try {
            const { data } = await getUsers();
            setUsers(data.data);
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [updateUser]);

    const toggleEdit = (id, name, email, role) => {
        setEditableId(id);
        setEditableName(name);
        setEditableEmail(email);
        setEditableRole(role);
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const { data } = await deleteUserById(id);
                toast.success(data.message);
                setUpdateUser(!updateUser);
            } catch (error) {
                toast.error(error.response.data.message || error.message);
            }
        }
    };

    const updateHandler = async (id) => {
        const body = { name: editableName, email: editableEmail, role: editableRole };
        try {
            const { data } = await updateUserById(id, body);
            toast.success(data.message);
            setEditableId(null);
            setUpdateUser(!updateUser);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setOpenModal(false);
        }
    };

    const cancelEdit = () => {
        setEditableId(null);
        setEditableName('');
        setEditableEmail('');
        setEditableRole('');
        setOpenModal(false);
    };

    return (
        <div className="p-4 mx-auto max-w-7xl  text-white">
            <h1 className="text-3xl font-semibold mb-6">Users ({users?.length})</h1>
            <div className="overflow-x-auto">
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {users.map((user, index) => (
                        <div key={user._id} className="p-4 hover:bg-gray-700 border rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="font">Name: {user.name}</span>
                                    <span className="text-sm">ID: {user._id}</span>
                                    <span className="text-sm text-gray-400">Email: {user.email}</span>
                                    <span className="text-sm text-gray-400">Role: {user.role}</span>
                                </div>
                                <div className=" flex justify-center gap-3 flex-wrap items-center">
                                    {editableId === user._id ? (
                                        <></>
                                        // <div className="flex flex-col gap-1">
                                        //     <input type="text" className="p-2 rounded border bg-gray-600 text-white" value={editableName} onChange={(e) => setEditableName(e.target.value)} />
                                        //     <input type="email" className="p-2 rounded border bg-gray-600 text-white" value={editableEmail} onChange={(e) => setEditableEmail(e.target.value)} />
                                        //     <select value={editableRole} onChange={(e) => setEditableRole(e.target.value)} className="p-2 bg-gray-600 text-white rounded border">
                                        //         <option value="user">User</option>
                                        //         <option value="admin">Admin</option>
                                        //     </select>
                                        //     <div className="flex gap-2">
                                        //         <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => updateHandler(user._id)}>
                                        //             <FaCheck />
                                        //         </button>
                                        //         <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={cancelEdit}>
                                        //             Cancel
                                        //         </button>
                                        //     </div>
                                        // </div>
                                    ) : (
                                        <>
                                            <button
                                                className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                onClick={() => {
                                                    toggleEdit(user._id, user.name, user.email, user.role), setOpenModal(true);
                                                }}>
                                                <FaEdit />
                                            </button>
                                            {/* {user.role !== 'admin' && (
                                            <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => deleteUser(user._id)}>
                                                <FaTrash />
                                            </button>
                                        )} */}
                                        </>
                                     )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {openModal && (
                <Modal isopen={openModal} onclose={cancelEdit}>
                    <div className="flex flex-col gap-1  items-center">
                        <h2 className="underline text-2xl">Edit user role</h2>
                        {/* <input type="text" className="p-2 rounded border bg-gray-600 text-white" value={editableName} onChange={(e) => setEditableName(e.target.value)} />
                        <input type="email" className="p-2 rounded border bg-gray-600 text-white" value={editableEmail} onChange={(e) => setEditableEmail(e.target.value)} /> */}
                        <select value={editableRole} onChange={(e) => setEditableRole(e.target.value)} className="p-2 w-full bg-gray-600 text-white rounded border">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div className="flex gap-2 w-full">
                            <button className="p-2 bg-green-600 text-white rounded w-full  flex justify-center items-center hover:bg-green-700" onClick={() => updateHandler(editableId)}>
                                <FaCheck />
                            </button>
                            <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={cancelEdit}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* <UserModal user={userDetail}/> */}
        </div>
    );
}
