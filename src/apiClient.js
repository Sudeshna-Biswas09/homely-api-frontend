import axios from 'axios';

// Create a centralized instance
const apiClient = axios.create({
  // Your live Render URL replaces http://localhost:3000
  baseURL: 'https://homely-api-backend.onrender.com', 
  withCredentials: true // Ensures cookies/sessions are sent with every request
});

export default apiClient;