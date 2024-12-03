import axios from './axios.js';

export const getExersRequest = () => axios.get('/exercise');

export const getExerRequest = (id) => axios.get(`/exercise/${id}`);

export const createExerRequest = (exer) => axios.post('/exercise', exer);

export const updateExerRequest = (exer) =>
  axios.put(`/exercise/${exer._id}`, exer);

export const deleteExerRequest = (id) => axios.delete(`/exercise/${id}`);
