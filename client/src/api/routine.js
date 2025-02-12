import axios from './axios.js';

export const getRoutinesRequest = () => axios.get(`/routine`);

export const getRoutineRequest = (id) => axios.get(`/routine/${id}`);

export const createRoutineRequest = (id, exer) =>
  axios.post(`/routine/${id}`, exer);

export const deleteRoutineRequest = (id) => axios.delete(`/routine/${id}`);

// TOOD: No esta implementado ??
export const updateRoutineRequest = (id, body) =>
  axios.put(`/routine/${id}`, body);

export const addExtraDataRequest = (id, body) =>
  axios.put(`/routine/add-extra/${id}`, body);

export const getRoutinesByDateRequest = async (date) => {
  return await axios.get(`/routine/date/${date}`);
};

export const getRoutinesByCategoryRequest = async (category) => {
  return await axios.get(`/routine/category/${category}`);
};

export const getRoutinesByMuscleRequest = async (muscle) => {
  return await axios.get(`/routine/muscle/${muscle}`);
};
