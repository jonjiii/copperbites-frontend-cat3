// services/auth_service.ts
import axios from 'axios';

const API = 'http://localhost:8080/api/users'; // Cambia si usas emulador real

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API}/login`, { email, password });
  return response.data;
};

export const registerUser = async (
  name: string,
  lastname: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API}/register`, {
    name,
    lastname,
    email,
    password,
  });
  return response.data;
};
