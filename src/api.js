// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Sesuaikan dengan port Flask backend
});

export default api;
