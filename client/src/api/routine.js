import axios from './axios.js';

export const getRoutinesRequest = () => axios.get(`/routine`);

export const getRoutineRequest = (id) => axios.get(`/routine/${id}`);

export const createRoutineRequest = (id) => axios.post(`/routine/${id}`);

export const deleteRoutineRequest = (id) => axios.delete(`/routine/${id}`);

export const getRoutinesByDateRequest = async (date) => {
  return await axios.get(`/routine/date/${date}`);
};
