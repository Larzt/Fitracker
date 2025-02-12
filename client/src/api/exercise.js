import axios from './axios.js';

export const getExerciseFromUserRequest = (id) =>
  axios.get(`/user/exercise/${id}`);

export const getExersRequest = () => axios.get('/exercise');

export const getExerRequest = (id) => axios.get(`/exercise/${id}`);

export const createExerRequest = (exer) => axios.post('/exercise', exer);
export const copyExerRequest = (exer, id) =>
  axios.post(`/copy/exer/${id}`, exer);

export const updateExerRequest = (id, exer) =>
  axios.put(`/exercise/${id}`, exer);

export const deleteExerRequest = (id) => axios.delete(`/exercise/${id}`);
