import axios from './axios.js';

export const getObjetivesRequest = () => axios.get(`/objetive`);

export const getObjetiveRequest = (id) => axios.get(`/objetive/${id}`);

export const createObjetiveRequest = (id) => axios.post(`/objetive/${id}`);

export const updateObjetiveRequest = (id, objetive) =>
  axios.put(`/objetive/${id}`, objetive);
