// app/signup.tsx
import { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '@/services/auth_service';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const { data } = (await registerUser(name, lastname, email, password)) as any;
      Alert.alert('Registro exitoso', `Bienvenido ${data.name}`);
      router.push('/menu');
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Apellido"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setLastname}
      />
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => router.push('/login')}>
        ¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,    
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    color: '#2980b9',
    fontSize: 14,
  },
  linkBold: {
    fontWeight: 'bold',
  },
});