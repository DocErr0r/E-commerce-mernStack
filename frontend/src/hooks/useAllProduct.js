import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/features/product/productSlice";
import { getProducts } from "../redux/api/ProductApi";


function useAllProduct() {
    // const { products } = useSelector(state => state.product)
    const dispatch = useDispatch()
    useEffect(() => {
        const funcCall = async () => {
            try {
                const res = await getProducts()
                console.log(res);
                dispatch(setProducts(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        funcCall()
    }, []);
}

export default useAllProduct;
