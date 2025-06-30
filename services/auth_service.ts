// services/auth_service.ts

import axios from 'axios';

const API = 'http://192.168.1.159:8080/api/users';

export type AuthUser = {
    id: number;
    name: string;
    lastname: string;
    email: string;
    token: string;
};

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthUser> => {
    const response = await axios.post<{ data: AuthUser }>(`${API}/login`, { email, password });
    return response.data.data;
};

export const registerUser = async (
    name: string,
    lastname: string,
    email: string,
    password: string
): Promise<AuthUser> => {
    const response = await axios.post<{ data: AuthUser }>(`${API}/register`, {
        name,
        lastname,
        email,
        password,
    });
    return response.data.data;
};
