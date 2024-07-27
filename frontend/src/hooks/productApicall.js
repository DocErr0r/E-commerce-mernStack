import { getProducts } from '../redux/api/ProductApi'; 
import { useApiCall } from './Apicalls';

export const useGetProducts = () => {
    const { loading, callApi } = useApiCall(getProducts);
    return { loading, getProducts: callApi };
};