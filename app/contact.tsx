import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useRouter } from "expo-router";

export default function ContactScreen() {
  const LAT = -23.678895;
  const LNG = -70.409455;
  const router = useRouter();

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`;
    Linking.openURL(url);
  };

  const handleBack = () => {
    router.push("/menu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Dónde estamos?</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Copper Bites</Text>
        <Text style={styles.infoText}>Av. Angamos 0610, Antofagasta</Text>
        <Text style={styles.infoText}>Lun a Sáb: 12:00 – 22:00</Text>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: LAT,
          longitude: LNG,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker
          coordinate={{ latitude: LAT, longitude: LNG }}
          title="Copper Bites"
          description="Av. Angamos 0610, Antofagasta"
        />
      </MapView>

      {/* Botones flotantes sobre el mapa */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openInMaps}>
          <Text style={styles.buttonText}>Ver en Google Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleBack}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 270,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#34495e",
  },
});