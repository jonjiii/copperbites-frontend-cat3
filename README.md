# Copper Bites - App Móvil de Restaurante

Aplicación desarrollada con **React Native + Expo** que permite a los usuarios visualizar, crear y explorar platos de un restaurante. Integra servicios de autenticación, carga de imágenes, consumo de API REST y geolocalización.

## Tecnologías utilizadas

- **Expo + React Native** (Navegación y UI adaptada a móviles)
- **React Native Paper + Picker** (Diseño visual consistente)
- **Axios** (Consumo de API backend)
- **Cloudinary** (Carga de imágenes)
- **React Native Maps** (Mapa interactivo)
- **SecureStore** (Gestión segura de tokens)
- **Toast Message** (Notificaciones internas)

## Funcionalidades principales

| Criterio                  | Cumplimiento                                                                 |
|--------------------------|------------------------------------------------------------------------------|
| **Navegación**           | Fluida y sin errores, gracias a `expo-router` y `Stack.Navigator`           |
| **Interfaz UI**          | Visual atractivo, diseño responsivo y adaptado a móviles con estilo moderno |
| **Consumo de API**       | Axios con gestión de tokens (login/register) y consumo de platos            |
| **Carga de imágenes**    | Integración completa con Cloudinary para subir fotos de platos              |
| **Mapa interactivo**     | Geolocalización y marcador de dirección con Google Maps API                |
| **Notificaciones**       | Toasts informativos (crear plato, cerrar sesión, error, éxito, etc.)        |
| **Visualización**        | Menu clasificado por categoría (hamburguesas, bebidas, postres)             |

## Capturas de pantalla

- Inicio de sesión y registro
- Vista del menú con filtros y creación de platos
- Detalle de plato
- Contacto con mapa

*(Opcional: agrega imágenes si es parte del requerimiento)*

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/copper-bites-app.git
   cd copper-bites-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el proyecto:
   ```bash
   npx expo start
   ```

4. Abre en tu emulador Android/iOS o en la app **Expo Go**.

> Asegúrate de tener configurado el backend corriendo localmente en el puerto `:8080`.

## Estructura de carpetas

```
.
├── app/
│   ├── menu.tsx                # Visualización de platos por categoría
│   ├── create.tsx              # Formulario para crear nuevo plato
│   ├── contact.tsx             # Mapa con ubicación
│   ├── login.tsx / signup.tsx  # Autenticación
│   └── (tabs)/index.tsx        # Home inicial
├── services/                   # Lógica de negocio (auth, platos, tokens)
├── components/                 # Componentes visuales reutilizables
└── assets/                     # Imágenes y fuentes
```

## Estado del desarrollo

- [x] Login y registro funcional
- [x] Token almacenado con `SecureStore`
- [x] Creación de platos (con imagen)
- [x] Visualización por categoría
- [x] Mapa funcional
- [x] Notificaciones visibles con Toasts
- [x] Carga de imágenes a Cloudinary

## Autor

Johann Lizana — [UCN - Ingeniería en Computación e Informática]
