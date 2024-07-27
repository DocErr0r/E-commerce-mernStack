import { createProduct, getProducts, uploadImageFile } from '../redux/api/ProductApi';
import { useApiCall } from './Apicalls';

export const useGetProducts = () => {
    const { loading, callApi } = useApiCall(getProducts);
    return { loading, getProducts: callApi };
};

export const useCreateProduct = () => {
    const { loading, callApi } = useApiCall(createProduct);
    return { productLoading:loading, createProduct: callApi };
};

export const useUploadfile = () => {
    const { loading, callApi } = useApiCall(uploadImageFile);
    return { loading, uploadImageFile: callApi };
};