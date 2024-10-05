import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCrUser } from "../redux/api/userApiSlice";
import { setloading, setUser } from "../redux/features/auth/authSlice";

export default function useUser() {
    const dispatch = useDispatch()
    const [first, setFirst] = useState(false);

    useEffect(() => {
        const getLoginuser = async () => {
            dispatch(setloading(true))
            try {
                const { data } = await getCrUser();
                console.log(data);
                dispatch(setUser(data.data))
                // dispatch(setAuthnticate())

            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setloading(false))
            }
        }
        getLoginuser()
    }, [dispatch, first]);
}