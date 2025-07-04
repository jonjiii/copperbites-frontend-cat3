import React, { useEffect, useState, useCallback } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthRedirect } from "@/hooks/use_auth";
import { removeToken, getToken } from "@/services/token_service";
import { getAllDishes, Dish } from "@/services/dish_service";
import { useFocusEffect } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { getCart } from "@/services/cart_service";

export default function MenuScreen() {
  const { loading: authLoading } = useAuthRedirect();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchDishes = async () => {
        try {
          const data = await getAllDishes();
          setDishes(data);
          const cart = await getCart();
          setCartCount(cart.length);
        } catch (err) {
          console.error("Error al obtener platos", err);
        } finally {
          setLoading(false);
        }
      };

      fetchDishes();
    }, [])
  );

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  const filteredDishes = dishes.filter(
    (d) =>
      d.aviable &&
      d.isActive &&
      d.name.toLowerCase().includes(search.toLowerCase())
  );

  const groupedByCategory = (category: string) => {
    return filteredDishes.filter((d) => d.category.toLowerCase() === category);
  };

  const handleLogout = async () => {
    await removeToken();
    Toast.show({
      type: "info",
      text1: "Sesión cerrada",
      text2: "Nos vemos pronto 👋",
    });
    router.replace("/login");
  }


  const handleCreate = () => {
    router.push("/create");
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

  const renderCategory = (title: string, categoryKey: string) => {
    const items = groupedByCategory(categoryKey);
    if (items.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
    );
  };

  if (authLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Menú</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Buscar plato..."
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <ScrollView>
        {renderCategory("Hamburguesas", "burger")}
        {renderCategory("Bebidas", "drink")}
        {renderCategory("Postres", "dessert")}
      </ScrollView>

      {isLoggedIn && (
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>Crear nuevo plato</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => router.push("/cart")}
      >
        <Text style={styles.cartButtonText}>🛒 Ver carrito ({cartCount})</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  createButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 8,
    borderRadius: 12,
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#2c3e50",
  },
  price: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
    color: "#34495e",
  },
  searchInput: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  cartButton: {
    position: "absolute",
    bottom: 90,
    right: 20,
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

});
