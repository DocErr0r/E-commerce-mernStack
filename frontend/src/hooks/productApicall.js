import { createProduct, deleteProductById, getProductById, getProducts, updateProductById, uploadImageFile } from '../redux/api/ProductApi';
import { useApiCall } from './Apicalls';

export const useGetProducts = () => {
    const { loading, callApi } = useApiCall(getProducts);
    return { loading, getProducts: callApi };
};

export const useGetProductById = () => {
    const { loading, callApi } = useApiCall(getProductById);
    return { loading, getProductById: callApi };
};

export const useDeleteProductById = () => {
    const { loading, data, callApi } = useApiCall(deleteProductById);
    return { deleteloading: loading, data, deleteProductById: callApi };
};

export const usUpdateProductById = () => {
    const { loading, callApi } = useApiCall(updateProductById);
    return { updateloading: loading, updateProductById: callApi };
};

export const useCreateProduct = () => {
    const { loading, callApi } = useApiCall(createProduct);
    return { productLoading: loading, createProduct: callApi };
};

export const useUploadfile = () => {
    const { loading, callApi } = useApiCall(uploadImageFile);
    return { loading, uploadImageFile: callApi };
};