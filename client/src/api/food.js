import axios from './axios.js';

export const getFoodFromUserRequest = (id) => axios.get(`/user/food/${id}`);

export const getFoodsRequest = () => axios.get('/food');

export const getFoodRequest = (id) => axios.get(`/food/${id}`);

export const createFoodRequest = (food) => axios.post('/food', food);
export const copyFoodRequest = (food, id) => axios.post(`/copy/food/${id}`, food);

export const updateFoodRequest = (id, food) => axios.put(`/food/${id}`, food);

export const deleteFoodRequest = (id) => axios.delete(`/food/${id}`);
