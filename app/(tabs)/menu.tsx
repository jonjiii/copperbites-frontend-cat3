import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthRedirect } from "@/hooks/use_auth";
import { removeToken } from "@/services/token_service";
import { getAllDishes, Dish } from "@/services/dish_service";

export default function MenuScreen() {
  const { loading: authLoading } = useAuthRedirect();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const data = await getAllDishes();
        setDishes(data);
      } catch (err) {
        console.error("Error al obtener platos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  if (authLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  const handleLogout = async () => {
    await removeToken();
    router.replace("/login");
  };

  const renderItem = ({ item }: { item: Dish }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/menu/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Platos disponibles</Text>
      <FlatList
        data={dishes.filter((d) => d.aviable && d.isActive)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  logoutButton: {
    alignSelf: "flex-end",
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    alignSelf: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#cccccc",
    margin: 5,
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    elevation: 3,
  },
  image: {
    height: 100,
    width: 150,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
