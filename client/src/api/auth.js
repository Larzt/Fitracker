import axios from './axios.js';

export const getNotificationsRequest = () => axios.get(`/notifications`);
export const markNotificationsRequest = (index) =>
  axios.put(`/notifications/read/${index}`);

export const getUserRequest = (id) => axios.get(`/user/${id}`);
export const usersListRequest = () => axios.get('/users');
export const searchAvatarRequest = (id) => axios.get(`/search/avatar/${id}`);

export const friendsListRequest = () => axios.get('/friends');
export const addFriendsRequest = (id) => axios.post(`/friend/add/${id}`);
export const removeFriendsRequest = (id) => axios.post(`/friend/remove/${id}`);

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const verifyTokenRequest = () => axios.get('/verify');
export const logoutRequest = () => axios.get('/logout'); // NO se usa

export const loadAvatarRequest = () => axios.get('/profile/avatar');

export const uploadAvatarRequest = (formData) =>
  axios.post('/profile/avatar', formData);

export const deleteAvatarRequest = () => axios.delete('/profile/avatar');

export const getWeightRequest = () => axios.get('/metrics/weight');
export const updateWeightRequest = (value) =>
  axios.put('/metrics/weight', value);

export const getCaloriesRequest = () => axios.get('/metrics/calories');
export const updateCaloriesRequest = (value) =>
  axios.put('/metrics/calories', value);

export const getHeightRequest = () => axios.get('/metrics/height');
export const updateHeightRequest = (value) =>
  axios.put(`/metrics/height/${value}`);
