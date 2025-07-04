import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDishById, Dish } from "@/services/dish_service";
import { addToCart } from "@/services/cart_service";
import { CartItem } from "@/context/cart_context";

export default function DishDetailScreen() {
  const { id } = useLocalSearchParams();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const data = await getDishById(id as string);
        setDish(data);
      } catch (err) {
        console.error("Error al cargar plato", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id]);

const handleAddToCart = () => {
  if (dish) {
    addToCart(dish);
    Alert.alert("Añadido al carrito", `${dish.name} fue añadido.`);
  }
};

  if (loading || !dish) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#e67e22" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/menu")}>
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
      <Text style={styles.description}>{dish.description}</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 40,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#e67e22",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#27ae60",
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: "#2980b9",
    fontSize: 20,
  },
});
