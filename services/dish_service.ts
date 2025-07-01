// services/dish_service.ts
import axios from 'axios';
import { getToken } from './token_service';

export type Dish = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  ingredients: string;
  aviable: boolean;
  isActive: boolean;
};

const API = 'http://192.168.1.159:8080/api/dishes';

export const getAllDishes = async (): Promise<Dish[]> => {
  const response = await axios.get<{ data?: Dish[] }>(API);
  if (!response.data.data) {
    throw new Error("No se pudo obtener platos");
  }
  return response.data.data;
};

export const getDishById = async (id: string | number): Promise<Dish> => {
  const response = await axios.get<{ data: Dish }>(`${API}/${id}`);
  return response.data.data;
};

export const createDish = async (dish: Omit<Dish, "id" | "aviable" | "isActive">): Promise<Dish> => {
  const token = await getToken();

  const response = await axios.post<{ data: Dish }>(API, dish, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};
