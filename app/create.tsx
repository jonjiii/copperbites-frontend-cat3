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
import { createDish } from "@/services/dish_service";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import Toast from 'react-native-toast-message';

const CLOUD_NAME = "dssczoogn";
const UPLOAD_PRESET = "cat3_preset";

export default function CreateDishScreen() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "burger", // valor por defecto
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
      return Toast.show({
        type: "error",
        text1: "Campos incompletos",
        text2: "Por favor completa todos los campos obligatorios.",
      });
    }

    try {
      await createDish({
        ...form,
        price: Number(form.price),
        image: imageUrl,
      });

      Toast.show({
        type: "success",
        text1: "Plato creado",
        text2: "El nuevo plato fue agregado con éxito 🍽️",
      });

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        ingredients: "",
      });
      setImageUri(null);
      setImageUrl(null);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error al crear",
        text2: err.message || "No se pudo crear el plato.",
      });
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

      {/* 🧃 Categoría con Picker */}
      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>Categoría</Text>
        <Picker
          selectedValue={form.category}
          onValueChange={(itemValue) =>
            setForm({ ...form, category: itemValue })
          }
          style={styles.picker}
        >
          <Picker.Item label="Hamburguesas" value="burger" />
          <Picker.Item label="Bebidas" value="drink" />
          <Picker.Item label="Postres" value="dessert" />
        </Picker>
      </View>

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
  pickerWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
    marginTop: 8,
    fontWeight: "bold",
    color: "#555",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
