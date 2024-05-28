import axios from 'axios';

export const api = axios.create({
  baseURL: "https://school-api-3s03.onrender.com",
});
