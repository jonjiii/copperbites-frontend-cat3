import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CLOUD_NAME = "dssczoogn";
const UPLOAD_PRESET = "cat3_preset";

export default function UploadImageScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permisos requeridos", "Necesitas dar permiso para acceder a la galería.");
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (imageUri: string) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "upload.jpg",
        type: "image/jpeg",
      } as any);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        setCloudinaryUrl(data.secure_url);
      } else {
        Alert.alert("Error", "No se pudo subir la imagen.");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      Alert.alert("Error", "Hubo un problema al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir imagen a Cloudinary</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="large" color="#e67e22" style={{ marginTop: 20 }} />}

      {cloudinaryUrl && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Imagen subida:</Text>
          <Image source={{ uri: cloudinaryUrl }} style={styles.image} />
          <Text style={styles.url}>{cloudinaryUrl}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
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
    fontSize: 16,
  },
  result: {
    marginTop: 30,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  url: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});
