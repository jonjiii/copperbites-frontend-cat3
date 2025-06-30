// services/dish_service.ts
import axios from 'axios';

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

const API = 'http://localhost:8080/api/dishes';

export const getAllDishes = async (): Promise<Dish[]> => {
  const response = await axios.get<{ data: Dish[] }>(API);
  return response.data.data;
};

export const getDishById = async (id: string | number): Promise<Dish> => {
  const response = await axios.get<{ data: Dish }>(`${API}/${id}`);
  return response.data.data;
};
