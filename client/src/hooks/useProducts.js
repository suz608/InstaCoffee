// src/hooks/useProducts.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../redux/productSlice';

export default function useProducts() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        // Dispatch the action to fetch products
        dispatch(fetchProducts());
    }, [dispatch]);

    // Return the products, loading, and error states
    return { products, loading, error };
}
