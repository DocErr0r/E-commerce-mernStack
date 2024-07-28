import { useState, useCallback } from 'react';

export const useApiCall = (apiFunc) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const callApi = async (params) => {
        setLoading(true);
        try {
            const response = await apiFunc(params);
            setData(response.data)
            return response;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, callApi };
};
