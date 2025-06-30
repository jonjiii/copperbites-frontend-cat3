// app/login.tsx
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '@/services/auth_service';
import { saveToken } from '@/services/token_service';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const user = await loginUser(email, password);
            await saveToken(user.token);
            Alert.alert('Bienvenido', `Hola ${user.name}`);
            router.push('/menu');
        } catch (error) {
            Alert.alert('Error', 'Credenciales incorrectas');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput placeholder="Correo" style={styles.input} onChangeText={setEmail} />
            <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={setPassword} />
            <Button title="Entrar" onPress={handleLogin} />
            <Text style={styles.link} onPress={() => router.push('/signup')}>
                ¿No tienes cuenta? Regístrate
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 80 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
    link: { marginTop: 20, color: 'blue', textAlign: 'center' },
});