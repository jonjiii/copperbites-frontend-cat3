import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dish } from "./dish_service";

const CART_KEY = "cart_items";

export const getCart = async (): Promise<Dish[]> => {
  const json = await AsyncStorage.getItem(CART_KEY);
  return json ? JSON.parse(json) : [];
};

export const addToCart = async (dish: Dish): Promise<void> => {
  const cart = await getCart();
  cart.push(dish);
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = async (): Promise<void> => {
  await AsyncStorage.removeItem(CART_KEY);
};

export const removeFromCart = async (id: number): Promise<void> => {
  const cart = await getCart();
  const updated = cart.filter((item) => item.id !== id);
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(updated));
};
