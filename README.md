# BioStock Systems - Frontend

Aplicación React para la plataforma de eCommerce de insumos médicos BioStock Systems.

## 📋 Características

- ✅ Autenticación con JWT (Login/Registro)
- ✅ Catálogo de productos con filtros
- ✅ Gestión de pedidos
- ✅ Perfil de usuario
- ✅ Diseño responsive
- ✅ Integración con API Gateway

## 🛠️ Stack Tecnológico

- **React 18** - Framework UI
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Vite** - Build tool
- **CSS3** - Estilos

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura la URL del API Gateway:

```env
VITE_API_URL=http://localhost:8080
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

## 🏗️ Build para producción

```bash
npm run build
```

Los archivos compilados estarán en el directorio `dist/`

## 📁 Estructura del Proyecto

```
biostock-frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Products.jsx
│   │   └── *.css
│   ├── services/        # Servicios API
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── orderService.js
│   ├── context/         # Context API (estado global)
│   │   └── AuthContext.jsx
│   ├── utils/           # Utilidades y helpers
│   │   └── helpers.js
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── public/              # Archivos estáticos
├── .env.example         # Ejemplo de variables de entorno
├── vite.config.js       # Configuración de Vite
└── package.json         # Dependencias
```

## 🔌 Endpoints de API

El frontend se conecta a los siguientes endpoints del API Gateway:

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `GET /api/auth/validate` - Validar token

### Usuarios
- `GET /api/users/me` - Obtener usuario actual
- `PUT /api/users/:id` - Actualizar perfil

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto
- `GET /api/products/categories` - Categorías

### Órdenes
- `POST /api/orders` - Crear orden
- `GET /api/orders/user/:userId` - Órdenes del usuario
- `GET /api/orders/:id` - Detalles de orden

## 🎨 Tema Visual

El diseño utiliza una paleta médica y profesional:

- **Primary**: `#0066cc` (Azul médico)
- **Secondary**: `#00a86b` (Verde salud)
- **Accent**: `#ff6b35` (Naranja alertas)
- **Background**: `#f5f7fa` (Gris claro)

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para autenticación:

1. Usuario inicia sesión con email/password
2. Backend retorna token JWT
3. Token se almacena en `localStorage`
4. Todas las peticiones incluyen el token en el header `Authorization: Bearer <token>`
5. Si el token expira (401), se redirige al login

## 🚀 Deploy en AWS

### Opción 1: S3 + CloudFront

1. Build del proyecto:
```bash
npm run build
```

2. Subir archivos de `dist/` a S3:
```bash
aws s3 sync dist/ s3://biostock-frontend --delete
```

3. Crear distribución de CloudFront apuntando al bucket S3

4. Configurar Route 53 para el dominio

### Opción 2: Amplify

```bash
# Conectar repositorio GitHub
# Amplify detecta automáticamente Vite y hace deploy
```

## 📝 Notas de Desarrollo

- El frontend está configurado para usar proxy en desarrollo (ver `vite.config.js`)
- Todas las peticiones a `/api/*` se redirigen al backend configurado
- Los tokens JWT expiran después de X horas (configurado en backend)
- Las rutas protegidas redirigen a `/login` si no hay autenticación

## 🐛 Troubleshooting

### Error de CORS
Si recibes errores de CORS, verifica que el API Gateway tenga configurado:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Token inválido
Si recibes errores 401, verifica:
1. El token está en localStorage: `localStorage.getItem('token')`
2. El token no ha expirado
3. El backend está validando correctamente el token

## 👥 Equipo

Proyecto desarrollado para el curso Cloud-Based Software Engineering (CBSE 2026-I)

**Equipo 2d:**
- Sherilyn Maestre
- Juan Torres
- Juan Diego Medina
- Nicolas Romero
- Juan Carlos Andrade

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la Universidad Nacional de Colombia.
