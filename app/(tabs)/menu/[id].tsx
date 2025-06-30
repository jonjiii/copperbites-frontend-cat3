import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { getDishById, Dish } from "@/services/dish_service";

export default function DishDetailScreen() {
  const { id } = useLocalSearchParams();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const result = await getDishById(id as string);
        setDish(result);
      } catch (err) {
        console.error("Error al cargar el plato", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDish();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  if (!dish) {
    return <Text style={{ padding: 20 }}>Plato no encontrado</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <Text style={styles.ingredients}>
        Ingredientes: {dish.ingredients}
      </Text>
      {dish.category && (
        <Text style={styles.category}>Categoría: {dish.category}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 250,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    color: "#e74c3c",
    marginVertical: 10,
  },
  description: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
  },
  ingredients: {
    padding: 10,
    fontSize: 16,
    color: "#555",
    fontStyle: "italic",
  },
  category: {
    fontSize: 16,
    marginTop: 10,
    color: "#444",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});