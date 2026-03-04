import api from "./axiosConfig";

const API_URL = "/api/products";

export const getProducts = (page, size, sortBy, direction) => {
  return api.get(
    `${API_URL}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
  );
};

export const createProduct = (product) => {
  return api.post(API_URL, product);
};

export const getProductById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateProduct = (id, product) => {
  return api.put(`${API_URL}/${id}`, product);
};

export const deleteProduct = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const filterProducts = (minPrice, maxPrice) => {
  return api.get(
    `${API_URL}/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
};

export const searchProducts = (name) => {
  return api.get(`${API_URL}/search?name=${name}`);
};