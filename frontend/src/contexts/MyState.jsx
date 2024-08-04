import React, { useState } from 'react';
import myContext from './myContext';

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);
    return <myContext.Provider value={{ loading, setLoading, updateUser, setUpdateUser }}>{children}</myContext.Provider>;
}

export default MyState;
