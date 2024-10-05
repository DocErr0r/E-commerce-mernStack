import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCrUser } from "../redux/api/userApiSlice";
import { setUser } from "../redux/features/auth/authSlice";

export default function useUser() {
    const dispatch = useDispatch()
    const [first, setFirst] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getLoginuser = async () => {
            // setLoading(true)
            try {
                const { data } = await getCrUser();
                // console.log(data);
                if (data?.data) {
                    dispatch(setUser(data.data))
                    setIsLoggedIn(true)
                    // dispatch(setAuthnticate())
                } else {
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.log(error);
                setIsLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }
        getLoginuser()
    }, [dispatch, first]);

    return { isLoggedIn, loading };

}