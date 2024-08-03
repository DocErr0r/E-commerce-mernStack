import React, { useEffect, useState } from 'react';
import { deleteUserById, getUsers, updateUserById } from '../../redux/api/userApiSlice';
// import { getAllUser } from '../../redux/features/auth/userThunk';
import { toast } from 'react-toastify';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import UserModal from '../../components/UserModal';
import Modal from '../../components/Modal';

export default function UsersList() {
    const [users, setUsers] = useState([]);

    const [editableId, setEditableId] = useState(null);
    const [editableName, setEditableName] = useState('');
    const [editableEmail, setEditableEmail] = useState('');
    const [editableRole, setEditableRole] = useState('');
    const [changeUser, setChangeUser] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [userDetail, setUserDetail] = useState(null);

    const fetchusers = async () => {
        try {
            const { data } = await getUsers();
            // console.log(data.data);
            setUsers(data.data);
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    };
    useEffect(() => {
        // console.log("runnig useeffect");

        fetchusers();
    }, [changeUser]);

    // console.log(users);

    const toggleEdit = (id, name, email, role) => {
        setEditableId(id);
        setEditableName(name);
        setEditableEmail(email);
        setEditableRole(role);
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure ?')) {
            try {
                const { data } = await deleteUserById(id);
                // console.log(data);
                toast.success(data.message);
                setChangeUser(!changeUser);
            } catch (error) {
                toast.error(error.response.data.message || error.message);
            }
        }
    };

    const updateHandler = async (id) => {
        const body = { name: editableName, email: editableEmail, role: editableRole };
        try {
            const { data } = await updateUserById(id, body);
            // console.log(data);
            toast.success(data.message);
            setEditableId(null);
            setChangeUser(!changeUser);
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    };

    // console.log(users);
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
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className="hover:bg-gray-700"
                                // onClick={() => {setOpenModal(true),setUserDetail(user)}}
                            >
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{user._id}</td>
                                <td className="px-4 py-3">
                                    {editableId === user._id ? (
                                        <div className="flex items-center">
                                            <input type="text" className="p-2 rounded border bg-gray-600 text-white" value={editableName} onChange={(e) => setEditableName(e.target.value)} />
                                            <button className="ml-2 p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => updateHandler(user._id)}>
                                                <FaCheck />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="truncate">{user.name}</div>
                                            <button className="ml-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => toggleEdit(user._id, user.name, user.email, user.role)}>
                                                <FaEdit />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {editableId === user._id ? (
                                        <div className="flex items-center">
                                            <input type="email" className="p-2 rounded border bg-gray-600 text-white" value={editableEmail} onChange={(e) => setEditableEmail(e.target.value)} />
                                            <button className="ml-2 p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => updateHandler(user._id)}>
                                                <FaCheck />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="truncate">{user.email}</div>
                                            <button className="ml-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => toggleEdit(user._id, user.name, user.email, user.role)}>
                                                <FaEdit />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {editableId === user._id ? (
                                        <div className="flex items-center">
                                            <select value={editableRole} onChange={(e) => setEditableRole(e.target.value)}>
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                                <option value="vendor">Vendor</option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="truncate">{user.role}</div>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {user.role !== 'admin' && (
                                        <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => deleteUser(user._id)}>
                                            <FaTrash />
                                        </button>
                                    )}
                                </td>
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
