// app/signup.tsx
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
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
      const { data } = await registerUser(name, lastname, email, password) as any;
      Alert.alert('Registro exitoso', `Bienvenido ${data.name}`);
      router.push('/menu');
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <TextInput placeholder="Nombre" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Apellido" style={styles.input} onChangeText={setLastname} />
      <TextInput placeholder="Correo" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={setPassword} />
      <Button title="Registrarse" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => router.push('/login')}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
  link: { marginTop: 20, color: 'blue', textAlign: 'center' },
});
