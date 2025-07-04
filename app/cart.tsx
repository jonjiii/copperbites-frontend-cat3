import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useCart } from "@/context/cart_context";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleClearCart = () => {
    Alert.alert("Vaciar carrito", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí, vaciar",
        onPress: () => { if (clearCart) clearCart(); },
        style: "destructive",
      },
    ]);
  };

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Text style={styles.remove}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de compras</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Tu carrito está vacío</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
            <Text style={styles.clearButtonText}>Vaciar carrito</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    color: "#e67e22",
  },
  remove: {
    color: "red",
    marginTop: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 20,
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 10,
  },
  clearButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
