import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config();

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API_URL = 'https://fitracker-h0at.onrender.com'

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export default instance;