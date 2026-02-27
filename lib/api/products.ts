import axios from 'axios';

export const getProducts = async (page: number = 1) => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
    return data;
};

export const getProductById = async (id: string) => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return data;
};

export const getAllProducts = async () => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    return data;
};
