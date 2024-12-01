import axios from './axios.js'

export const getFoodsRequest = () => axios.get('/food');

export const getFoodRequest = (id) => axios.get(`/food/${id}`);

export const createFoodRequest = (food) => axios.post('/food', food);

export const updateFoodRequest = (food) => axios.put(`/food/${food._id}`, food);

export const deleteFoodRequest = (id) => axios.delete(`/food/${id}`);
