import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getToken } from "@/services/token_service";

const CLOUD_NAME = "dssczoogn";
const UPLOAD_PRESET = "cat3_preset";
const API_URL = "http://192.168.1.159:8080/api/dishes"; // Cambia IP si es necesario

export default function CreateDishScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ingredients: "",
  });

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permisos requeridos", "Se requiere acceso a la galería");
      }
    })();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        name: "dish.jpg",
        type: "image/jpeg",
      } as any);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        Alert.alert("Error", "No se pudo subir la imagen.");
      }
    } catch (e) {
      Alert.alert("Error", "Hubo un problema al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!imageUrl || !form.name || !form.price || !form.category) {
      return Alert.alert("Faltan datos", "Completa todos los campos obligatorios.");
    }

    const token = await getToken();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          image: imageUrl,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Plato creado correctamente");
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          ingredients: "",
        });
        setImageUri(null);
        setImageUrl(null);
      } else {
        const error = await response.json();
        Alert.alert("Error", error.message || "No se pudo crear el plato.");
      }
    } catch (err) {
      Alert.alert("Error", "No se pudo conectar al servidor.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear nuevo plato</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Seleccionar imagen</Text>
        )}
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="large" color="#e67e22" />}

      <TextInput
        placeholder="Nombre"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio"
        value={form.price}
        keyboardType="numeric"
        onChangeText={(text) => setForm({ ...form, price: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Categoría"
        value={form.category}
        onChangeText={(text) => setForm({ ...form, category: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingredientes (coma separados)"
        value={form.ingredients}
        onChangeText={(text) => setForm({ ...form, ingredients: text })}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Plato</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  imagePicker: {
    backgroundColor: "#eee",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 10,
  },
  imageText: {
    color: "#888",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#e67e22",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
