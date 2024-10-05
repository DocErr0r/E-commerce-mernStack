import React from 'react';

function UserModal({ user }) {
    return (
        <div className="p-5 fixed inset-0 h-52 top-[20%] border border-gray-400 bg-gray-950">
            <div className="space-y-3 ">
                {user && (
                    <div>
                        name: <p>{user.name}</p>
                        email: <p>{user.email}</p>
                        <p>{user.role}</p>
                        <p>{Date(user.createdAt)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserModal;
