
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getWishlist } from "../redux/api/ProductApi";
import { setFavirates } from "../redux/features/product/favoritesSlice";
import myContext from "../contexts/myContext";

export default function useFavoriate() {
    const {updateUser}=useContext(myContext)
    const dispatch = useDispatch()
    useEffect(() => {
        const getFavoriats = async () => {
            try {
                const { data } = await getWishlist();
                const wishlist=data.data.wishlist
                // console.log(wishlist);
                dispatch(setFavirates(wishlist))
            } catch (error) {
                console.log(error);

            }
        }
        getFavoriats()
    }, [dispatch,setFavirates]);
}
