import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/food.png')} // Cambia a tu imagen
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <Image 
          source={require('@/assets/images/CopperBites_Logo.png')} 
          style={styles.image} 
        />
        <Text style={styles.logo}>Restaurant App</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.authButton} onPress={() => router.push('/login')}>
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton} onPress={() => router.push('/signup')}>
            <Text style={styles.authButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/menu')}>
            <Text style={styles.gridText}>View the Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/')}>
            <Text style={styles.gridText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    resizeMode: 'contain',
    height: '30%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    fontFamily: 'Cochin',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  authButton: {
    backgroundColor: '#e74c3c',
    width: 160,
    paddingVertical: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 0,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  gridItem: {
    backgroundColor: '#fff',
    width: '40%',
    height: 100,
    marginVertical: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  gridText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
