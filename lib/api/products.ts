import axios from 'axios'
import { API_BASE_URL } from '@/lib/constants'

export const getProducts = async (page: number = 1, categoryId?: string, brandId?: string, keyword?: string) => {
    let url = `${API_BASE_URL}/products?page=${page}`
    if (categoryId) url += `&category[in]=${categoryId}`
    if (brandId) url += `&brand[in]=${brandId}`
    if (keyword) url += `&keyword=${keyword}`
    const { data } = await axios.get(url)
    return data
}

export const getProductById = async (id: string) => {
    const { data } = await axios.get(`${API_BASE_URL}/products/${id}`)
    return data
}

export const getAllProducts = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/products?limit=40`)
    return data
}

export const getCategories = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/categories`)
    return data
}

export const getBrands = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/brands`)
    return data
}
