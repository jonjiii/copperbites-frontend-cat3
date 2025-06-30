import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function ContactScreen() {
  const LAT = -23.678895;
  const LNG = -70.409455;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Dónde estamos?</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: LAT,
          longitude: LNG,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: LAT, longitude: LNG }}
          title="Copper Bites"
          description="Av. Angamos 0610, Antofagasta"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
  },
});
