import axios from './axios.js';

export const getGoalsRequest = () => axios.get('/goals');

export const createGoalsRequest = (goal) => axios.post('/goals', goal);
