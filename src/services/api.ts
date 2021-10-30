import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ander.lopscorp.com'
});

export default api; 