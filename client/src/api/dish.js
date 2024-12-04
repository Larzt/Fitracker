import axios from './axios.js';

export const getDishesRequest = () => axios.get(`/dish`);

export const getDishRequest = (id) => axios.get(`/dish/${id}`);

export const createDishRequest = (id) => axios.post(`/dish/${id}`);

export const getDishesByDateRequest = async (date) => {
  return await axios.get(`/dish/date/${date}`);
};
