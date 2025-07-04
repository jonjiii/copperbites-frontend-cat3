// services/order_service.ts
import axios from 'axios';
import { getToken } from './token_service';

const API = 'http://192.168.1.159:8080/api/orders';

export type Order = {
  id?: number;
  dishId: number;
  quantity: number;
};

export const createOrder = async (dishId: number, quantity: number = 1) => {
  const token = await getToken();
  const res = await axios.post(API, { dishId, quantity }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const getOrders = async () => {
  const token = await getToken();
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
