import axios from './axios.js';

export const getDishesRequest = () => axios.get(`/dish`);

export const getDishRequest = (id) => axios.get(`/dish/${id}`);

export const createDishRequest = (id, category) =>
  axios.post(`/dish/${id}`, category);

export const updateDishRequest = (id, category) =>
  axios.put(`/dish/${id}/${category}`);

export const deleteDishRequest = (id) => axios.delete(`/dish/${id}`);

export const getDishesByDateRequest = async (date) => {
  return await axios.get(`/dish/date/${date}`);
};

export const getDishesByCategoryRequest = async (category) => {
  return await axios.get(`/dish/category/${category}`);
};
