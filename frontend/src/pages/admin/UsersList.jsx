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
        }
    };

    const cancelEdit = () => {
        setEditableId(null);
        setEditableName('');
        setEditableEmail('');
        setEditableRole('');
    };

    return (
        <div className="p-4 mx-auto max-w-7xl bg-gray-900 text-white">
            <h1 className="text-3xl font-semibold mb-6">Users</h1>
            <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">#</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Role</th>
                            {/* <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-700 transition duration-200">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{user._id}</td>
                                <td className="px-4 py-3">
                                    {editableId === user._id ? (
                                        <div className="flex items-center">
                                            <input type="text" className="p-2 rounded border bg-gray-600 text-white" value={editableName} onChange={(e) => setEditableName(e.target.value)} />
                                            <button className="ml-2 p-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => updateHandler(user._id)}>
                                                <FaCheck />
                                            </button>
                                            <button className="ml-2 p-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={cancelEdit}>
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="truncate">{user.name}</div>
                                            <button className="ml-2 p-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => toggleEdit(user._id, user.name, user.email, user.role)}>
                                                <FaEdit />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {editableId === user._id ? (
                                        <div className="flex items-center">
                                            <input type="email" className="p-2 rounded border bg-gray-600 text-white" value={editableEmail} onChange={(e) => setEditableEmail(e.target.value)} />
                                            <button className="ml-2 p-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => updateHandler(user._id)}>
                                                <FaCheck />
                                            </button>
                                            <button className="ml-2 p-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={cancelEdit}>
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="truncate">{user.email}</div>
                                            <button className="ml-2 p-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => toggleEdit(user._id, user.name, user.email, user.role)}>
                                                <FaEdit />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {editableId === user._id ? (
                                        <select value={editableRole} onChange={(e) => setEditableRole(e.target.value)} className="p-2 bg-gray-600 text-white rounded border">
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        <div className="truncate">{user.role}</div>
                                    )}
                                </td>
                                {/* <td className="px-4 py-3">
                                    {user.role !== 'admin' && (
                                        <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => deleteUser(user._id)}>
                                            <FaTrash />
                                        </button>
                                    )}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {openModal && (
                <Modal isopen={openModal} onclose={() => setOpenModal(false)}>
                    <UserModal user={userDetail} />
                </Modal>
            )}
        </div>
    );
}
